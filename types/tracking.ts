export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  grade: string;
  tags: string[];
  parents: Parent[];
  createdAt: Date | string;
  group?: string;
}

export interface Parent {
  name: string;
  phone: string;
}

// In types/tracking.ts
export interface Task {
  _id: string;
  title: string;
  startDate: string;
  status: string;
  priority?: string;
  studentId?: string;
  studentName?: string;
  studentGrade?: string;
  dueDate?: string;
  description?: string;
  notes: string;
}

export interface Form {
  _id: string;
  name: string;
  createdAt: string;
  editable: boolean;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  status?: string;
  studentId?: string;
  group?: string;
}

export interface TagOption {
  value: string;
  label: string;
  color: string;
}
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
