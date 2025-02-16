import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: String, required: true },
  favourites: {
    type: [String],
    default: [],
  },
});

export default model('User', userSchema);
