// app/api/students/updateStudentTask/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';

// Helper function to map Hebrew status to English
function mapHebrewToStatus(hebrewStatus: string): string {
  const statusMap: Record<string, string> = {
    לביצוע: 'pending',
    בתהליך: 'inProgress',
    הושלם: 'completed',
    מבוטל: 'canceled'
  };

  return statusMap[hebrewStatus] || 'pending';
}

// Helper function to map Hebrew priority to English
function mapHebrewToPriority(hebrewPriority: string): string {
  const priorityMap: Record<string, string> = {
    נמוך: 'low',
    בינוני: 'medium',
    גבוה: 'high'
  };

  return priorityMap[hebrewPriority] || 'medium';
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { taskId, studentId, ...taskData } = data;

    console.log('Update task request:', { taskId, studentId, taskData });

    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
      return NextResponse.json(
        { error: 'Invalid or missing task ID' },
        { status: 400 }
      );
    }

    if (!studentId) {
      return NextResponse.json(
        { error: 'Missing student ID' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // First check if the task exists
    const objectIdTaskId = new mongoose.Types.ObjectId(taskId);
    const existingTask: any = await Task.findById(objectIdTaskId).lean();

    console.log('Found task:', existingTask);

    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Check if the task belongs to the student (with string comparison)
    if (existingTask.studentId) {
      const taskStudentIdStr = existingTask.studentId.toString();
      const requestStudentIdStr = studentId.toString();

      console.log('Comparing task ownership:', {
        taskStudentId: taskStudentIdStr,
        requestStudentId: requestStudentIdStr
      });

      if (taskStudentIdStr !== requestStudentIdStr) {
        return NextResponse.json(
          { error: 'Task does not belong to this student' },
          { status: 403 }
        );
      }
    } else {
      console.log('Task has no studentId!');
      return NextResponse.json(
        { error: 'Task has no associated student' },
        { status: 500 }
      );
    }

    // Map frontend fields to database fields
    const dbTaskData = {
      title: taskData.title,
      description: taskData.notes || '',
      dueDate: taskData.startDate ? new Date(taskData.startDate) : undefined,
      status: mapHebrewToStatus(taskData.status),
      priority: mapHebrewToPriority(taskData.priority || 'בינוני')
    };

    console.log('Updating task with data:', dbTaskData);

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      objectIdTaskId,
      dbTaskData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return NextResponse.json(
        { error: 'Failed to update task' },
        { status: 500 }
      );
    }

    console.log('Task updated successfully:', updatedTask);

    // Map back to frontend format
    const responseTask = {
      _id: updatedTask._id.toString(),
      title: updatedTask.title,
      startDate: updatedTask.dueDate
        ? updatedTask.dueDate.toISOString().split('T')[0]
        : '',
      status: taskData.status, // Use the original Hebrew status
      priority: taskData.priority || 'בינוני',
      notes: updatedTask.description || ''
    };

    return NextResponse.json(responseTask);
  } catch (error) {
    console.error('Error updating task:', error);

    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation error', details: errorMessages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to update task',
        message: (error as Error).message,
        stack:
          process.env.NODE_ENV === 'development'
            ? (error as Error).stack
            : undefined
      },
      { status: 500 }
    );
  }
}
