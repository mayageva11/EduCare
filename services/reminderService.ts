// Define types for API responses
export interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  studentName: string;
}

class ReminderService {
  async getReminders(): Promise<Reminder[]> {
    try {
      const response = await fetch('/api/reminders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reminders');
      }

      const data = await response.json();
      return data.reminders;
    } catch (error) {
      console.error('Error fetching reminders:', error);
      return [];
    }
  }

  async createReminder(reminderData: {
    title: string;
    date: Date;
    studentName: string;
  }): Promise<Reminder | null> {
    try {
      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reminderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create reminder');
      }

      const data = await response.json();
      return data.reminder;
    } catch (error) {
      console.error('Error creating reminder:', error);
      return null;
    }
  }

  async deleteReminder(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/reminders/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete reminder');
      }

      return true;
    } catch (error) {
      console.error('Error deleting reminder:', error);
      return false;
    }
  }
}

export const reminderService = new ReminderService();
