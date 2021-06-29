# build environment
FROM node:14.6.0 as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN SENTRYCLI_CDNURL=https://npm.taobao.org/mirrors/sentry-cli/ yarn --registry=http://npm.xxx.com/
COPY . .
ARG SUB_COMMAND=build
ARG TAG_NAME=''
RUN yarn ${SUB_COMMAND}

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
