import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';

// Helper function to map English status to Hebrew
function mapStatusToHebrew(status: string): string {
  const statusMap: Record<string, string> = {
    pending: 'לביצוע',
    inProgress: 'בתהליך',
    completed: 'הושלם',
    canceled: 'מבוטל'
  };
  return statusMap[status] || 'לביצוע';
}

// Helper function to map English priority to Hebrew
function mapPriorityToHebrew(priority: string): string {
  const priorityMap: Record<string, string> = {
    low: 'נמוך',
    medium: 'בינוני',
    high: 'גבוה'
  };
  return priorityMap[priority] || 'בינוני';
}

// Safely convert any value to string
function safeToString(value: any): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object' && value.toString) return value.toString();
  return String(value);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    console.log('Fetching tasks for studentId:', studentId);

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return NextResponse.json(
        { error: 'Invalid or missing student ID' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Convert string ID to MongoDB ObjectID
    const objectIdStudentId = new mongoose.Types.ObjectId(studentId);

    // Query tasks with more detailed debug logging
    console.log('Finding tasks for studentId:', objectIdStudentId.toString());
    const tasks = await Task.find({ studentId: objectIdStudentId }).lean();

    console.log(`Found ${tasks.length} tasks for student`);

    // Log raw tasks for debugging
    console.log('Raw tasks from database:', JSON.stringify(tasks, null, 2));

    // Transform data to match frontend expectations with defensive programming
    const formattedTasks = tasks.map(task => {
      // Safely access properties that might be undefined
      return {
        _id: safeToString(task._id),
        title: task.title || '',
        startDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split('T')[0]
          : '',
        status: mapStatusToHebrew(task.status || ''),
        priority: mapPriorityToHebrew(task.priority || ''),
        notes: task.description || ''
      };
    });

    console.log(
      'Formatted tasks for frontend:',
      JSON.stringify(formattedTasks, null, 2)
    );

    return NextResponse.json(formattedTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}
