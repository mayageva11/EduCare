// Student-related types
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

export interface StudentFormData {
  firstName: string;
  lastName: string;
  grade: string;
  tags: string[];
  group: string;
  parent1Name: string;
  parent1Phone: string;
  parent2Name: string;
  parent2Phone: string;
}

// Task-related types
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

export enum FormStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed'
}

// Tag options
export interface TagOption {
  value: string;
  label: string;
  color: string;
}

// Student groups
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

// Form type interfaces
export interface MeetingSummaryContent {
  date: string;
  participants: string[];
  topics: string[];
  decisions: string[];
  nextSteps: string[];
}

export interface ConfidentialityWaiverContent {
  studentName: string;
  parentName: string;
  institutions: string[];
  validUntil: string;
  restrictions: string;
}

export interface ParentConsentContent {
  studentName: string;
  parentName: string;
  adjustments: string[];
  date: string;
}

export interface TeacherQuestionnaireContent {
  teacherName: string;
  studentName: string;
  academicPerformance: string;
  behavior: string;
  socialInteractions: string;
  strengths: string;
  challenges: string;
  recommendations: string;
}
