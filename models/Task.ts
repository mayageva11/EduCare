import mongoose from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'יש להזין כותרת למשימה']
    },
    description: {
      type: String
    },
    dueDate: {
      type: Date
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'יש לשייך משימה לתלמיד']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Task || mongoose.model('Task', taskSchema);
