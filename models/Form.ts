import mongoose, { Schema } from 'mongoose';

export enum FormStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed'
}

const formSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      required: [true, 'יש להזין סוג טופס']
    },
    name: {
      type: String,
      required: [true, 'יש להזין שם לטופס']
    },
    status: {
      type: String,
      enum: Object.values(FormStatus),
      default: FormStatus.PENDING
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      default: null
    },
    fileUrl: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    },
    fileType: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    content: {
      type: Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Form || mongoose.model('Form', formSchema);
