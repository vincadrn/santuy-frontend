FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

ARG ENVIRONMENT="development"
RUN echo "Building for ${ENVIRONMENT}"

RUN npm install
RUN npx vite build --mode ${ENVIRONMENT}

FROM nginx:1.27.4-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD nginx -g 'daemon off;'
