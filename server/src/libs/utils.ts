import bcrypt from 'bcrypt';
import { s3 } from '../index';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
dotenv.config();

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const cmpPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const uploadImgS3 = async (
  file: Express.Multer.File,
  guideId: string
) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME || '',
    Key: `guides/${guideId}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const command = new PutObjectCommand(params);
  await s3.send(command);
};

export const getImgS3 = async (guideId: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME || '',
    Key: `guides/${guideId}`,
  };
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};
