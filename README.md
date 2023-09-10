# Scheduler
A scheduler is a nodeJS backend app to schedule an event with present users in the app.


**before**
as I have used mongodb. you need to run mongodb server in local or atlas cluster url you can use in .env file please add env variables.

sample .env

```
PORT=3001
MONGO_DB_URI=yourURL

accessSecret=youranykey
refreshSecret=youranykey
accessValidity=1d  // add as you wish
refreshValidity=1d //add as you wish
```

# Locally run the server/app 
assign PORT, MONGO_DB_URI (you can add atlas mongodb cluster url), accessSecret,refreshSecret, accessValidity,refreshValidity in **.env** file.
you can add any keys and validity
```
npm install
npm install -g ts-node
npx tsc
npm start
```
**OR**

# Create dockerfile to run this app

**Optional** =>  Before dockerize, if you have run this server/app in the local host
please add this files in **dockerignore** file
```
.env
.gitignore
node_modules/
build
dist
```
Now yo can build and run below steps

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
**getAllUsers & getSingleUser**

GET request
```
http://localhost:3001/prod/api/v1/users
http://localhost:3001/prod/api/v1/users/user/:id
```
if you want any specific users you can add query parameter
as firstName, lastName and email as filter (all optional)

**updateUserDetails & password**

you can update password with password end point, from this below userSchema you can upadte all field instead of  email because its unique field for now.

Note: user who want to add his/her offHours in user schema can use this API as it will store in **unavailability** field as array of object will be pushed to this field

```
    {
      "start": "13:30",
      "end": "14:30"
    }
```

Sample user data,


```
{
  "_id": {
    "$oid": "64fdd18e397f44c1b971b925"
  },
  "firstName": "sam",
  "lastName": "snow",
  "email": "sam@gmail.com",
  "password": "$2b$10$6MWJnWx99Vd4dM/QCme53uLnM4TwkRZznM1D4vEqwvmiEFxvP7q9q",
  "meetings": {
    "2023-09-10": {
      "eventDate": {
        "$date": "2023-09-10T00:00:00.000Z"
      },
      "events": [
        {
          "eventTime": {
            "start": "09:11",
            "end": "10:20"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        },
        {
          "eventTime": {
            "start": "02:30",
            "end": "03:00"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        }
      ]
    },
    "2023-09-09": {
      "eventDate": {
        "$date": "2023-09-09T00:00:00.000Z"
      },
      "events": [
        {
          "eventTime": {
            "start": "09:11",
            "end": "10:20"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        },
        {
          "eventTime": {
            "start": "02:30",
            "end": "03:00"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        }
      ]
    },
    "2023-10-11": {
      "eventDate": {
        "$date": "2023-10-11T00:00:00.000Z"
      },
      "events": [
        {
          "eventTime": {
            "start": "09:11",
            "end": "10:20"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        },
        {
          "eventTime": {
            "start": "02:30",
            "end": "03:00"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        }
      ]
    },
    "2023-09-05": {
      "eventDate": {
        "$date": "2023-09-05T00:00:00.000Z"
      },
      "events": [
        {
          "eventTime": {
            "start": "09:11",
            "end": "10:20"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        },
        {
          "eventTime": {
            "start": "02:30",
            "end": "03:00"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        }
      ]
    },
    "2023-09-11": {
      "eventDate": {
        "$date": "2023-09-11T00:00:00.000Z"
      },
      "events": [
        {
          "eventTime": {
            "start": "09:11",
            "end": "10:20"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        },
        {
          "eventTime": {
            "start": "02:30",
            "end": "03:00"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        }
      ]
    },
    "2023-11-18": {
      "eventDate": {
        "$date": "2023-11-18T00:00:00.000Z"
      },
      "events": [
        {
          "eventTime": {
            "start": "09:11",
            "end": "10:20"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        },
        {
          "eventTime": {
            "start": "02:30",
            "end": "03:00"
          },
          "eventId": "64f96b57e0bc1bef9936e4e6"
        }
      ]
    }
  },
  "unavailability": [
    {
      "start": "11:30",
      "end": "12:30"
    },
    {
      "start": "15:30",
      "end": "16:30"
    }
  ],
  "__v": 0
}
```

PUT request

```
http://localhost:3001/prod/api/v1/users/user/update

http://localhost:3001/prod/api/v1/users/user/updatePassword
```


# Appointments


before creating any event or hoursOff we have to validate available guest to add in event
by another API 


**checkGuestAvailabilty**

POST request

sample payload body
```
{
id:"64fdd18e397f44c1b971b925"
startTime:"09:50"
endTime:"10:40"
eventDate:"2023-09-10T00:00:00.000Z"
}
```

POST request
```
http://localhost:3001/prod/api/v1/appointments/availability
```
once you receive boolean response **true** or **false**
you can add guest to below api 

Response:

```
{
    "availability": false,
    "bookedSlot": {
        "start": "09:11",
        "end": "10:20"
    }
}
```
Then you can create new event


**createEvevet**

```
http://localhost:3001/prod/api/v1/appointments/createEvent
```

sample payoad to send

```
{
    "title": "developer meeting",
    "agenda": "bugs dicussuion",
    "guests": [
        {
            "userId": "64f9950a6e6a85a6aeff0ab6",
            "email": "jon@mail.com"
        },
        {
            "userId": "64f9950a6e6a85a6aeff0rt9",
            "email": "mike@mail.com"
        }
    ],
    "hostName": "sohel patel",
    "createdBy": "sohel@gmail.com ",
    "date": "2023-09-08",
    "eventTime": {
        "start": "08:30",
        "end": "09:30"
    },
    "timezone": "IST"
}
```

Note: date is YYYY-MM-DD format stored by converting ISOString format. time is 24HR format 00:00 To 23:59

**upComingEvents** OR **upComingAppointments**

GET request

as provide user ID in query in response you will receive meeting List with ID of event, time, date.
```
http://localhost:3001/prod/api/v1/users/upcomingEvents?id=64fdd18e397f44c1b971b925
```

Response

```
        "meetings": [
            {
                "k": "2023-09-10",
                "v": {
                    "eventDate": "2023-09-10T00:00:00.000Z",
                    "events": [
                        {
                            "eventTime": {
                                "start": "11:11",
                                "end": "12:20"
                            },
                            "eventId": "64f96b57e0bc1bef9936e4e6"
                        },
                        {
                            "eventTime": {
                                "start": "15:30",
                                "end": "16:00"
                            },
                            "eventId": "64f96b57e0bc1bef9936e4e6"
                        }
                    ]
                }
            },
            {
                "k": "2023-09-11",
                "v": {
                    "eventDate": "2023-09-11T00:00:00.000Z",
                    "events": [
                        {
                            "eventTime": {
                                "start": "10:11",
                                "end": "14:20"
                            },
                            "eventId": "64f96b57e0bc1bef9936e4e6"
                        }
                    ]
                }
            },
        ]
    
```


**getAllEvents**

GET request

```
http://localhost:3001/prod/api/v1/appointments/events
http://localhost:3001/prod/api/v1/appointments/events?start=09:30&end=10:30&createdBy=sohel@mail.com&date=05-24-2023
```


we can get all events in a database or add filter  to get specific events or events
by id, createdBy, evenTime as start & end, date.
















