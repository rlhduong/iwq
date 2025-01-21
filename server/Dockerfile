FROM node:23.0.0-alpine

WORKDIR /app
COPY package*.json ./

ENV NODE_ENV=development
ENV PORT=8080

RUN npm install
COPY . .
EXPOSE 8080
CMD npm run dev