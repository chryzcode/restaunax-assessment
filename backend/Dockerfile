# Use the official Node.js image.
FROM node:18-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies.
RUN npm install

# Copy application code.
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Run the web service on container startup.
CMD [ "npm", "start" ]
