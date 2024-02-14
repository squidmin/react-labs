# Use an official Node runtime as a parent image
FROM node:14-slim as build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application's code
COPY . ./

# Build the app
RUN npm run build

# Use Nginx to serve the app
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
