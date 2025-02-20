import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import mongoose from 'mongoose';
import serverless from 'serverless-http';

/* ROUTES IMPORT */
import userRoutes from './routes/user';
import guideRoutes from './routes/guide';

/* APP CONFIG */
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoose.connect(process.env.MONGODB_ATLAS_URI || '');
export const s3 = new S3Client({
  region: process.env.GUIDE_AWS_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.GUIDE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.GUIDE_AWS_SECRET_ACCESS_KEY || '',
  },
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000', process.env.FRONTEND_URL || ''],
    credentials: true,
  })
);
app.use(cookieParser());

/* ROUTES */
app.use('/user', userRoutes);
app.use('/guides', upload.single('thumbnail'), guideRoutes);

/* SERVER LISTEN */
app.get('/happy', (req, res) => {
  res.status(200).send('Happy coding!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export const handler = serverless(app);
