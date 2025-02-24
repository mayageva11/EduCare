import mongoose from 'mongoose';

export enum StudentTag {
  GREEN = 'green', // לומד, מתפקד בבית ספר ואין בעיות
  YELLOW = 'yellow', // קשב וריכוז לא מטופל וקשיים רגשיים
  ORANGE = 'orange', // קשיים לימודיים, רגשיים, והתנהגותיים
  RED = 'red', // קשיים לימודיים, התנהגותיים, חברתיים ומשפחתיים
  BLUE = 'blue', // מדווח קב"ס
  PURPLE = 'purple' // מדווח רווחה
}

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'יש להזין שם תלמיד/ה']
  },
  tags: {
    type: [String],
    enum: Object.values(StudentTag),
    required: [true, 'יש לבחור לפחות תגית אחת']
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

export default mongoose.models.Student ||
  mongoose.model('Student', studentSchema);
