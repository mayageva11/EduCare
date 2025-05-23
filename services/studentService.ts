import { StudentFormData, Student } from '@/types/students';
import { Task } from '@/types/tracking';
import { Form, FormContent } from '@/types/form.types';

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

  // Upload form with file
  uploadStudentForm = async (
    studentId: string,
    formData: {
      formType: string;
      name: string;
      file: File;
    }
  ): Promise<Form | null> => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('file', formData.file);
      formDataObj.append('formName', formData.name);
      formDataObj.append('formType', formData.formType);
      formDataObj.append('studentId', studentId);

      const response = await fetch('/api/students/uploadForm', {
        method: 'POST',
        body: formDataObj
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: 'Unknown error' }));
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to upload form');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading form:', error);
      return null;
    }
  };

  // Add student form - handles both standard forms and file uploads
  addStudentForm = async (
    studentId: string,
    formData: any
  ): Promise<Form | null> => {
    try {
      // Check if this is a file upload
      if (formData.formType === 'file_upload' && formData.file) {
        return this.uploadStudentForm(studentId, formData);
      }

      // Otherwise, handle as regular form
      const response = await fetch('/api/students/addStudentForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          formType: formData.formType
        })
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: 'Unknown error' }));
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to add form');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding form:', error);
      return null;
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

      if (!response.ok) {
        throw new Error('Failed to delete form');
      }

      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      return false;
    }
  };

  updateStudentGroup = async (
    studentId: string,
    group: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(`/api/students/updateStudentGroup`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, group })
      });

      if (!response.ok) throw new Error('Failed to update group');
      return true;
    } catch (error) {
      console.error('Error updating group:', error);
      return false;
    }
  };

  // Add these methods to your studentService.ts file

  // Get functional report content
  getFunctionalReport = async (formId: string): Promise<Form | null> => {
    try {
      const response = await fetch(
        `/api/students/getFunctionalReport?formId=${formId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          // If report doesn't exist yet return empty template
          return {
            _id: '',
            createdAt: '',
            editable: false,
            name: '',
            content: {
              academicEvaluation: '',
              behavioralEvaluation: {
                emotionalEvaluation: '',
                socialEvaluation: ''
              }
            }
          };
        }
        throw new Error('Failed to fetch functional report');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching functional report:', error);
      return null;
    }
  };

  // Save functional report
  saveFunctionalReport = async (
    formId: string,
    studentId: string,
    name: string,
    formType: string,
    reportContent: FormContent
  ): Promise<boolean> => {
    try {
      const response = await fetch('/api/students/addFunctionalityForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId,
          studentId,
          name,
          formType,
          academicEvaluation: reportContent.academicEvaluation,
          behavioralEvaluation: reportContent.behavioralEvaluation
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save functional report');
      }

      return true;
    } catch (error) {
      console.error('Error saving functional report:', error);
      return false;
    }
  };

  // Download functional report as PDF
  // Updated method for studentService.ts
  downloadFunctionalReport = async (formId: string): Promise<void> => {
    try {
      console.log(`Downloading functional report with ID: ${formId}`);

      // Use fetch for better error handling and blob handling
      const response = await fetch(
        `/api/students/downloadFunctionalReport?formId=${formId}`
      );

      if (!response.ok) {
        console.error(`Download failed with status: ${response.status}`);
        throw new Error(`Failed to download report (${response.status})`);
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');
      link.href = url;

      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'functional_report.pdf';

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1]);
        }
      }

      link.setAttribute('download', filename);

      // Append to body
      document.body.appendChild(link);

      // Trigger click
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log('Download completed successfully');
    } catch (error) {
      console.error('Error downloading functional report:', error);
      alert(`שגיאה בהורדת הדו״ח: ${(error as Error).message}`);
    }
  };

  // Edit functional report - separate from save
  editFunctionalReport = async (
    formId: string,
    reportContent: FormContent
  ): Promise<boolean> => {
    try {
      console.log(`Editing functional report for form ID: ${formId}`);
      console.log('Report content to update:', reportContent);

      const payload = {
        formId,
        content: {
          academicEvaluation: reportContent.academicEvaluation,
          behavioralEvaluation: reportContent.behavioralEvaluation
        },
        status: 'completed'
      };

      console.log('Sending edit payload:', payload);

      const response = await fetch('/api/students/editForm', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log('Edit response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to update functional report';

        try {
          const errorData = JSON.parse(errorText);
          console.error('Server error response:', errorData);
          errorMessage = errorData.error || errorMessage;
        } catch {
          console.error('Server returned non-JSON error:', errorText);
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Edit successful, result:', result);
      return true;
    } catch (error) {
      console.error('Error updating functional report:', error);
      alert(`שגיאה בעדכון דו״ח התפקוד: ${(error as Error).message}`);
      return false;
    }
  };

  // Delete form (reusing the existing deleteStudentForm method)
  // This works for both regular forms and functionality forms
  deleteForm = async (studentId: string, formId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/students/deleteForm`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          formId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete form');
      }

      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      return false;
    }
  };
}

export const studentService = new StudentService();
