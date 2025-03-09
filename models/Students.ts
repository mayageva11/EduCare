import mongoose from 'mongoose';

export enum StudentTag {
  GREEN = 'green', // לומד, מתפקד בבית ספר ואין בעיות
  YELLOW = 'yellow', // קשב וריכוז לא מטופל וקשיים רגשיים
  ORANGE = 'orange', // קשיים לימודיים, רגשיים, והתנהגותיים
  RED = 'red', // קשיים לימודיים, התנהגותיים, חברתיים ומשפחתיים
  BLUE = 'blue', // מדווח קב"ס
  PURPLE = 'purple' // מדווח רווחה
}

const ParentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Parent name is required']
  },
  phone: {
    type: String,
    required: [true, 'Parent phone is required']
  }
});

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'יש להזין שם פרטי']
    },
    lastName: {
      type: String,
      required: [true, 'יש להזין שם משפחה']
    },
    grade: {
      type: String,
      required: [true, 'יש להזין כיתה']
    },
    tags: {
      type: [String],
      enum: Object.values(StudentTag),
      required: [true, 'יש לבחור לפחות תגית אחת']
    },
    parents: {
      type: [ParentSchema],
      required: [true, 'Parens data is required']
    },
    counselorNotes: {
      type: String,
      default: ''
    },
    isOnMedication: {
      type: Boolean,
      default: false
    },
    medicationDetails: {
      type: String,
      default: ''
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
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// וירטואל לשם מלא
studentSchema.virtual('name').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// אינדקס משולב לחיפוש יעיל לפי שם
studentSchema.index({ firstName: 'text', lastName: 'text' });

export default mongoose.models.Student ||
  mongoose.model('Student', studentSchema);
