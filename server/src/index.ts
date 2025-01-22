import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dynamoose from 'dynamoose';

/* ROUTES IMPORT */
import userRoutes from './routes/user';
import guideRoutes from './routes/guide';

/* APP CONFIG */
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  dynamoose.aws.ddb.local('http://dynamodb-local:8000');
}

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
app.use('/guides', guideRoutes);

/* SERVER LISTEN */
const port = process.env.PORT || 8080;
if (!isProduction) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
