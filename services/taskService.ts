// services/taskService.ts
import { Task } from '@/types/tracking';

class TaskService {
  // Get all tasks from all students
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await fetch('/api/tasks/getAllTasks');

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error('Error fetching all tasks:', error);
      return [];
    }
  }
}

export const taskService = new TaskService();
