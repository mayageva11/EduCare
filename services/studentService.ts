import { StudentFormData, Student } from '@/types/students';
import { StudentTag } from '../models/Students';

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

  async updateStudent(
    id: string,
    studentData: { name?: string; tags?: StudentTag[] }
  ): Promise<Student | null> {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      const data = await response.json();
      return data.student;
    } catch (error) {
      console.error('Error updating student:', error);
      return null;
    }
  }

  async deleteStudent(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      return false;
    }
  }
}

export const studentService = new StudentService();
