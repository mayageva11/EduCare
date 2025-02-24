import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'שם פרטי הוא שדה חובה']
  },
  lastName: {
    type: String,
    required: [true, 'שם משפחה הוא שדה חובה']
  },
  email: {
    type: String,
    required: [true, 'אימייל הוא שדה חובה'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'סיסמה היא שדה חובה']
  },
  certificateUrl: {
    type: String,
    required: [true, 'תעודת יועץ היא שדה חובה']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
