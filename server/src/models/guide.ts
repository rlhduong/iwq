import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
  questionId: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  options: { type: [String], required: true },
  answer: { type: Number, required: true },
});

const chapterSchema = new Schema({
  chapterId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['quiz', 'video', 'text'],
  },
  content: { type: String },
  videoUrl: { type: String },
  questions: { type: [questionSchema] },
});

const sectionSchema = new Schema({
  sectionId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  chapters: { type: [chapterSchema], required: true, default: [] },
});

const guideSchema = new Schema({
  guideId: { type: String },
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  image: { type: String },
  status: {
    type: String,
    required: true,
    enum: ['draft', 'published', 'archived'],
  },
  sections: { type: [sectionSchema], required: true, default: [] },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  featured: { type: Boolean, default: false },
  favourites: { type: Number, default: 0 },
});

const Guide = model('Guide', guideSchema);
export default Guide;
