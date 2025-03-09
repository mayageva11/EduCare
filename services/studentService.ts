import { StudentFormData, Student } from '@/types/students';
import { Form, Task } from '@/types/tracking';

export interface StudentStats {
  green: number; // לומד, מתפקד בבית ספר ואין בעיות
  yellow: number; // קשב וריכוז לא מטופל וקשיים רגשיים
  orange: number; // קשיים לימודיים, רגשיים, והתנהגותיים
  red: number; // קשיים לימודיים, התנהגותיים, חברתיים ומשפחתיים
  blue: number; // מדווח קב"ס
  purple: number; // מדווח רווחה
}

class StudentService {
  // services/studentService.ts
  async getStudentStats(): Promise<StudentStats> {
    try {
      const response = await fetch('/api/students/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch student statistics');
      }

      // הנתונים מוחזרים ישירות מה-API ללא מפתח 'stats'
      return await response.json();
    } catch (error) {
      console.error('Error fetching student statistics:', error);
      return {
        green: 0,
        yellow: 0,
        orange: 0,
        red: 0,
        blue: 0,
        purple: 0
      };
    }
  }

  // קבלת כל הסטודנטים
  async getStudents(): Promise<Student[]> {
    try {
      const response = await fetch('/api/students/getAllStudents');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  }

  // יצירת סטודנט חדש
  async createStudent(formData: StudentFormData): Promise<Student | null> {
    try {
      const response = await fetch('/api/students/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create student');
      }

      const data = await response.json();
      return data.student || data;
    } catch (error) {
      console.error('Error creating student:', error);
      return null;
    }
  }

  // Fetch student by ID
  getStudentById = async (studentId: string): Promise<Student | null> => {
    try {
      const response = await fetch(
        `/api/students/getStudentById?studentId=${studentId}`
      );
      if (!response.ok) throw new Error('Failed to fetch student');
      return await response.json();
    } catch (error) {
      console.error('Error fetching student:', error);
      return null;
    }
  };

  // Fetch student tasks
  getStudentTasks = async (studentId: string): Promise<Task[]> => {
    try {
      console.log('Fetching tasks for student:', studentId);
      const response = await fetch(
        `/api/students/getStudentTasks?studentId=${studentId}`
      );

      if (!response.ok) {
        console.error('Server returned error:', response.status);
        throw new Error('Failed to fetch tasks');
      }

      const tasks = await response.json();
      console.log(`Received ${tasks.length} tasks`);
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  };

  // Fetch student forms
  getStudentForms = async (studentId: string): Promise<Form[]> => {
    try {
      const response = await fetch(
        `/api/students/getStudentForms?studentId=${studentId}`
      );
      if (!response.ok) throw new Error('Failed to fetch forms');
      return await response.json();
    } catch (error) {
      console.error('Error fetching forms:', error);
      return [];
    }
  };

  // Add student task
  addStudentTask = async (
    studentId: string,
    taskData: Omit<Task, '_id'>
  ): Promise<Task | null> => {
    try {
      console.log('Adding task for student:', studentId, taskData);
      const response = await fetch(`/api/students/addStudentTask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, ...taskData })
      });

      if (!response.ok) {
        console.error('Server returned error:', response.status);
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      console.log('New task created:', newTask);
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      return null;
    }
  };

  // Add student form
  addStudentForm = async (
    studentId: string,
    formData: { formType: string }
  ): Promise<Form | null> => {
    try {
      const response = await fetch(`/api/students/addStudentForm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, ...formData })
      });
      if (!response.ok) throw new Error('Failed to add form');
      return await response.json();
    } catch (error) {
      console.error('Error adding form:', error);
      return null;
    }
  };

  // Update student tags
  updateStudentTags = async (
    studentId: string,
    tags: string[]
  ): Promise<boolean> => {
    try {
      const response = await fetch(`/api/students/updateStudentTags`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, tags })
      });
      if (!response.ok) throw new Error('Failed to update tags');
      return true;
    } catch (error) {
      console.error('Error updating tags:', error);
      return false;
    }
  };

  // Delete student task
  deleteStudentTask = async (
    studentId: string,
    taskId: string
  ): Promise<boolean> => {
    try {
      console.log('Deleting task:', { studentId, taskId });

      const response = await fetch(
        `/api/students/deleteStudentTask?studentId=${studentId}&taskId=${taskId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log('Delete response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to delete task');
      }

      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  };
  // Delete student form
  deleteStudentForm = async (
    studentId: string,
    formId: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `/api/students/deleteStudentForm?studentId=${studentId}&formId=${formId}`,
        {
          method: 'DELETE'
        }
      );
      if (!response.ok) throw new Error('Failed to delete form');
      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      return false;
    }
  };

  // Update this method in services/studentService.ts
  updateStudentTask = async (
    studentId: string,
    taskId: string,
    taskData: Omit<Task, '_id'>
  ): Promise<Task | null> => {
    try {
      console.log('Updating task:', { studentId, taskId, taskData });

      // Make the request to update the task
      const response = await fetch(`/api/students/updateStudentTask`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, taskId, ...taskData })
      });

      // Log the raw response for debugging
      console.log('Update task response status:', response.status);

      // If there's an error, try to parse it for better error message
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to update task';

        try {
          // Try to parse as JSON for structured error
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorJson.message || errorMessage;
          console.error('Server error:', errorJson);
        } catch {
          // If not JSON, use the raw text
          console.error('Server returned:', errorText);
        }

        throw new Error(errorMessage);
      }

      // Parse the successful response
      const updatedTask = await response.json();
      console.log('Task updated successfully:', updatedTask);
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      alert(`שגיאה בעדכון משימה: ${(error as Error).message}`);
      return null;
    }
  };
  // Add these functions to your StudentService class

  // For counselor notes
  getStudentCounselorNotes = async (studentId: string): Promise<string> => {
    try {
      const student = await this.getStudentById(studentId);
      return student?.counselorNotes || '';
    } catch (error) {
      console.error('Error fetching counselor notes:', error);
      return '';
    }
  };

  // Add new counselor note
  addStudentCounselorNote = async (
    studentId: string,
    note: string
  ): Promise<any> => {
    try {
      const response = await fetch('/api/students/addNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId, note })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add counselor note');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding counselor note:', error);
      throw error;
    }
  };

  // Update counselor notes
  updateStudentCounselorNotes = async (
    studentId: string,
    notes: string
  ): Promise<boolean> => {
    try {
      const response = await fetch('/api/students/editNote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId, notes })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update counselor notes');
      }

      return true;
    } catch (error) {
      console.error('Error updating counselor notes:', error);
      throw error;
    }
  };

  // For medication information
  getStudentMedicationInfo = async (
    studentId: string
  ): Promise<{ isOnMedication: boolean; details: string }> => {
    try {
      const student = await this.getStudentById(studentId);
      return {
        isOnMedication: student?.isOnMedication || false,
        details: student?.medicationDetails || ''
      };
    } catch (error) {
      console.error('Error fetching medication info:', error);
      return { isOnMedication: false, details: '' };
    }
  };

  // Add medication information
  addStudentMedicationInfo = async (
    studentId: string,
    medicationInfo: { isOnMedication: boolean; details: string }
  ): Promise<any> => {
    try {
      const response = await fetch('/api/students/addMedication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId,
          isOnMedication: medicationInfo.isOnMedication,
          details: medicationInfo.details
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add medication info');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding medication info:', error);
      throw error;
    }
  };

  // Update medication information
  updateStudentMedicationInfo = async (
    studentId: string,
    medicationInfo: { isOnMedication: boolean; details: string }
  ): Promise<boolean> => {
    try {
      const response = await fetch('/api/students/editMedication', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId,
          isOnMedication: medicationInfo.isOnMedication,
          details: medicationInfo.details
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update medication info');
      }

      return true;
    } catch (error) {
      console.error('Error updating medication info:', error);
      throw error;
    }
  };
  // Add this function to your StudentService class

  // Update student information
  updateStudentInfo = async (
    studentId: string,
    studentData: {
      firstName: string;
      lastName: string;
      grade: string;
      parents: { name: string; phone: string }[];
    }
  ): Promise<Student | null> => {
    try {
      const response = await fetch('/api/students/editStudentInfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId,
          ...studentData
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Failed to update student information'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating student information:', error);
      throw error;
    }
  };
}

export const studentService = new StudentService();
