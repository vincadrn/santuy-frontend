FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

ARG ENVIRONMENT="development"
RUN echo "Building for ${ENVIRONMENT}"

RUN npm install
RUN npx vite build --mode ${ENVIRONMENT}

FROM node:18-alpine
COPY --from=builder /app/dist /dist

RUN npm install -g serve

EXPOSE 3000

CMD serve -s dist
