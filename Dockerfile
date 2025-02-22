FROM node:18-alpine

COPY . .

RUN npm install
RUN npm i -g serve
RUN npx vite build

EXPOSE 3000

CMD ["serve", "-s", "dist"]
