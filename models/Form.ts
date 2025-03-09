import mongoose from 'mongoose';

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
    status: {
      type: String,
      enum: Object.values(FormStatus),
      default: FormStatus.PENDING
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'יש לשייך טופס לתלמיד']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Form || mongoose.model('Form', formSchema);
