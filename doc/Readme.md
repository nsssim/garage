
# GarajApp

There are **Mobile** and **Web** endpoints  , use the explorer panel on the Left side to find and test your favorite endpoint !


## Indices

* [Mobile](#mobile)

  * [Doors_list](#1-doors_list)
  * [Get_version](#2-get_version)
  * [Login  step 1](#3-login--step-1)
  * [Login  step 2 - sms verification](#4-login--step-2---sms-verification)
  * [Send_device](#5-send_device)
  * [Token_control](#6-token_control)
  * [password_update](#7-password_update)

* [Web](#web)

  * [Admin - add_customer](#1-admin---add_customer)
  * [Admin - check_token_admin](#2-admin---check_token_admin)
  * [Admin - delete_customer](#3-admin---delete_customer)
  * [Admin - get_admin_customers_all](#4-admin---get_admin_customers_all)
  * [Admin - get_admin_dashboard](#5-admin---get_admin_dashboard)
  * [Admin - login](#6-admin---login)
  * [Admin - reset_customer_password](#7-admin---reset_customer_password)
  * [Admin - update_customer](#8-admin---update_customer)
  * [Admin - update_customer_logs_status](#9-admin---update_customer_logs_status)
  * [Admin - update_customer_status](#10-admin---update_customer_status)
  * [User - add_client](#11-user---add_client)
  * [User - add_device](#12-user---add_device)
  * [User - check_token](#13-user---check_token)
  * [User - delete_client](#14-user---delete_client)
  * [User - delete_device](#15-user---delete_device)
  * [User - get_client_permissions](#16-user---get_client_permissions)
  * [User - get_device_relays](#17-user---get_device_relays)
  * [User - get_user_clients](#18-user---get_user_clients)
  * [User - get_user_clients_logs](#19-user---get_user_clients_logs)
  * [User - get_user_dashboard](#20-user---get_user_dashboard)
  * [User - get_user_devices](#21-user---get_user_devices)
  * [User - get_user_info](#22-user---get_user_info)
  * [User - login](#23-user---login)
  * [User - reset_client_password](#24-user---reset_client_password)
  * [User - set_client_permissions](#25-user---set_client_permissions)
  * [User - update_client](#26-user---update_client)
  * [User - update_client_status](#27-user---update_client_status)
  * [User - update_device](#28-user---update_device)
  * [User - update_geolocation](#29-user---update_geolocation)
  * [User - update_relay](#30-user---update_relay)
  * [User - update_relay_status](#31-user---update_relay_status)
  * [User - update_user_password](#32-user---update_user_password)


--------


## Mobile
End points for **mobile application** , Android and iOS .



### 1. Doors_list



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://https://api.garajapp.com.tr:4433/mobile-api/door-list
```



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l"
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l"
}
```



##### I. Example Response: Truthy reply
```js
[
    {
        "id": 2984,
        "roleName": "Bar1",
        "roleType": "SHUTTER",
        "projectName": "MettingRoom"
    },
    {
        "id": 2985,
        "roleName": "Bar2",
        "roleType": "SHUTTER",
        "projectName": "MettingRoom"
    },
    {
        "id": 2986,
        "roleName": "Bar3",
        "roleType": "SHUTTER",
        "projectName": "MettingRoom"
    },
    {
        "id": 2987,
        "roleName": "Bar4",
        "roleType": "SHUTTER",
        "projectName": "MettingRoom"
    },
    {
        "id": 2988,
        "roleName": "shu1",
        "roleType": "BARRIER",
        "projectName": "MettingRoom"
    },
    {
        "id": 2990,
        "roleName": "shu3",
        "roleType": "BARRIER",
        "projectName": "MettingRoom"
    },
    {
        "id": 2991,
        "roleName": "shu4",
        "roleType": "BARRIER",
        "projectName": "MettingRoom"
    }
]
```


***Status Code:*** 200

<br>



##### II. Example Request: Falsy answer



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5lzzzzz"
}
```



##### II. Example Response: Falsy answer
```js
[]
```


***Status Code:*** 200

<br>



### 2. Get_version



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://localhost:4433/mobile-api/get_version
```



***Body:***

```js        
{
    "token" : "Vj^VSxsF^ps(q#3kq32fwP3dy$qJAJ7x"
}
```



***More example Requests/Responses:***


##### I. Example Request: Falsy answer



***Body:***

```js        
{
    "token" : "Vjds"
}
```



##### I. Example Response: Falsy answer
```js
{
    "token": "Vjds",
    "status": 0
}
```


***Status Code:*** 422

<br>



##### II. Example Request: Truthy reply



***Body:***

```js        
{
    "token" : "Vj^VSxsF^ps(q#3kq32fwP3dy$qJAJ7x"
}
```



##### II. Example Response: Truthy reply
```js
{
    "android_min_ver_name": "3.5",
    "android_cur_ver_name": "5.0",
    "ios_min_ver_name": "1.0",
    "ios_cur_ver_name": "2.0",
    "android_min_ver_code": 3,
    "android_cur_ver_code": 5,
    "ios_min_ver_code": 2,
    "ios_cur_ver_code": 3
}
```


***Status Code:*** 200

<br>



### 3. Login  step 1



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://api.garajapp.com.tr:4433/mobile-api/login
```



***Body:***

```js        
{
    "userName" : "nsm",
    "password" : "sdfsdf"
}
```



***More example Requests/Responses:***


##### I. Example Request: Falsy reply



***Body:***

```js        
{
    "userName" : "nsm",
    "password" : "6544"
}
```



##### I. Example Response: Falsy reply
```js
{
    "userName": "nsm",
    "password": "6544",
    "token": null,
    "status": "FALSE",
    "smsCode": null,
    "projectName": null
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Truthy reply



***Body:***

```js        
{
    "userName" : "nsm",
    "password" : "0000"
}
```



##### II. Example Response: Truthy reply
```js
{
    "userName": "nsm",
    "password": "0000",
    "token": null,
    "status": "SEND_SMS",
    "smsCode": null,
    "projectName": null
}
```


***Status Code:*** 200

<br>



### 4. Login  step 2 - sms verification



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://api.garajapp.com.tr:4433/mobile-api/login-sms-control
```



***Body:***

```js        
{
    "userName" : "nsm",
    "password" : "1234",
    "smsCode" : "42969"
}
```



***More example Requests/Responses:***


##### I. Example Request: Falsy reply



***Body:***

```js        
{
    "userName" : "nsm",
    "password" : "0000",
    "smsCode" : "99999"
}
```



##### I. Example Response: Falsy reply
```js
{
    "userName": "nsm",
    "password": "0000",
    "token": null,
    "status": "FALSE",
    "smsCode": "99999",
    "projectName": null
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Truthy reply



***Body:***

```js        
{
    "userName" : "nsm",
    "password" : "0000",
    "smsCode" : "24946"
}
```



##### II. Example Response: Truthy reply
```js
{
    "userName": "nsm",
    "password": "0000",
    "token": "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l",
    "status": "TRUE",
    "smsCode": "24946",
    "projectName": null
}
```


***Status Code:*** 200

<br>



### 5. Send_device


buttonStatus:

**shutter**

0 | 1 | 2 => Down | Up | Stop 

**barrier**

Any


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://api.garajapp.com.tr:4433/mobile-api/send-device
```



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l",
     "doorID" : 2984,
      "buttonStatus" : 0
}
```



***More example Requests/Responses:***


##### I. Example Request: Falsy answer (inactive)



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l",
     "doorID" : 2989,
      "buttonStatus" : 0
}
```



##### I. Example Response: Falsy answer (inactive)
```js
{
    "sendStatus": "FALSE"
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Truthy reply



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l",
     "doorID" : 2984,
      "buttonStatus" : 0
}
```



##### II. Example Response: Truthy reply
```js
{
    "sendStatus": "TRUE"
}
```


***Status Code:*** 200

<br>



##### III. Example Request: Falsy answer (error token)



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5lzzz",
    "doorID" : 2984,
    "buttonStatus" : 0
}
```



##### III. Example Response: Falsy answer (error token)
```js
{
    "sendStatus": "FALSE"
}
```


***Status Code:*** 200

<br>



##### IV. Example Request: Falsy answer (wrong door ID)



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l",
     "doorID" : 298888,
      "buttonStatus" : 0
}
```



##### IV. Example Response: Falsy answer (wrong door ID)
```js
{
    "timestamp": "Wed Feb 10 2021 11:17:08 GMT+0300 (GMT+03:00)",
    "status": 500,
    "error": "Internal Server Error",
    "message": "Unable to find role id =  298888",
    "trace": "",
    "path": "/mobile-api/send-device"
}
```


***Status Code:*** 200

<br>



### 6. Token_control



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://api.garajapp.com.tr:4433/mobile-api/token-control
```



***Body:***

```js        
{
    "token" : "wrongtokenssdfsdfsdfsdflkj"
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l"
}
```



##### I. Example Response: Truthy reply
```js
{
    "token": "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l",
    "status": 1
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Falsy answer



***Body:***

```js        
{
    "token" : "wrongtokenssdfsdfsdfsdflkj"
}
```



##### II. Example Response: Falsy answer
```js
{
    "token": "wrongtokenssdfsdfsdfsdflkj",
    "status": 0
}
```


***Status Code:*** 200

<br>



### 7. password_update



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://api.garajapp.com.tr:4433/mobile-api/password-update
```



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l",
    "oldPassword" : "0000",
    "newPassword" : "1234"
}
```



***More example Requests/Responses:***


##### I. Example Request: Falsy answer



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l",
    "oldPassword" : "0000",
    "newPassword" : "1234"
}
```



##### I. Example Response: Falsy answer
```js
{
    "reqStatus": "WRONG",
    "message": "Şifre Hatalı"
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Truthy reply



***Body:***

```js        
{
    "token" : "EsAO3L!CikG1AqkKR)I+PAxfl+)X%J5l",
    "oldPassword" : "0000",
    "newPassword" : "1234"
}
```



##### II. Example Response: Truthy reply
```js
{
    "reqStatus": "TRUE",
    "message": "Şifre Güncellendi"
}
```


***Status Code:*** 200

<br>



## Web
Endpoints for the web interface for the **user** and the **admin** 



### 1. Admin - add_customer



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/add_customer
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "fname": "BigBeta1",
    "lname": "BigBeta",
    "email": "info@BigBeta2.com",
    "phone": "+90784565455",
    "status": true,
    "username": "BigBeta2"
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "fname": "BigBeta",
    "lname": "BigBeta",
    "email": "info@BigBeta.com",
    "phone": "+90784565455",
    "status": true,
    "username": "BigBeta"
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "2574",
    "payload": true
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Falsy answer


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "fname": "BigDelta",
    "lname": "BigDelta",
    "email": "info@BigDelta.com",
    "phone": "+90545466456",
    "status": true,
    "username": "BigDelta"
}
```



##### II. Example Response: Falsy answer
```js
{
    "auth": 0,
    "code": 422,
    "meta": "empty data",
    "token": null
}
```


***Status Code:*** 422

<br>



##### III. Example Request: Falsy reply (email_already_registred)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "fname": "BigBeta1",
    "lname": "BigBeta",
    "email": "info@BigBeta2.com",
    "phone": "+90784565455",
    "status": true,
    "username": "BigBeta2"
}
```



##### III. Example Response: Falsy reply (email_already_registred)
```js
{
    "auth": 1,
    "code": 2,
    "meta": "email_already_registred",
    "payload": false
}
```


***Status Code:*** 200

<br>



##### IV. Example Request: Falsy reply (username_already_registred)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "fname": "BigBeta1",
    "lname": "BigBeta",
    "email": "info@BigBeta.com",
    "phone": "+90784565455",
    "status": true,
    "username": "BigBeta"
}
```



##### IV. Example Response: Falsy reply (username_already_registred)
```js
{
    "auth": 1,
    "code": 1,
    "meta": "username_already_registred",
    "payload": false
}
```


***Status Code:*** 200

<br>



### 2. Admin - check_token_admin



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/check_token_admin
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Falsy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}}654 |  |



##### I. Example Response: Falsy reply
```js
{
    "auth": 0,
    "code": 1,
    "meta": "Failed to authentificate ! "
}
```


***Status Code:*** 401

<br>



##### II. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



##### II. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "okay"
}
```


***Status Code:*** 200

<br>



### 3. Admin - delete_customer



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/delete_customer
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



### 4. Admin - get_admin_customers_all



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/get_admin_customers_all
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "customers_data",
    "payload": {
        "admin_customers": [
            {
                "id": 2468,
                "username": "hairofistanbul",
                "fname": "muhammed talha",
                "lname": "kara",
                "email": "",
                "phone": "",
                "log_status": "ACTIVE",
                "status": "ACTIVE"
            },
            {
                "id": 2467,
                "username": "gensan01",
                "fname": "gensan",
                "lname": "gensan",
                "email": "",
                "phone": "",
                "log_status": "",
                "status": "ACTIVE"
            },
            {
                "id": 2466,
                "username": "ihlamursitesi",
                "fname": "serif",
                "lname": "ali",
                "email": "",
                "phone": "",
                "log_status": "ACTIVE",
                "status": "ACTIVE"
            },
            {
                "id": 2465,
                "username": "denizaprtmani",
                "fname": "barış",
                "lname": "çifci ",
                "email": "",
                "phone": "",
                "log_status": "ACTIVE",
                "status": "ACTIVE"
            },
            {
                "id": 2464,
                "username": "mehmet58",
                "fname": "Mehmet",
                "lname": "Şanlı",
                "email": "",
                "phone": "",
                "log_status": "ACTIVE",
                "status": "ACTIVE"
            },
            {
                "id": 2463,
                "username": "ankashayvancilik",
                "fname": "MELTEM",
                "lname": "MELTEM",
                "email": "",
                "phone": "",
                "log_status": "ACTIVE",
                "status": "ACTIVE"
            },
            {
                "id": 2462,
                "username": "doguselektronik",
                "fname": "Okan",
                "lname": "Dogus",
                "email": null,
                "phone": null,
                "log_status": "ACTIVE",
                "status": "ACTIVE"
            },
            {
                "id": 2461,
                "username": "birkentvillalari",
                "fname": "Bora",
                "lname": "Ateşyakan",
                "email": null,
                "phone": null,
                "log_status": "ACTIVE",
                "status": "ACTIVE"
            },
            {
                "id": 1852,
                "username": "bvd",
                "fname": "bvd",
                "lname": "bvd",
                "email": "aaa@aaa.aaa",
                "phone": "5458736753",
                "log_status": "ACTIVE",
                "status": "ACTIVE"
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



### 5. Admin - get_admin_dashboard



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/get_admin_dashboard
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "dashboard_data",
    "payload": {
        "admin_users_count": "9",
        "admin_devices_count": "6",
        "admin_doors_count": "67",
        "admin_clients_count": "102"
    }
}
```


***Status Code:*** 200

<br>



### 6. Admin - login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/loginAdmin
```



***Body:***

```js        
{
    "username": "xenon",
    "password": "admin",
    "lang": "tr"
}
```



***More example Requests/Responses:***


##### I. Example Request: Falsy reply (wrong password)



***Body:***

```js        
{
    "username": "xenon",
    "password": "admin555",
    "lang": "tr"
}
```



##### I. Example Response: Falsy reply (wrong password)
```js
{
    "auth": 0,
    "code": 1,
    "meta": "wrong password",
    "token": null
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Falsy reply (user not found)



***Body:***

```js        
{
    "username": "xenon",
    "password": "admin",
    "lang": "tr"
}
```



##### II. Example Response: Falsy reply (user not found)
```js
{
    "auth": 0,
    "code": 0,
    "meta": "user not found",
    "token": null
}
```


***Status Code:*** 200

<br>



##### III. Example Request: Truthy reply



***Body:***

```js        
{
    "username": "xenon",
    "password": "admin",
    "lang": "tr"
}
```



##### III. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFuZyI6InRyIiwiaWF0IjoxNjEzMDMxNTY4LCJleHAiOjE2MTU2MjM1Njh9.Pe4mHbPF4jMM5r6fd0pP6WTuogSchNZ-9PKkQ88MEGs"
}
```


***Status Code:*** 200

<br>



### 7. Admin - reset_customer_password



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/reset_customer_password
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "id": 2575,
    "username": "BigAlpha",
    "fname": "BigBeta32",
    "lname": "BigBeta3",
    "email": "info@BigBeta2.com",
    "phone": "+90784565455",
    "log_status": true,
    "status": false
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "id": 2575,
    "username": "BigAlpha",
    "fname": "BigBeta32",
    "lname": "BigBeta3",
    "email": "info@BigBeta2.com",
    "phone": "+90784565455",
    "log_status": true,
    "status": false
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "reset_customer_password",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 8. Admin - update_customer



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_customer
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "id": 2575,
    "username": "BigAlpha",
    "fname": "BigBeta32",
    "lname": "BigBeta3",
    "email": "info@BigBeta.com",
    "phone": "+90784565455",
    "log_status": false,
    "status": true
}
```



***More example Requests/Responses:***


##### I. Example Request: Falsy answer (email_already_registred)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "id": 2575,
    "username": "BigAlpha",
    "fname": "BigBeta32",
    "lname": "BigBeta3",
    "email": "info@BigBeta.com",
    "phone": "+90784565455",
    "log_status": false,
    "status": true
}
```



##### I. Example Response: Falsy answer (email_already_registred)
```js
{
    "auth": 1,
    "code": 2,
    "meta": "email_already_registred",
    "payload": false
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "id": 2575,
    "username": "BigAlpha",
    "fname": "BigBeta32",
    "lname": "BigBeta3",
    "email": "info@BigBeta2.com",
    "phone": "+90784565455",
    "log_status": false,
    "status": true
}
```



##### II. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "update_customer",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 9. Admin - update_customer_logs_status



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_customer_logs_status
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "id": 2575,
    "username": "BigAlpha",
    "fname": "BigBeta32",
    "lname": "BigBeta3",
    "email": "info@BigBeta2.com",
    "phone": "+90784565455",
    "log_status": false,
    "status": false
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "id": 2575,
    "username": "BigAlpha",
    "fname": "BigBeta32",
    "lname": "BigBeta3",
    "email": "info@BigBeta2.com",
    "phone": "+90784565455",
    "log_status": false,
    "status": false
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "update_customer_logs_status",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 10. Admin - update_customer_status



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_customer_status
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "id": 2575,
    "username": "BigAlpha",
    "fname": "BigBeta32",
    "lname": "BigBeta3",
    "email": "info@BigBeta2.com",
    "phone": "+90784565455",
    "log_status": false,
    "status": true
}
```



***More example Requests/Responses:***


##### I. Example Request: Admin - Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN_ADMIN}} |  |



***Body:***

```js        
{
    "id": 2575,
    "username": "BigAlpha",
    "fname": "BigBeta32",
    "lname": "BigBeta3",
    "email": "info@BigBeta2.com",
    "phone": "+90784565455",
    "log_status": false,
    "status": true
}
```



##### I. Example Response: Admin - Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "update_customer_status",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 11. User - add_client



***Endpoint:***

```bash
Method: POST
Type: 
URL: https://api.garajapp.com.tr:4433/web-api/check_token
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Falsy answer (email_already_registred)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "fname": "delta",
    "lname": "green",
    "email": "delta@delta.com",
    "phone": "+90123456789",
    "status": true,
    "username": "delta2"
}
```



##### I. Example Response: Falsy answer (email_already_registred)
```js
{
    "auth": 1,
    "code": 2,
    "meta": "email_already_registred",
    "payload": false
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Falsy answer (error validation)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



##### II. Example Response: Falsy answer (error validation)
```js
{
    "code": 422,
    "meta": {
        "errors": [
            {
                "msg": "2",
                "param": "lname",
                "location": "body"
            },
            {
                "msg": "2",
                "param": "lname",
                "location": "body"
            },
            {
                "msg": "3",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "3",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "4",
                "param": "phone",
                "location": "body"
            },
            {
                "msg": "5",
                "param": "username",
                "location": "body"
            },
            {
                "msg": "5",
                "param": "username",
                "location": "body"
            }
        ]
    }
}
```


***Status Code:*** 422

<br>



##### III. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "fname": "delta",
    "lname": "green",
    "email": "delta2@delta.com",
    "phone": "+90123456789",
    "status": true,
    "username": "delta2"
}
```



##### III. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "2572",
    "payload": true
}
```


***Status Code:*** 200

<br>



##### IV. Example Request: Falsy answer (username_already_registred)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "fname": "delta",
    "lname": "green",
    "email": "delta@delta.com",
    "phone": "+90123456789",
    "status": true,
    "username": "delta"
}
```



##### IV. Example Response: Falsy answer (username_already_registred)
```js
{
    "auth": 1,
    "code": 1,
    "meta": "username_already_registred",
    "payload": false
}
```


***Status Code:*** 200

<br>



### 12. User - add_device



***Endpoint:***

```bash
Method: POST
Type: 
URL: https://api.garajapp.com.tr:4433/web-api/check_token
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Falsy answer (socket_alredy_in_use)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "dev_name": "GarajBox_1612970100134",
    "ip": "78.189.28.103:100",
    "port": 0,
    "project": "GarajBox_1612970100134"
}
```



##### I. Example Response: Falsy answer (socket_alredy_in_use)
```js
{
    "auth": 1,
    "code": 4082,
    "meta": "socket_alredy_in_use",
    "payload": false
}
```


***Status Code:*** 408

<br>



##### II. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "dev_name": "GarajBox_1612970256407",
    "ip": "78.189.28.103:100",
    "port": 0,
    "project": "GarajBox_1612970256407"
}
```



##### II. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "ok",
    "payload": {
        "last_device_id": "153",
        "device_data": {
            "dev_name": "GarajBox_1612970256407",
            "ip": "78.189.28.103:100",
            "port": 0,
            "project": "GarajBox_1612970256407"
        }
    }
}
```


***Status Code:*** 200

<br>



##### III. Example Request: Falsy answer (not_connected)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "dev_name": "GarajBox_1612969980989",
    "ip": "100.100.100.100:100",
    "port": 0,
    "project": "GarajBox_1612969980989"
}
```



##### III. Example Response: Falsy answer (not_connected)
```js
{
    "auth": 1,
    "code": 4081,
    "meta": "not_connected",
    "payload": false
}
```


***Status Code:*** 408

<br>



### 13. User - check_token


used with a timer to check if the token has expired so the user will be redirected to login page


***Endpoint:***

```bash
Method: POST
Type: 
URL: https://api.garajapp.com.tr:4433/web-api/check_token
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Falsy answer (Failed to authentificate)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token |  |  |



##### I. Example Response: Falsy answer (Failed to authentificate)
```js
{
    "auth": 0,
    "code": 1,
    "meta": "Failed to authentificate ! "
}
```


***Status Code:*** 401

<br>



##### II. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



##### II. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "okay"
}
```


***Status Code:*** 200

<br>



### 14. User - delete_client



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/delete_client
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "client_id": 2572
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "client_id": 2572
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "delete_client",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 15. User - delete_device



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/delete_device
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 153
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 153
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "delete_device",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 16. User - get_client_permissions



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/get_client_permissions
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "get_client_permissions",
    "payload": {
        "customer_doors": [
            {
                "deice_name": "MettingRoom",
                "relay_id": 2984,
                "role_name": "Shut1a"
            },
            {
                "deice_name": "MettingRoom",
                "relay_id": 2988,
                "role_name": "Bar1"
            },
            {
                "deice_name": "MettingRoom",
                "relay_id": 2989,
                "role_name": "Bar3"
            },
            {
                "deice_name": "MettingRoom",
                "relay_id": 2990,
                "role_name": "Bar4"
            },
            {
                "deice_name": "MettingRoom",
                "relay_id": 2991,
                "role_name": "Bar2"
            },
            {
                "deice_name": "MettingRoom",
                "relay_id": 2985,
                "role_name": "Shut2"
            },
            {
                "deice_name": "MettingRoom",
                "relay_id": 2986,
                "role_name": "Shut3"
            },
            {
                "deice_name": "MettingRoom",
                "relay_id": 2987,
                "role_name": "Shut4"
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



### 17. User - get_device_relays



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://api.garajapp.com.tr:4433/web-api/get_user_clients
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| device_id | 146 |  |



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "ok",
    "payload": [
        {
            "id": 2988,
            "name": "Bar1",
            "number": 7,
            "status": "ACTIVE",
            "timer": 1,
            "type": "BARRIER"
        },
        {
            "id": 2991,
            "name": "Bar2",
            "number": 10,
            "status": "ACTIVE",
            "timer": 1,
            "type": "BARRIER"
        },
        {
            "id": 2989,
            "name": "Bar3",
            "number": 8,
            "status": "PASSIVE",
            "timer": 1,
            "type": "BARRIER"
        },
        {
            "id": 2990,
            "name": "Bar4",
            "number": 9,
            "status": "ACTIVE",
            "timer": 5,
            "type": "BARRIER"
        },
        {
            "id": 2984,
            "name": "Shut1",
            "number": 1,
            "status": "ACTIVE",
            "timer": 0,
            "type": "SHUTTER"
        },
        {
            "id": 2985,
            "name": "Shut2",
            "number": 2,
            "status": "ACTIVE",
            "timer": 0,
            "type": "SHUTTER"
        },
        {
            "id": 2986,
            "name": "Shut3",
            "number": 3,
            "status": "ACTIVE",
            "timer": 0,
            "type": "SHUTTER"
        },
        {
            "id": 2987,
            "name": "Shut4",
            "number": 6,
            "status": "ACTIVE",
            "timer": 0,
            "type": "SHUTTER"
        }
    ]
}
```


***Status Code:*** 200

<br>



### 18. User - get_user_clients



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://api.garajapp.com.tr:4433/web-api/get_user_clients
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Falsy answer


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg1MiwibGFuZyI6InRyIiwiaWF0IjoxNjEyOTU2MTkyLCJleHAiOjE2MTMzODgxOTJ9.uy1oI7nCJB-A1-CpIWo-Pe5z6pEIvHeWrnQ0omB-41Uz |  |



##### I. Example Response: Falsy answer
```js
{
    "auth": 0,
    "code": 1,
    "meta": "Failed to authentificate ! "
}
```


***Status Code:*** 401

<br>



##### II. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



##### II. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "dashboard_data",
    "payload": {
        "user_clients": [
            {
                "id": 2566,
                "fname": "beta",
                "lname": "beta",
                "rank_user_id": 1852,
                "status": "ACTIVE",
                "token": "t9wq3flUOGCSAqakP(Qe^uEtu1Wu70Pw",
                "username": "beta",
                "user_rank": "CLIENT",
                "email": "beta@xenonsmart.com",
                "log_status": null,
                "phone": "+905334461491",
                "project_name": null,
                "sms_code": "12345",
                "sms_time": null,
                "user_size": null
            },
            {
                "id": 2565,
                "fname": "nsm",
                "lname": "baci",
                "rank_user_id": 1852,
                "status": "ACTIVE",
                "token": "pv!9BiqGn86flFQF%k1LwIn)Az3^ugqG",
                "username": "nsm",
                "user_rank": "CLIENT",
                "email": "nassim@xenonsmart.com",
                "log_status": null,
                "phone": "+905458736753",
                "project_name": null,
                "sms_code": "52074",
                "sms_time": null,
                "user_size": null
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



### 19. User - get_user_clients_logs



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/get_user_clients_logs
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| _limit | %2010 |  |
| _start | 0 |  |
| _username |  |  |
| _datestart |  |  |
| _datefinish |  |  |



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| _limit | %2010 |  |
| _start | 0 |  |
| _username |  |  |
| _datestart |  |  |
| _datefinish |  |  |



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "get_user_clients_logs",
    "payload": {
        "logs": [
            {
                "user_id": 2565,
                "log_time": "10/02/2021 03:17:27 PM",
                "door_name": "Shut3",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 03:17:27 PM",
                "door_name": "Shut3",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 03:17:26 PM",
                "door_name": "Shut3",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 03:17:22 PM",
                "door_name": "Bar4",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 03:17:19 PM",
                "door_name": "Bar1",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 01:19:27 PM",
                "door_name": "Bar2",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 01:19:26 PM",
                "door_name": "Bar1",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 01:17:58 PM",
                "door_name": "Bar2",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 01:17:57 PM",
                "door_name": "Bar1",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:46:33 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            }
        ],
        "total": "168"
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Truthy reply (page 2)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| _limit | %2010 |  |
| _start | 10 |  |
| _username |  |  |
| _datestart |  |  |
| _datefinish |  |  |



##### II. Example Response: Truthy reply (page 2)
```js
{
    "auth": 1,
    "code": 200,
    "meta": "get_user_clients_logs",
    "payload": {
        "logs": [
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:34:24 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:31:14 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:31:08 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:30:58 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:30:47 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:30:22 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:27:55 AM",
                "door_name": "Bar4",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:26:47 AM",
                "door_name": "Bar4",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:26:36 AM",
                "door_name": "Bar4",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:24:46 AM",
                "door_name": "Bar4",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            }
        ],
        "total": "168"
    }
}
```


***Status Code:*** 200

<br>



##### III. Example Request: Truthy reply (filters)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| _limit | %2010 |  |
| _start | 10 |  |
| _username | nsm |  |
| _datestart | 2021-02-01 |  |
| _datefinish | 2021-02-19 |  |



##### III. Example Response: Truthy reply (filters)
```js
{
    "auth": 1,
    "code": 200,
    "meta": "get_user_clients_logs",
    "payload": {
        "logs": [
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:34:24 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:31:14 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:31:08 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:30:58 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:30:47 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:30:22 AM",
                "door_name": "Shut1a",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:27:55 AM",
                "door_name": "Bar4",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:26:47 AM",
                "door_name": "Bar4",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:26:36 AM",
                "door_name": "Bar4",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            },
            {
                "user_id": 2565,
                "log_time": "10/02/2021 11:24:46 AM",
                "door_name": "Bar4",
                "firstname": "nsm",
                "lastname": "baci",
                "username": "nsm",
                "email": "nassim@xenonsmart.com"
            }
        ],
        "total": "168"
    }
}
```


***Status Code:*** 200

<br>



### 20. User - get_user_dashboard



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://api.garajapp.com.tr:4433/web-api/get_user_dashboard
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "dashboard_data",
    "payload": {
        "user_doors": [
            {
                "id": 2988,
                "name": "Bar1",
                "type": "BARRIER"
            },
            {
                "id": 2991,
                "name": "Bar2",
                "type": "BARRIER"
            },
            {
                "id": 2990,
                "name": "Bar4",
                "type": "BARRIER"
            },
            {
                "id": 2984,
                "name": "Shut1",
                "type": "SHUTTER"
            },
            {
                "id": 2985,
                "name": "Shut2",
                "type": "SHUTTER"
            },
            {
                "id": 2986,
                "name": "Shut3",
                "type": "SHUTTER"
            },
            {
                "id": 2987,
                "name": "Shut4",
                "type": "SHUTTER"
            }
        ],
        "user_clients": [
            {
                "id": 2565,
                "first_name": "nsm",
                "last_name": "baci",
                "status": "ACTIVE",
                "user_name": "nsm",
                "email": "nassim@xenonsmart.com",
                "log_status": null,
                "phone_number": "+905458736753",
                "project_name": null
            },
            {
                "id": 2566,
                "first_name": "beta",
                "last_name": "beta",
                "status": "ACTIVE",
                "user_name": "beta",
                "email": "beta@xenonsmart.com",
                "log_status": null,
                "phone_number": "+905334461491",
                "project_name": null
            }
        ]
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Falsy answer (Failed to authentificate)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg1MiwibGFuZyI6InRyIiwiaWF0IjoxNjEyOTU2MTkyLCJleHAiOjE2MTMzODgxOTJ9.uy1oI7nCJB-A1-CpIWo-Pe5z6pEIvHeWrnQ0omB-41Uz |  |



##### II. Example Response: Falsy answer (Failed to authentificate)
```js
{
    "auth": 0,
    "code": 1,
    "meta": "Failed to authentificate ! "
}
```


***Status Code:*** 401

<br>



### 21. User - get_user_devices



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://api.garajapp.com.tr:4433/web-api/get_user_clients
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "ok",
    "payload": [
        {
            "id": 146,
            "ip": "78.189.28.103:100",
            "dev_name": "MettingRoom"
        }
    ]
}
```


***Status Code:*** 200

<br>



### 22. User - get_user_info



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/get_user_info
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "i",
    "payload": [
        {
            "id": 1852,
            "first_name": "bvd",
            "last_name": "bvd",
            "rank_user_id": 1,
            "status": "ACTIVE",
            "user_name": "bvd",
            "user_rank": "USER",
            "e_mail": "aaa@aaa.aaa",
            "log_status": "ACTIVE",
            "phone_number": "5458736753",
            "lat": "45.32",
            "long": "66.21",
            "user_size": 0
        }
    ]
}
```


***Status Code:*** 200

<br>



### 23. User - login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/login
```



***Body:***

```js        
{
    "username": "bvd",
    "password": "321321",
    "lang": "tr"
}
```



***More example Requests/Responses:***


##### I. Example Request: Falsy answer (user not active)



***Body:***

```js        
{
    "username": "bvd",
    "password": "admin",
    "lang": "tr"
}
```



##### I. Example Response: Falsy answer (user not active)
```js
{
    "auth": 0,
    "code": 0,
    "meta": "user not found",
    "token": null
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Falsy answer (user not found)



***Body:***

```js        
{
    "username": "zxczxc",
    "password": "admin",
    "lang": "tr"
}
```



##### II. Example Response: Falsy answer (user not found)
```js
{
    "auth": 0,
    "code": 0,
    "meta": "user not found",
    "token": null
}
```


***Status Code:*** 200

<br>



##### III. Example Request: Falsy answer (wrong password)



***Body:***

```js        
{
    "username": "bvd",
    "password": "admisssn",
    "lang": "tr"
}
```



##### III. Example Response: Falsy answer (wrong password)
```js
{
    "auth": 0,
    "code": 1,
    "meta": "wrong password",
    "token": null
}
```


***Status Code:*** 200

<br>



##### IV. Example Request: Truthy reply



***Body:***

```js        
{
    "username": "bvd",
    "password": "admin",
    "lang": "tr"
}
```



##### IV. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg1MiwibGFuZyI6InRyIiwiaWF0IjoxNjEyOTU1ODQwLCJleHAiOjE2MTMzODc4NDB9.PyyqDAzGPctXz97a_DI7lZtYbvvu4KsQ6T_DMoo9Q1k"
}
```


***Status Code:*** 200

<br>



### 24. User - reset_client_password



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_client
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "fname": "delta",
    "lname": "green",
    "email": "delta@delta.com",
    "phone": "+901234567898",
    "status": true,
    "username": "delta",
    "id": "2571"
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 2571
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "reset_client_password",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 25. User - set_client_permissions



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/set_client_permissions
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        

    {
    "client_id": 2565,
    "permissions": [
        {
            "deice_name": "MettingRoom",
            "relay_id": 2984,
            "role_name": "Shut1a",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2988,
            "role_name": "Bar1",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2989,
            "role_name": "Bar3",
            "days": "1111011",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": false,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2990,
            "role_name": "Bar4",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2991,
            "role_name": "Bar2",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2985,
            "role_name": "Shut2",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2986,
            "role_name": "Shut3",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2987,
            "role_name": "Shut4",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        }
    ]
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        

    {
    "client_id": 2565,
    "permissions": [
        {
            "deice_name": "MettingRoom",
            "relay_id": 2984,
            "role_name": "Shut1a",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2988,
            "role_name": "Bar1",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2989,
            "role_name": "Bar3",
            "days": "1111011",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": false,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2990,
            "role_name": "Bar4",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2991,
            "role_name": "Bar2",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2985,
            "role_name": "Shut2",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2986,
            "role_name": "Shut3",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        },
        {
            "deice_name": "MettingRoom",
            "relay_id": 2987,
            "role_name": "Shut4",
            "days": "1111111",
            "start_time": "00:00",
            "finish_time": "00:00",
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true,
            "Su": true
        }
    ]
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "set_client_permissions",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 26. User - update_client



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_client
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "fname": "delta",
    "lname": "green",
    "email": "delta@delta.com",
    "phone": "+901234567898",
    "status": true,
    "username": "delta",
    "id": "2571"
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "fname": "delta",
    "lname": "green",
    "email": "delta@delta.com",
    "phone": "+901234567898",
    "status": true,
    "username": "delta",
    "id": "2571"
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "update_client",
    "payload": true
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Falsy answer (email_already_registred)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "fname": "delta",
    "lname": "green",
    "email": "aaa@aaa.aaa",
    "phone": "+901234567898",
    "status": true,
    "username": "delta",
    "id": "2571"
}
```



##### II. Example Response: Falsy answer (email_already_registred)
```js
{
    "auth": 1,
    "code": 2,
    "meta": "email_already_registred",
    "payload": false
}
```


***Status Code:*** 200

<br>



##### III. Example Request: Falsy answer (phone_already_registred)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "fname": "delta",
    "lname": "green",
    "email": "delta@delta.com",
    "phone": "+90123456789",
    "status": true,
    "username": "delta",
    "id": "2571"
}
```



##### III. Example Response: Falsy answer (phone_already_registred)
```js
{
    "auth": 1,
    "code": 3,
    "meta": "phone_already_registred",
    "payload": false
}
```


***Status Code:*** 200

<br>



##### IV. Example Request: Falsy answer (username_already_registred)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "fname": "delta",
    "lname": "green",
    "email": "delta@delta.com",
    "phone": "+901234567898",
    "status": true,
    "username": "delta",
    "id": "2571000"
}
```



##### IV. Example Response: Falsy answer (username_already_registred)
```js
{
    "auth": 1,
    "code": 1,
    "meta": "username_already_registred",
    "payload": false
}
```


***Status Code:*** 200

<br>



### 27. User - update_client_status



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_client_status
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 2566,
    "status": false
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 2566,
    "status": false
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "update_user_status",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 28. User - update_device



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_device
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 1445454,
    "ip": "78.189.28.105:100",
    "dev_name": "MettingRoom"
}
```



***More example Requests/Responses:***


##### I. Example Request: Falsy reply (not_connected)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 146,
    "ip": "78.189.28.105:100",
    "dev_name": "MettingRoom"
}
```



##### I. Example Response: Falsy reply (not_connected)
```js
{
    "auth": 1,
    "code": 4081,
    "meta": "not_connected",
    "payload": false
}
```


***Status Code:*** 408

<br>



##### II. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 146,
    "ip": "78.189.28.103:100",
    "dev_name": "MettingRoom"
}
```



##### II. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "ok",
    "payload": {
        "device_data": {
            "id": 146,
            "ip": "78.189.28.103:100",
            "dev_name": "MettingRoom"
        }
    }
}
```


***Status Code:*** 200

<br>



### 29. User - update_geolocation



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_client
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "fname": "delta",
    "lname": "green",
    "email": "delta@delta.com",
    "phone": "+901234567898",
    "status": true,
    "username": "delta",
    "id": "2571"
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "latitude": "45.32",
    "longitude": "66.21"
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "update_geolocation",
    "payload": null
}
```


***Status Code:*** 200

<br>



### 30. User - update_relay



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_relay
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 2988,
    "name": "Bar1",
    "number": 7,
    "status": true,
    "timer": 1,
    "type": "BARRIER"
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 2988,
    "name": "Bar1a",
    "number": 7,
    "status": true,
    "timer": 1,
    "type": "BARRIER"
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "update_relay",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 31. User - update_relay_status



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_relay_status
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 2990,
    "name": "Bar4",
    "number": 9,
    "status": false,
    "timer": 5,
    "type": "BARRIER"
}
```



***More example Requests/Responses:***


##### I. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "id": 2990,
    "name": "Bar4",
    "number": 9,
    "status": false,
    "timer": 5,
    "type": "BARRIER"
}
```



##### I. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "update_relay",
    "payload": true
}
```


***Status Code:*** 200

<br>



### 32. User - update_user_password



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://api.garajapp.com.tr:4433/web-api/update_user_password
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "new_password": "321321",
    "old_password": "666666"
}
```



***More example Requests/Responses:***


##### I. Example Request: Falsy answer (wrong old password)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "new_password": "123456789",
    "old_password": "6666668"
}
```



##### I. Example Response: Falsy answer (wrong old password)
```js
{
    "auth": 1,
    "code": 4062,
    "meta": "wrong_password",
    "payload": false
}
```


***Status Code:*** 406

<br>



##### II. Example Request: Truthy reply


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "new_password": "666666",
    "old_password": "321321"
}
```



##### II. Example Response: Truthy reply
```js
{
    "auth": 1,
    "code": 200,
    "meta": "update_user_password_ok",
    "payload": true
}
```


***Status Code:*** 200

<br>



##### III. Example Request: Falsy answer (error new password )


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-access-token | {{TOKEN}} |  |



***Body:***

```js        
{
    "new_password": "123",
    "old_password": "666666"
}
```



##### III. Example Response: Falsy answer (error new password )
```js
{
    "auth": 1,
    "code": 422,
    "meta": {
        "errors": [
            {
                "value": "123",
                "msg": "1",
                "param": "new_password",
                "location": "body"
            }
        ]
    },
    "token": null
}
```


***Status Code:*** 422

<br>



***Available Variables:***

| Key | Value | Type |
| --- | ------|-------------|
| grj_api | https://api.garajapp.com.tr:4433 |  |



---
[Back to top](#garajapp)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-02-11 17:48:47 by [docgen](https://github.com/thedevsaddam/docgen)
