---
title: API Reference

language_tabs:
- bash
- javascript

includes:

search: true

toc_footers:
- <a href='http://github.com/mpociot/documentarian'>Documentation Powered by Documentarian</a>
---
<!-- START_INFO -->
# Info

Welcome to the generated API reference.
[Get Postman Collection](http://localhost/docs/collection.json)
<!-- END_INFO -->

#Authentication
<!-- START_2be1f0e022faf424f18f30275e61416e -->
## Login

Handle a login request to the application.

> Example request:

```bash
curl "http://localhost/api/v1/auth/login" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/auth/login",
    "method": "POST",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/v1/auth/login`


<!-- END_2be1f0e022faf424f18f30275e61416e -->
<!-- START_3157fb6d77831463001829403e201c3e -->
## Registration

Handle a registration request for the application.

> Example request:

```bash
curl "http://localhost/api/v1/auth/register" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/auth/register",
    "method": "POST",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/v1/auth/register`


<!-- END_3157fb6d77831463001829403e201c3e -->
#Dashboards
<!-- START_9bb5562a2592cee5f0b67c57fb76f99a -->
## Dashboard

Get user dashboard data

> Example request:

```bash
curl "http://localhost/api/v1/dashboard/data" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/dashboard/data",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
{
    "weekly_count": 0,
    "weekly_avg_speed": null,
    "weekly_avg_pace": null,
    "week_chart": [
        [
            "12\/11",
            9.77,
            7.67
        ],
        [
            "12\/12",
            11.86,
            13
        ],
        [
            "12\/13",
            9.14,
            5
        ],
        [
            "12\/15",
            10.59,
            13
        ],
        [
            "12\/16",
            10.23,
            16
        ],
        [
            "12\/18",
            11.18,
            12
        ]
    ],
    "max_speed": "14.754098360656",
    "max_distance": "20",
    "max_time": "2:06:40"
}
```

### HTTP Request
`GET api/v1/dashboard/data`

`HEAD api/v1/dashboard/data`


<!-- END_9bb5562a2592cee5f0b67c57fb76f99a -->
<!-- START_0acb3ece78a7d22a13c67da9901c9eee -->
## Admin dashboard

Get admin dashboard data

> Example request:

```bash
curl "http://localhost/api/v1/dashboard/adminData" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/dashboard/adminData",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
{
    "total_users": 5,
    "new_users_this_week": 5,
    "new_users_this_month": 5,
    "total_entries": 180,
    "avg_entries_per_user": 36,
    "fastest_run": {
        "id": 152,
        "user_id": 5,
        "date": "2016-11-03 00:00:00",
        "distance": 20,
        "time": "1:20:00",
        "speed": 15,
        "pace": 4,
        "created_at": "2016-12-21 17:58:26",
        "updated_at": "2016-12-21 17:58:26",
        "user": {
            "id": 5,
            "name": "Sincere Ruecker",
            "email": "ottis.wunsch@example.com",
            "role": "user",
            "created_at": "2016-12-21 17:58:26",
            "updated_at": "2016-12-21 17:58:26"
        }
    },
    "longest_run": {
        "id": 39,
        "user_id": 1,
        "date": "2016-10-08 00:00:00",
        "distance": 20,
        "time": "1:29:20",
        "speed": 13.432835820896,
        "pace": 4.4666666666667,
        "created_at": "2016-12-21 17:58:26",
        "updated_at": "2016-12-21 17:58:26",
        "user": {
            "id": 1,
            "name": "vedmant",
            "email": "vedmant@gmail.com",
            "role": "admin",
            "created_at": "2016-12-21 17:58:26",
            "updated_at": "2016-12-21 17:58:26"
        }
    }
}
```

### HTTP Request
`GET api/v1/dashboard/adminData`

`HEAD api/v1/dashboard/adminData`


<!-- END_0acb3ece78a7d22a13c67da9901c9eee -->
#Entry
<!-- START_9885765a0eba68c236ad6a094aeda978 -->
## All ennties list

Display a listing of all users time entries (admin access only).

> Example request:

```bash
curl "http://localhost/api/v1/entry/all" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/entry/all",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
{
    "entries": {
        "total": 180,
        "per_page": 2,
        "current_page": 1,
        "last_page": 90,
        "next_page_url": "http:\/\/localhostapi\/v1\/entry\/all?page=2",
        "prev_page_url": null,
        "from": 1,
        "to": 2,
        "data": [
            {
                "id": 74,
                "user_id": 2,
                "date": "2016-12-21 00:00:00",
                "distance": 20,
                "time": "1:25:40",
                "speed": 14.007782101167,
                "pace": 4.2833333333333,
                "created_at": "2016-12-21 17:58:26",
                "updated_at": "2016-12-21 17:58:26",
                "user": {
                    "id": 2,
                    "name": "manager",
                    "email": "manager@gmail.com",
                    "role": "manager",
                    "created_at": "2016-12-21 17:58:26",
                    "updated_at": "2016-12-21 17:58:26"
                }
            },
            {
                "id": 142,
                "user_id": 4,
                "date": "2016-12-21 00:00:00",
                "distance": 5,
                "time": "0:30:30",
                "speed": 9.8360655737705,
                "pace": 6.1,
                "created_at": "2016-12-21 17:58:26",
                "updated_at": "2016-12-21 17:58:26",
                "user": {
                    "id": 4,
                    "name": "Dr. Zula Weimann Sr.",
                    "email": "rwisoky@example.net",
                    "role": "user",
                    "created_at": "2016-12-21 17:58:26",
                    "updated_at": "2016-12-21 17:58:26"
                }
            }
        ]
    }
}
```

### HTTP Request
`GET api/v1/entry/all`

`HEAD api/v1/entry/all`


<!-- END_9885765a0eba68c236ad6a094aeda978 -->
<!-- START_65c8d1046202778f8d5e8f590b7695ed -->
## Entries list

Display a listing of time entries.

> Example request:

```bash
curl "http://localhost/api/v1/entry" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/entry",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
{
    "entries": {
        "total": 60,
        "per_page": 2,
        "current_page": 1,
        "last_page": 30,
        "next_page_url": "http:\/\/localhostapi\/v1\/entry?page=2",
        "prev_page_url": null,
        "from": 1,
        "to": 2,
        "data": [
            {
                "id": 21,
                "user_id": 1,
                "date": "2016-12-18 00:00:00",
                "distance": 12,
                "time": "1:04:24",
                "speed": 11.180124223602,
                "pace": 5.3666666666667,
                "created_at": "2016-12-21 17:58:26",
                "updated_at": "2016-12-21 17:58:26"
            },
            {
                "id": 16,
                "user_id": 1,
                "date": "2016-12-16 00:00:00",
                "distance": 16,
                "time": "1:33:52",
                "speed": 10.227272727273,
                "pace": 5.8666666666667,
                "created_at": "2016-12-21 17:58:26",
                "updated_at": "2016-12-21 17:58:26"
            }
        ]
    }
}
```

### HTTP Request
`GET api/v1/entry`

`HEAD api/v1/entry`


<!-- END_65c8d1046202778f8d5e8f590b7695ed -->
<!-- START_3289f9989af83178b71306f86511c809 -->
## Store Entry

Store a newly created time entry in storage.

> Example request:

```bash
curl "http://localhost/api/v1/entry" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/entry",
    "method": "POST",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/v1/entry`


<!-- END_3289f9989af83178b71306f86511c809 -->
<!-- START_b8a6863911bb39a1e86237d9575d27ee -->
## Show entry

Display the specified time entry.

> Example request:

```bash
curl "http://localhost/api/v1/entry/{entry}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/entry/{entry}",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
{
    "entry": {
        "id": 1,
        "user_id": 1,
        "date": "2016-12-11 00:00:00",
        "distance": 3,
        "time": "0:19:12",
        "speed": 9.375,
        "pace": 6.4,
        "created_at": "2016-12-21 17:58:26",
        "updated_at": "2016-12-21 17:58:26"
    }
}
```

### HTTP Request
`GET api/v1/entry/{entry}`

`HEAD api/v1/entry/{entry}`


<!-- END_b8a6863911bb39a1e86237d9575d27ee -->
<!-- START_178d5d19d4f73ab9ba96945c8e083263 -->
## Update entry

Update time entry in storage.

> Example request:

```bash
curl "http://localhost/api/v1/entry/{entry}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/entry/{entry}",
    "method": "PUT",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`PUT api/v1/entry/{entry}`

`PATCH api/v1/entry/{entry}`


<!-- END_178d5d19d4f73ab9ba96945c8e083263 -->
<!-- START_802c74715286cd8b3276562d36c98790 -->
## Delete entry

Remove time entry from storage.

> Example request:

```bash
curl "http://localhost/api/v1/entry/{entry}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/entry/{entry}",
    "method": "DELETE",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`DELETE api/v1/entry/{entry}`


<!-- END_802c74715286cd8b3276562d36c98790 -->
#Reports
<!-- START_f3e53b672e74b1d2798ed908c1abb6a6 -->
## Get weekly report

> Example request:

```bash
curl "http://localhost/api/v1/report/weekly" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/report/weekly",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
{
    "weekly": {
        "year": "2016",
        "min_year": "2016",
        "max_year": "2016",
        "data": [
            {
                "week": "50",
                "week_start": "2016-12-12",
                "week_end": "2016-12-18",
                "avg_speed": 10.96,
                "avg_distance": 12.14
            },
            {
                "week": "49",
                "week_start": "2016-12-05",
                "week_end": "2016-12-11",
                "avg_speed": 11.38,
                "avg_distance": 10.75
            },
            {
                "week": "47",
                "week_start": "2016-11-21",
                "week_end": "2016-11-27",
                "avg_speed": 12.27,
                "avg_distance": 10.67
            },
            {
                "week": "46",
                "week_start": "2016-11-14",
                "week_end": "2016-11-20",
                "avg_speed": 11.7,
                "avg_distance": 7.67
            },
            {
                "week": "45",
                "week_start": "2016-11-07",
                "week_end": "2016-11-13",
                "avg_speed": 11.85,
                "avg_distance": 10.5
            },
            {
                "week": "44",
                "week_start": "2016-10-31",
                "week_end": "2016-11-06",
                "avg_speed": 11.68,
                "avg_distance": 9.86
            },
            {
                "week": "43",
                "week_start": "2016-10-24",
                "week_end": "2016-10-30",
                "avg_speed": 11.72,
                "avg_distance": 13.13
            },
            {
                "week": "42",
                "week_start": "2016-10-17",
                "week_end": "2016-10-23",
                "avg_speed": 11.72,
                "avg_distance": 4.75
            },
            {
                "week": "41",
                "week_start": "2016-10-10",
                "week_end": "2016-10-16",
                "avg_speed": 9.51,
                "avg_distance": 14
            },
            {
                "week": "40",
                "week_start": "2016-10-03",
                "week_end": "2016-10-09",
                "avg_speed": 11.78,
                "avg_distance": 13.67
            },
            {
                "week": "39",
                "week_start": "2016-09-26",
                "week_end": "2016-10-02",
                "avg_speed": 11.39,
                "avg_distance": 11.75
            },
            {
                "week": "38",
                "week_start": "2016-09-19",
                "week_end": "2016-09-25",
                "avg_speed": 11.05,
                "avg_distance": 11
            }
        ]
    }
}
```

### HTTP Request
`GET api/v1/report/weekly`

`HEAD api/v1/report/weekly`


<!-- END_f3e53b672e74b1d2798ed908c1abb6a6 -->
#User
<!-- START_957f36a05e68536731995f18794d7502 -->
## Сurrent authenticated user

Return current authenticated user data

> Example request:

```bash
curl "http://localhost/api/v1/user/me" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/user/me",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
{
    "id": 1,
    "name": "vedmant",
    "email": "vedmant@gmail.com",
    "role": "admin",
    "created_at": "2016-12-21 17:58:26",
    "updated_at": "2016-12-21 17:58:26"
}
```

### HTTP Request
`GET api/v1/user/me`

`HEAD api/v1/user/me`


<!-- END_957f36a05e68536731995f18794d7502 -->
<!-- START_b2892eb191cd19c0a6f1aae56ba43db4 -->
## Users list

Display a listing of users

> Example request:

```bash
curl "http://localhost/api/v1/user" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/user",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
{
    "users": {
        "total": 5,
        "per_page": 2,
        "current_page": 1,
        "last_page": 3,
        "next_page_url": "http:\/\/localhostapi\/v1\/user?page=2",
        "prev_page_url": null,
        "from": 1,
        "to": 2,
        "data": [
            {
                "id": 1,
                "name": "vedmant",
                "email": "vedmant@gmail.com",
                "role": "admin",
                "created_at": "2016-12-21 17:58:26",
                "updated_at": "2016-12-21 17:58:26"
            },
            {
                "id": 2,
                "name": "manager",
                "email": "manager@gmail.com",
                "role": "manager",
                "created_at": "2016-12-21 17:58:26",
                "updated_at": "2016-12-21 17:58:26"
            }
        ]
    }
}
```

### HTTP Request
`GET api/v1/user`

`HEAD api/v1/user`


<!-- END_b2892eb191cd19c0a6f1aae56ba43db4 -->
<!-- START_eda2b3d78b052ccb36bffab3b344d72a -->
## Show user

Display the specified user.

> Example request:

```bash
curl "http://localhost/api/v1/user/{user}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/user/{user}",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
{
    "user": {
        "id": 1,
        "name": "vedmant",
        "email": "vedmant@gmail.com",
        "role": "admin",
        "created_at": "2016-12-21 17:58:26",
        "updated_at": "2016-12-21 17:58:26"
    }
}
```

### HTTP Request
`GET api/v1/user/{user}`

`HEAD api/v1/user/{user}`


<!-- END_eda2b3d78b052ccb36bffab3b344d72a -->
<!-- START_1006d782d67bb58039bde349972eb2f0 -->
## Update user

Update the specified user in storage.

> Example request:

```bash
curl "http://localhost/api/v1/user/{user}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/user/{user}",
    "method": "PUT",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`PUT api/v1/user/{user}`

`PATCH api/v1/user/{user}`


<!-- END_1006d782d67bb58039bde349972eb2f0 -->
<!-- START_a5d7655acadc1b6c97d48e68f1e87be9 -->
## Delete user

Remove the specified user from storage.

> Example request:

```bash
curl "http://localhost/api/v1/user/{user}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/v1/user/{user}",
    "method": "DELETE",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`DELETE api/v1/user/{user}`


<!-- END_a5d7655acadc1b6c97d48e68f1e87be9 -->
