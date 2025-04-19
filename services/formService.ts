import { Form } from '@/types/tracking';

class FormService {
  private apiBaseUrl = '/api/forms';

  // Get all forms
  async getForms(): Promise<Form[]> {
    try {
      const response = await fetch(this.apiBaseUrl);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch forms');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching forms:', error);
      return [];
    }
  }

  // Get forms for a specific student
  async getStudentForms(studentId: string): Promise<Form[]> {
    try {
      if (!studentId) {
        throw new Error('Student ID is required');
      }

      const response = await fetch(`${this.apiBaseUrl}/student/${studentId}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch student forms');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching student forms:', error);
      return [];
    }
  }

  // Create a new form
  async createForm(formData: any): Promise<Form | null> {
    try {
      if (!formData) {
        throw new Error('Form data is required');
      }

      const response = await fetch(this.apiBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create form');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating form:', error);
      return null;
    }
  }

  // Create a standard form
  async createStandardForm(
    formType: string,
    studentId?: string
  ): Promise<Form | null> {
    try {
      if (!formType) {
        throw new Error('Form type is required');
      }

      const response = await fetch(`${this.apiBaseUrl}/standard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formType, studentId })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to create ${formType} form`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Error creating ${formType} form:`, error);
      return null;
    }
  }

  // Create a functional report form
  async createFunctionalReport(reportData: any): Promise<Form | null> {
    try {
      if (
        !reportData ||
        !reportData.formType ||
        !reportData.studentId ||
        !reportData.content
      ) {
        throw new Error(
          'Invalid report data. Required fields: formType, studentId, content'
        );
      }

      const response = await fetch(`${this.apiBaseUrl}/functional-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 'Failed to create functional report'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating functional report:', error);
      throw error; // Re-throw to allow proper handling in the component
    }
  }

  // Get a specific form by ID
  async getFormById(formId: string): Promise<Form | null> {
    try {
      if (!formId) {
        throw new Error('Form ID is required');
      }

      const response = await fetch(`${this.apiBaseUrl}/${formId}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch form');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching form:', error);
      return null;
    }
  }

  // Delete a form
  async deleteForm(formId: string): Promise<boolean> {
    try {
      if (!formId) {
        throw new Error('Form ID is required');
      }

      const response = await fetch(`${this.apiBaseUrl}/${formId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete form');
      }

      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      return false;
    }
  }
}

export const formService = new FormService();
