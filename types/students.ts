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
  createdAt?: Date;
  updatedAt?: Date;
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
}
