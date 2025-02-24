import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'יש להזין כותרת לתזכורת']
  },
  date: {
    type: Date,
    required: [true, 'יש להזין תאריך לתזכורת']
  },
  studentName: {
    type: String,
    required: [true, 'יש להזין שם תלמיד/ה']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'יש צורך במזהה משתמש']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Reminder ||
  mongoose.model('Reminder', reminderSchema);
