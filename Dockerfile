#base image
FROM node:10.13.0 as builder

# set working directory
RUN mkdir /app
WORKDIR /app

# install and cache app dependencies
COPY package.json /app
RUN npm install --silent

COPY . /app
RUN npm run build

FROM nginx:1.15.6
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]