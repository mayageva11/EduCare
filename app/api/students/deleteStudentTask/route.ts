// app/api/students/deleteStudentTask/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';

// TypeScript interface for accessing task properties safely
interface TaskDocument {
  [key: string]: any; // Allow any property to exist
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const taskId = searchParams.get('taskId');

    console.log('Delete task request received:', { studentId, taskId });

    if (!studentId || !taskId) {
      console.log('Missing studentId or taskId');
      return NextResponse.json(
        { error: 'Student ID and Task ID are required' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      console.log('Invalid taskId format');
      return NextResponse.json(
        { error: 'Invalid task ID format' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Convert taskId to ObjectId
    const objectIdTaskId = new mongoose.Types.ObjectId(taskId);

    console.log(
      'Looking for task to delete with ID:',
      objectIdTaskId.toString()
    );

    // Use a TypeScript cast to satisfy the compiler
    const rawTask = await Task.findById(objectIdTaskId).lean();

    if (!rawTask) {
      console.log('Task not found');
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Cast to our interface to access properties safely
    const existingTask = rawTask as TaskDocument;

    console.log('Found task:', existingTask);

    // Check if studentId exists in the task document
    if (!('studentId' in existingTask)) {
      console.log('Task does not have a studentId field');
      return NextResponse.json(
        { error: 'Task is missing studentId field', taskData: existingTask },
        { status: 500 }
      );
    }

    // Log the types for debugging
    console.log('Comparing studentId values:', {
      taskStudentId: existingTask.studentId,
      taskStudentIdType: typeof existingTask.studentId,
      requestStudentId: studentId
    });

    // More flexible comparison - handle both string and ObjectId cases
    let isTaskOwnedByStudent = false;

    if (existingTask.studentId) {
      const taskStudentIdStr = existingTask.studentId.toString();
      isTaskOwnedByStudent = taskStudentIdStr === studentId;

      console.log('Task ownership check result:', isTaskOwnedByStudent);
    }

    if (!isTaskOwnedByStudent) {
      console.log('Task ownership mismatch');
      return NextResponse.json(
        {
          error: 'Task does not belong to this student',
          taskStudentId: existingTask.studentId
            ? existingTask.studentId.toString()
            : null,
          requestStudentId: studentId
        },
        { status: 403 }
      );
    }

    // Delete the task
    console.log('Deleting task...');
    const result = await Task.findByIdAndDelete(objectIdTaskId);

    console.log('Delete result:', result ? 'Success' : 'Failed');

    if (!result) {
      return NextResponse.json(
        { error: 'Task found but could not be deleted' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete task',
        message: (error as Error).message
      },
      { status: 500 }
    );
  }
}
