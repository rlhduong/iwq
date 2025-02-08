import { Schema, model } from 'dynamoose';

const questionSchema = new Schema({
  questionId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    required: true,
    schema: [String],
  },
  answer: {
    type: Number,
    required: true,
  },
});

const chapterScheme = new Schema({
  chapterId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['quiz', 'video', 'text'],
  },
  content: {
    type: String,
    required: false,
  },
  videoUrl: {
    type: String,
    required: false,
  },
  questions: {
    type: Array,
    required: false,
    schema: [questionSchema],
  },
});

const sectionSchema = new Schema({
  sectionId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  chapters: {
    type: Array,
    required: true,
    schema: [chapterScheme],
  },
});

const guideSchema = new Schema({
  guideId: {
    type: String,
    required: true,
    hashKey: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming the image will be stored as a URL or file path
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['draft', 'published', 'archived'], // Example statuses
  },
  sections: {
    type: Array,
    required: true,
    schema: [sectionSchema],
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  favourites: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Guide = model('Guide', guideSchema);
export default Guide;
