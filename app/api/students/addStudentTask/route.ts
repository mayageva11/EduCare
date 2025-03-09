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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { studentId, ...taskData } = data;

    console.log('Add task request:', { studentId, taskData });

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return NextResponse.json(
        { error: 'Invalid or missing student ID' },
        { status: 400 }
      );
    }

    // Map frontend fields to database fields
    const dbTaskData = {
      title: taskData.title,
      description: taskData.notes || '',
      dueDate: taskData.startDate ? new Date(taskData.startDate) : undefined,
      status: mapHebrewToStatus(taskData.status),
      priority: mapHebrewToPriority(taskData.priority || 'בינוני'),
      studentId: new mongoose.Types.ObjectId(studentId)
    };

    console.log('Saving task with data:', dbTaskData);

    // Connect to the database
    await connectDB();

    // Create a new task
    const task = new Task(dbTaskData);

    // Save the task
    await task.save();
    console.log('Saved task with ID:', task._id.toString());

    // Map back to frontend format
    const responseTask = {
      _id: task._id.toString(),
      title: task.title,
      startDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
      status: taskData.status, // Use the original Hebrew status
      priority: taskData.priority || 'בינוני',
      notes: task.description || ''
    };

    return NextResponse.json(responseTask);
  } catch (error) {
    console.error('Error adding task:', error);

    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation error', details: errorMessages },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to add task' }, { status: 500 });
  }
}
