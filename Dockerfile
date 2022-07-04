# Builder Container
FROM node:18-alpine3.15 as builder

WORKDIR /app
COPY . .

RUN yarn && yarn build

# App server container
FROM nginx:1.23.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080 80
