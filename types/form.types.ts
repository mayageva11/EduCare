export interface Form {
  _id: string;
  formType?: string;
  name: string;
  createdAt: string;
  editable: boolean;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  status?: string;
  studentId?: string;
  group?: string;
  content?: FormContent;
}

export interface FormContent {
  academicEvaluation?: string;
  behavioralEvaluation?: {
    emotionalEvaluation?: string;
    socialEvaluation?: string;
  };
}
