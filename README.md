# Scheduler
Scheduler is nodeJS backend app to schedule a event with present users in the app.

# Locally run the server
assign PORT, MONGO_DB_URI (you can add atlas mongodb cluster url), accessSecret,refreshSecret, accessValidity,refreshValidity in **.env** file.
you can add any keys and validity
```
npm install
npm install -g ts-node
npx tsc
npm start
```

# Create dockerfile to run this app
```
FROM node:16
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm install -g ts-node
EXPOSE 3001
RUN npx tsc
CMD ["npm", "start"]
```

**API endpoints example as local host**

# User Module 

**register & login**

POST request

```
http://localhost:3001/prod/api/v1/users/register
http://localhost:3001/prod/api/v1/users/login
```
**getAllUsers**

GET request
```
http://localhost:3001/prod/api/v1/users
```
if you want any specific users you can add query parameter
as firstName, lastName and email as filter (all optional)

