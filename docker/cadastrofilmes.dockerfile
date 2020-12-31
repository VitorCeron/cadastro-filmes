FROM node:latest
ENV NODE_ENV=development

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install dependencies
COPY package.json .
RUN npm install

COPY . .

#COPY . /var/www
#WORKDIR /var/www
#RUN npm install 
ENTRYPOINT ["npm", "start"]
EXPOSE 3000