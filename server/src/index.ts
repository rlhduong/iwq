import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dynamoose from 'dynamoose';
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';

/* ROUTES IMPORT */
import userRoutes from './routes/user';
import guideRoutes from './routes/guide';

/* APP CONFIG */
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  dynamoose.aws.ddb.local('http://dynamodb-local:8000');
}

const s3Config = {
  region: process.env.AWS_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
};
export const s3 = new S3Client(s3Config);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());

/* ROUTES */
app.use('/user', userRoutes);
app.use('/guides', upload.single('thumbnail'), guideRoutes);

/* SERVER LISTEN */
const port = process.env.PORT || 8080;
if (!isProduction) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
