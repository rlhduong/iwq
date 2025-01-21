import { Schema, model } from 'dynamoose';

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    hashKey: true,
  },
  username: {
    type: String,
    required: true,
    index: {
      name: 'usernameIndex',
    },
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
