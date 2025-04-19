import { Form } from './form.types';

// types/student.ts
export interface Parent {
  name: string;
  phone: string;
}

export interface Student {
  _id?: string;
  firstName: string;
  lastName: string;
  grade: string;
  tags: string[];
  parents: Parent[];
  counselorNotes?: string;
  isOnMedication?: boolean;
  medicationDetails?: string;
  createdAt?: Date;
  updatedAt?: Date;
  group?: string;
  forms?: Form[];
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  grade: string;
  tags: string[];
  parent1Name: string;
  parent1Phone: string;
  parent2Name: string;
  parent2Phone: string;
  group?: string;
}

// Form-related types
// export interface Form {
//   _id: string;
//   formType?: string;
//   name: string;
//   createdAt: string;
//   editable: boolean;
//   fileUrl?: string;
//   fileName?: string;
//   fileType?: string;
//   status?: string;
//   studentId?: string;
//   group?: string;
// }

export enum StudentGroup {
  NONE = 'none', // ללא
  SPECIAL = 'special', // חיוך מיוחד
  DIFFERENTIAL = 'differential', // דפרנציאלים
  INTEGRATION = 'integration', // שילוב
  GIFTED = 'gifted' // מחוננים
}

export const GROUP_OPTIONS = [
  { value: StudentGroup.NONE, label: 'ללא' },
  { value: StudentGroup.SPECIAL, label: 'חיוך מיוחד' },
  { value: StudentGroup.DIFFERENTIAL, label: 'דפרנציאלים' },
  { value: StudentGroup.INTEGRATION, label: 'שילוב' },
  { value: StudentGroup.GIFTED, label: 'מחוננים' }
];
