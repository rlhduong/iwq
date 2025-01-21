import { Schema, model } from 'dynamoose';

const sessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    hashKey: true,
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
