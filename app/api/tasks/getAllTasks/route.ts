import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TaskModel from '@/models/Task';
import StudentModel from '@/models/Students';

export async function GET() {
  try {
    await connectDB();

    // Get all tasks
    const tasks = await TaskModel.find().sort({ createdAt: -1 });

    // Get student information to add to each task
    const enhancedTasks = await Promise.all(
      tasks.map(async task => {
        const taskObj = task.toObject();

        // Find the student for this task
        if (taskObj.studentId) {
          const student = await StudentModel.findById(taskObj.studentId);

          if (student) {
            // Add student name to the task object
            return {
              ...taskObj,
              studentName: `${student.firstName} ${student.lastName}`,
              studentGrade: student.grade
            };
          }
        }

        return taskObj;
      })
    );

    return NextResponse.json(enhancedTasks);
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}
