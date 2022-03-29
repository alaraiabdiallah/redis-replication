FROM node:12-alpine3.12

# Create app directory
WORKDIR /app
ADD index.js /app

# Install app dependencies
RUN npm install ioredis express

CMD ["node", "index.js" ]