FROM node:12.18-alpine
ENV API_URL=http://128.199.252.245:3001/mytodo/v1
ENV AUTH_URL=http://128.199.252.245:3001/auth
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 5000
CMD [ "serve", "-s", "build" ]