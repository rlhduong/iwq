import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Number,
    required: true,
  },
});

export default model('Session', sessionSchema);
