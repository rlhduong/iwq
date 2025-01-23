import { Schema, model } from 'dynamoose';

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    hashKey: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  favourites: {
    type: Array,
    required: false,
    schema: [String],
    default: [],
  },
});

export default model('User', userSchema);
