export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  grade: string;
  tags: string[];
  parents: Parent[];
  createdAt: Date | string;
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
  notes: string;
}

export interface Form {
  _id: string;
  name: string;
  createdAt: string;
  editable: boolean;
}

export interface TagOption {
  value: string;
  label: string;
  color: string;
}
