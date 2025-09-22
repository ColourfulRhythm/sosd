# AD PROMOTER API DOCUMENTATIONS OVERVIEW

Ad promoter is a web based ad promoter where users can place their ads and promoters can promote these ads on various platforms

-   live link : [https://ad-promoter.com](https//ad-promoter.com)

## TABLE OF CONTENT: Quick reference

-   [AD PROMOTER API DOCUMENTATIONS OVERVIEW](#ad-promoter-api-documentations-overview)
    -   [TABLE OF CONTENT: Quick reference](#table-of-content-quick-reference)
    -   [Get Started](#get-started)
    -   [Authorization](#authorization)
    -   [Send Otp Signup](#send-otp-signup)
        -   [How To Use](#how-to-use)
        -   [Features](#features)
        -   [Responses](#responses)
            -   [onSuccess](#onsuccess)
            -   [onError](#onerror)
    -   [Sign Up](#sign-up)
        -   [How To Use](#how-to-use-1)
        -   [Features](#features-1)
        -   [Responses](#responses-1)
            -   [onSuccess](#onsuccess-1)
            -   [onError](#onerror-1)
    -   [Google + Facebook OAUTH](#google--facebook-oauth2-integrations)
        -   [How To Use](#how-to-use-2)
        -   [Features](#features-2)
        -   [Responses](#responses-2)
            -   [onSuccess](#onsuccess-2)
            -   [onError](#onerror-2)
    -   [Verify Phone Number](#verify-phone-number)
        -   [How To Use](#how-to-use-3)
        -   [Features](#features-3)
        -   [Responses](#responses-3)
            -   [onSuccess](#onsuccess-3)
            -   [onError](#onerror-3)
    -   [Sign In](#sign-in)
        -   [How To Use](#how-to-use-4)
        -   [Features](#features-4)
        -   [Responses](#responses-4)
            -   [onSuccess](#onsuccess-4)
            -   [onError](#onerror-4)
    -   [Forgot Password](#forgot-password)
        -   [How To Use](#how-to-use-5)
        -   [Features](#features-5)
        -   [Responses](#responses-5)
            -   [onSuccess](#onsuccess-5)
            -   [onError](#onerror-5)
    -   [Verify OTP Password](#verify-otp-password)
        -   [How To Use](#how-to-use-6)
        -   [Features](#features-6)
        -   [Responses](#responses-6)
            -   [onSuccess](#onsuccess-6)
            -   [onError](#onerror-6)
    -   [Change Password](#change-password)
        -   [How To Use](#how-to-use-7)
        -   [Features](#features-7)
        -   [Responses](#responses-7)
            -   [onSuccess](#onsuccess-7)
            -   [onError](#onerror-7)
    -   [Fetch Current User](#fetch-current-user)
        -   [How To Use](#how-to-use-8)
        -   [Features](#features-8)
        -   [Responses](#responses-8)
            -   [onSuccess](#onsuccess-8)
            -   [onError](#onerror-8)
    -   [Create An Advert](#create-an-advert))
        -   [How To Use](#how-to-use-9)
        -   [Features](#features-9)
        -   [Responses](#responses-9)
            -   [onSuccess](#onsuccess-9)
            -   [onError](#onerror-9)
    -   [Verify An Advert Payment](#verify-payment-on-an-advert))
        -   [How To Use](#how-to-use-10)
        -   [Features](#features-10)
        -   [Responses](#responses-10)
            -   [onSuccess](#onsuccess-10)
            -   [onError](#onerror-10)
    -   [Create Wallet](#create-wallet)
        -   [How To Use](#how-to-use-11)
        -   [Features](#features-11)
        -   [Responses](#responses-11)
            -   [onSuccess](#onsuccess-11)
            -   [onError](#onerror-11)
    -   [Create Recipient](#create-recipient)
        -   [How To Use](#how-to-use-12)
        -   [Features](#features-12)
        -   [Responses](#responses-12)
            -   [onSuccess](#onsuccess-12)
            -   [onError](#onerror-12)
    -   [Retrieve Wallet](#retrieve-wallet)
        -   [How To Use](#how-to-use-13)
        -   [Features](#features-13)
        -   [Responses](#responses-13)
            -   [onSuccess](#onsuccess-13)
            -   [onError](#onerror-13)
    -   [Retrieve Recipient Details](#retrieve-recipient-details)
        -   [How To Use](#how-to-use-14)
        -   [Features](#features-14)
        -   [Responses](#responses-14)
            -   [onSuccess](#onsuccess-14)
            -   [onError](#onerror-14)
    -   [Promote Direct or Detail Adverts](#promote-direct-link-or-detail-advert)
        -   [How To Use](#how-to-use-15)
        -   [Features](#features-15)
        -   [Responses](#responses-15)
            -   [onSuccess](#onsuccess-15)
            -   [onError](#onerror-15)
    -   [Promote Visual Adverts](#promote-visual-advert)
        -   [How To Use](#how-to-use-16)
        -   [Features](#features-16)
        -   [Responses](#responses-16)
            -   [onSuccess](#onsuccess-16)
            -   [onError](#onerror-16)
    -   [Get All Promotions](#promote-visual-advert)
        -   [How To Use](#how-to-use-17)
        -   [Features](#features-17)
        -   [Responses](#responses-17)
            -   [onSuccess](#onsuccess-17)
            -   [onError](#onerror-17)
    -   [Upload Images](#upload-images)
        -   [How To Use](#how-to-use-18)
        -   [Features](#features-18)
        -   [Responses](#responses-18)
            -   [onSuccess](#onsuccess-18)
            -   [onError](#onerror-18)

## Get Started

Our API is organized around using HTTP verbs and REST. This API accepts and returns JSON formatted payload

## Authorization

User must be authenticated to use the API

| HEADERS       |                  |
| ------------- | ---------------- |
| Authorization | "Bearer {token}" |

## Send Otp Signup

When this endpoint is used, it sends the OTP to the users phone number for verification.

### How To Use

This is a POST endpoint meaning you'll make a request 'POST' with the required data to create a user

Input the endpoint in yur preferred client for the request, when successful, [onSuccess](#onsuccess) response is displayed, when an error occurs [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL            | METHOD | URL PARAMS | DATA PARAMS |
| -------------- | ------ | ---------- | ----------- |
| /auth/send-otp | POST   | false      | false       |

-   PARAMS [URL OR DATA] if true

| NAME        | DATA TYPE | REQUIRED |
| ----------- | --------- | -------- |
| phoneNumber | string    | true     |

The OTP is sent in form of a voice call and is mentioned twice before the call goes off, if the call isn't picked, the verification API makes the call two more times before marking the verification as failed

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(201). etc

-   payload :
    -   result

```
{
  "success": true,
  "msg": "A verification OTP has been sent to your phone number",
  "data": {
      "reference_id": "0d8e60a5-82d4-4d30-a415-5d10e372797d",
      "destination": "+2347011249480"
  }
}

```

-   message : "OTP sent to user successfully"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request | forbidden (403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "message": "An account with this phoneNumber already exists",
}

```

```
  Error object

```

-   message : "User with this credentials exist previously"

## Sign up

When this endpoint is used, it creates a user and sends the OTP to the users phone number for verification.

### How To Use

This is a POST endpoint meaning you'll make a request 'POST' with the required data to create a user

Input the endpoint in yur preferred client for the request, when successful, [onSuccess](#onsuccess) response is displayed, when an error occurs [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL          | METHOD | URL PARAMS | DATA PARAMS |
| ------------ | ------ | ---------- | ----------- |
| /auth/signup | POST   | false      | false       |

-   PARAMS [URL OR DATA] if true

| NAME         | DATA TYPE    | REQUIRED |
| ------------ | ------------ | -------- |
| accountName  | string       | true     |
| reference_id | string       | true     |
| socialLink   | string       | true     |
| phoneNumber  | string       | true     |
| seeVisualAds | boolean      | false    |
| email        | string       | true     |
| password     | string       | true     |
| role         | enum(string) | true     |
| otp          | string       | true     |

For the role, only 2 options are allowed namely "promoter" for a user who comes to the platform with the sole purpose of promoting ads, "placer" users who come with the plan of promoting adverts, any other response will see to it that the user soesn't get created
The phone number field should tally with the phone number used to request the OTP

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(201). etc

-   payload :
    -   result

```
{
  "success": true,
  "msg": "phone number has been verified and user has been created"
}

```

-   message : "User created successfully"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request | forbidden (403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "invalid otp/reference_id"
}

```

-   message : "User with this phoneNumber or email already exists, invalid otp"

## Google + Facebook OAUTH2 Integrations

When this endpoint is used, it redirects the user to the google || facebook oauth screens then redirect users when the account has been created

### How To Use

This is a GET endpoint and it simple means that your browser e.g chrome, edge, etc can make request (i.e write/send the endpoint in their browser engine) and see the response

Input/insert the endpoint complete url in the browser and hit enter, when successful, [onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL            | METHOD | URL PARAMS | DATA PARAMS |
| -------------- | ------ | ---------- | ----------- |
| /auth/google   | GET    | false      | False       |
| /auth/facebook | GET    | false      | False       |

-   complete url format : <https://www.ad-promoter.com/api/v1/auth/google>
-   complete url format : <https://www.ad-promoter.com/api/v1/auth/facebook>

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(201). etc

-   payload :
    -   result

```
{
    success: true,
    token: eyncdcsmmckmf9953.mncjciowljjdccmnkew.nceowkney
}
```

-   message : "Create User Successfully"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "invalid otp/reference_id"
}
```

```
  Error object

```

-   message : "Failed to create User"

## Sign In

<!-- descriptions -->

When this endpoint is used, its check if a user already exist, if yes, it checks if the user is already verified

### How To Use

This is a POST endpoint, this can be tested from the client side in a form or using Postman.

Input the endpoint complete url into postman or form with all necessary parameter , when successful, [onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL          | METHOD | URL PARAMS | DATA PARAMS |
| ------------ | ------ | ---------- | ----------- |
| /auth/signin | POST   | false      | true        |

-   PARAMS [URL OR DATA] if true

| NAME        | DATA TYPE | REQUIRED |
| ----------- | --------- | -------- |
| phoneNumber | string    | true     |
| password    | string    | true     |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2FjZDU0NjBjNDJkNzVjYTU4NTFlN2UiLCJwaG9uZU51bWJlciI6IjA3MDExMjQ5NDgwIiwiaWF0IjoxNjcyMjcxNjczfQ.veT4ra0b3_Y2q-j2n_CKHPb6C1B75w2uPGzrk87x8eU"
}
```

-   message : "User Logged in successfully"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "message": "error_msg",
}
```

```
Error object
```

-   message_1 : "Credentials Incorrect"
-   message_2: "Please verify any of your credentials before continuing"
-   message_3: "User not found"

## Forgot Password

<!-- descriptions -->

When this endpoint is used, it sends an OTP to the user for verification of the phone number

### How To Use

This is a POST endpoint, this can be tested from the client side in a form or using Postman.

Input the endpoint complete url into postman or form with all necessary parameter , when successful, [onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL                         | METHOD | URL PARAMS | DATA PARAMS |
| --------------------------- | ------ | ---------- | ----------- |
| /auth/forgot-password-phone | POST   | false      | true        |

-   PARAMS [URL OR DATA] if true

| NAME        | DATA TYPE | REQUIRED |
| ----------- | --------- | -------- |
| phoneNumber | string    | true     |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
    status: "an OTP has been sent to your sms/sms",
    success: true,
    data: {
        destination: "07011249480",
        "reference_id": "0d8e60a5-82d4-4d30-a415-5d10e372797d",
    },
    msg: 'An OTP has been sent to your phone number for verification of password change',
}
```

-   message : "Verification OTP sent successfully"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
Error object

```

-   message_1 : "There's no user with this phone number"

## Verify OTP Password

This endpoint is used to verify the OTP sent to the user

### How To Use

This is a POST Method

When successful, [onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL                        | METHOD | URL PARAMS | DATA PARAMS |
| -------------------------- | ------ | ---------- | ----------- |
| /auth/verify-otp-passworrd | GET    | false      | true        |

-   PARAMS [URL OR DATA] if true

| NAME         | DATA TYPE | REQUIRED |
| ------------ | --------- | -------- |
| phoneNumber  | string    | true     |
| reference_id | string    | true     |
| otp          | string    | true     |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
    "success": true,
    "msg": "phone number verified successfully"
}
```

-   message : "Phone number verified successfully"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "invalid otp/reference_id"
}

```

-   message_1 : "you're not allowed to change your password from this route"

## Change Password

This endpoint is used to change the user's pasword

### How To Use

This is a POST Method

When successful, [onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL                    | METHOD | URL PARAMS | DATA PARAMS |
| ---------------------- | ------ | ---------- | ----------- |
| /auth/change-passworrd | GET    | false      | true        |

-   PARAMS [URL OR DATA] if true

| NAME        | DATA TYPE | REQUIRED |
| ----------- | --------- | -------- |
| phoneNumber | string    | true     |
| password    | string    | true     |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
    "success": true,
    "msg": "password changed  successfully"
}
```

-   message : "password changed successfully"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "invalid otp/reference_id"
}

```

```
Error object
```

-   message_1 : "invalid otp/reference id"

## Fetch Current User

When this endpoint is used, it allows a user to fetch the data of the current client

### How To Use

This is a GET Method

When successful, [onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL   | METHOD | URL PARAMS | DATA PARAMS |
| ----- | ------ | ---------- | ----------- |
| /user | GET    | false      | false       |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  success:true,
  data: {
    "_id": "639bc384ab824360ae88d01e",
    "userID": "1e77305c-3790-4a87-90a9-b62b991fb1e3",
    "socialLink": "string",
    "emailVerified": false,
    "accountName": "string",
    "phoneNumber": "lollipop",
    "email": "dannyxyz@email.com",
    "seeVisualAd": true,
    "role": "creator",
    "password": "$2b$10$Ez7y3SHm9qPgcJ7vCzkG8.ostGzPrJq8tn8vWn4hYKHkjf/626",
    "ads": [],
    "__v": 0
  }
}
```

-   message : "Fetched current user successfully"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "error message"
}

```

-   message_1 : "User not found"

## Change Password

When this endpoint is used, it allows a user to change the password of the account logged in

### How To Use

This is a POST Method

When successful, [onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL                   | METHOD | URL PARAMS | DATA PARAMS |
| --------------------- | ------ | ---------- | ----------- |
| /user/change-password | GET    | false      | false       |

-   PARAMS [URL OR DATA] if true

| NAME             | DATA TYPE | REQUIRED |
| ---------------- | --------- | -------- |
| previousPassword | string    | true     |
| newPassword      | string    | true     |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
    success: true,
    msg: "your password has been successfully changed"
}
```

-   message : "Password successfully changed

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
    success: false,
    msg: "previous password doesn't match what we have in the database"
}
```

## Create An Advert

<!-- descriptions -->

When this endpoint is used, it creates an advert using the data provided

### How To Use

This is a POST endpoint.

This can be tested from the client side by calling the api or using Postman.

[onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL         | METHOD | URL PARAMS | DATA PARAMS |
| ----------- | ------ | ---------- | ----------- |
| /ads/create | POST   | false      | true        |

-   PARAMS [URL OR DATA] if true

| NAME        | DATA TYPE     | REQUIRED |
| ----------- | ------------- | -------- |
| productName | string        | true     |
| description | string        | true     |
| tags        | Array<string> | true     |
| isNfsw      | boolean       | true     |
| type        | Enum<string>  | true     |
| images      | Array<string> | false    |
| budget      | number        | true     |

The type field can only be one of "visual", "detail", "direct-link"

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  "success": false,
  "data": {
    newAd: {
      "tags": [
        "health care",
        "beauty"
      ],
      "type": "visual",
      "rate": 5000,
      "paymentRef": "8d2cs24ow3",
      "images": [
        "https://adpromoter.s3.amazonaws.com/3cd99009-639a-4ac7-9831-a930e2759154-p-1015544_1280.png"
      ],
      "videos": [],
      "promotedLink": "https://bodylink.com/body",
      "approvalStatus": false,
      "promotions": [],
      "approvedVisualAd": 0,
      "views": 0,
      "budget": 20000,
      "target": 4,
      "completed": false,
      "creator": "63acd5460c42d75ca5851e7e",
      "_id": "63acd8159f1f807433ddd47b"
    },
    "paymentDetails": {
      "url": "https://checkout.paystack.com/p875glafidphpgr",
      "reference": "8d2cs24ow3"
    }
  }
  "msg": "advertisment created successfully"
}
```

User should be redirected on the frontend to the url link under the payment detail to complete the payment of the advert

-   message : "Created an Ad"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "error message"
}

```

-   message_1 : "Failed to create Ad"

## Verify Payment On An Advert

<!-- descriptions -->

When this endpoint is used, it verifies if the payment on an advert has been verified

### How To Use

This is a POST endpoint.

This can be tested from the client side by calling the api or using Postman.

[onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL                 | METHOD | URL PARAMS | DATA PARAMS |
| ------------------- | ------ | ---------- | ----------- |
| /ads/verify-payment | POST   | false      | true        |

-   PARAMS [URL OR DATA] if true

| NAME  | DATA TYPE | REQUIRED |
| ----- | --------- | -------- |
| ad_id | string    | true     |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  "msg": "Advert has been successfully approved",
  "success": true,
  "gateway_res": "Successful"
}
```

-   message : "Verified an Ad Payment"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "Payment Could not be verified now, try again later",
}
```

-   message_1 : "Failed to verify ad, payment unsuccessful"

## Create Wallet

Create wallets

### How To Use

This is a POST endpoint.

This can be tested from the client side by calling the api or using Postman.

[onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL            | METHOD | URL PARAMS | DATA PARAMS |
| -------------- | ------ | ---------- | ----------- |
| /wallet/create | POST   | None       | None        |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  "_id": "63a8a3e207a04ff890d97c93",
  "walletBalance": 0,
  "walletId": "e4cdea46-f58d-46b2-93c5-1e579cb2eb36",
  "walletOwner": "63a8a19b9c19a7ae2f5efb19",
  "__v": 0
}
```

-   message : "Wallet Created"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "error message"
}

```

## Create Recipient

Create recipient that would be used to process outbound payments to the promoter

### How To Use

This is a POST endpoint.

This can be tested from the client side by calling the api or using Postman.

[onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL                      | METHOD | URL PARAMS | DATA PARAMS |
| ------------------------ | ------ | ---------- | ----------- |
| /wallet/create-recipient | POST   | None       | true        |

-   PARAMS [URL OR DATA] if true

| NAME           | DATA TYPE | REQUIRED |
| -------------- | --------- | -------- |
| type           | string    | true     |
| name           | string    | true     |
| account_number | string    | true     |
| bank_code      | string    | true     |

type should have a value of "nuban", name is the account name of beneficiary, account number is the account number of the beneficiary, bank_code is the bank code of the bank to be used

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  "success": true,
  "msg": "recipient created successfully",
  "recipient_code": "RCP_70iewuvk7jr12mq"
}
```

-   message : "Recipient Created"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "error message"
}

```

## Retrieve Wallet

When this endpoint is used, it gets the wallet of the logged in user

### How To Used

This is a GET endpoint.

This can be tested from the client side or browser

[onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL              | METHOD | URL PARAMS | DATA PARAMS |
| ---------------- | ------ | ---------- | ----------- |
| /wallet/retrieve | GET    | true       | false       |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  success: true,
  data:{
    "_id": "63a8a3e207a04ff890d97c93",
    "walletBalance": 175,
    "walletId": "e4cdea46-f58d-46b2-93c5-1e579cb2eb36",
    "walletOwner": "63a8a19b9c19a7ae2f5efb19",
    "__v": 0
  }
}
```

-   message : "Wallet has successfully been retrieved"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
<Error object>

```

## Retrieve Recipient Details

When this endpoint is used, it fetches the details of the recipients of the current logged in user

### How To Used

This is a GET endpoint.

This can be tested from the client side or browser

[onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL                     | METHOD | URL PARAMS | DATA PARAMS |
| ----------------------- | ------ | ---------- | ----------- |
| /wallet/fetch-recipient | GET    | false      | false       |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  success: true,
  data: [
  {
    "integration": 839311,
    "domain": "test",
    "type": "nuban",
    "currency": "NGN",
    "name": "Adewambe Daniel",
    "details": {
      "account_number": "2119608018",
      "account_name": "ADEWAMBE DANIEL ADEKOLA",
      "bank_code": "033",
      "bank_name": "United Bank For Africa"
    },
    "description": null,
    "metadata": null,
    "recipient_code": "RCP_zdutsu2l3mxhmvv",
    "active": true,
    "recipient_account": "2119608018",
    "institution_code": "033",
    "email": null,
    "id": 45096906,
    "isDeleted": false,
    "createdAt": "2022-12-25T23:32:14.000Z",
    "updatedAt": "2022-12-25T23:32:14.000Z"
  },
  {
    "integration": 839311,
    "domain": "test",
    "type": "nuban",
    "currency": "NGN",
    "name": "Adewambe Daniel",
    "details": {
      "account_number": "0564915964",
      "account_name": "ADEWAMBE DANIEL ADEKOLA",
      "bank_code": "058",
      "bank_name": "Guaranty Trust Bank"
    },
    "description": null,
    "metadata": null,
    "recipient_code": "RCP_70iewuvk7jr12mq",
    "active": true,
    "recipient_account": "0564915964",
    "institution_code": "058",
    "email": null,
    "id": 45286303,
    "isDeleted": false,
    "createdAt": "2022-12-28T23:12:04.000Z",
    "updatedAt": "2022-12-28T23:12:04.000Z"
    }
  ]
}
```

-   message : "Recipients successfully retrieved"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "error message"
}

```

## Promote Direct-Link or Detail Advert

When this endpoint is used, it sends a request to promote a particular ad and returns the ref id of the promoter, this route can only be used to promote direct-link and detail ads

### How To Used

This is a GET endpoint.

This can be tested from the client side or browser

[onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL        | METHOD | URL PARAMS | DATA PARAMS |
| ---------- | ------ | ---------- | ----------- |
| /promotion | GET    | true       | false       |

-   URL PARAMS if required

| NAME | DATA TYPE | REQUIRED |
| ---- | --------- | -------- |
| adID | string    | true     |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  "success": true,
  "code": "DiXTwjTuJ"
}
```

-   message : "Advert has been successfully promoted"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "error message"
}

```

## Promote Visual Advert

When this endpoint is used, it sends a request to promote a particular ad and returns the ref id of the promoter, this route can only be used to promote visual ads

### How To Used

This is a POST endpoint.

This can be tested from the client side or browser

[onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL               | METHOD | URL PARAMS | DATA PARAMS |
| ----------------- | ------ | ---------- | ----------- |
| /promotion/visual | POST   | false      | true        |

-   DATA PARAMS if required

| NAME | DATA TYPE | REQUIRED |
| ---- | --------- | -------- |
| adID | string    | true     |
| link | string    | true     |

adID is the id of the visual ad about to be promoted
The link is the link to the video/social post where the ad is being promoted

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  "success": true,
  "code": "DiXTwjTuJ"
}
```

-   message : "Advert has been successfully promoted, awaiting Approval"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "error message"
}

```

## Get All Promotions

When this endpoint is used, it sends a response containing all the promotions

### How To Used

This is a GET endpoint.

This can be tested from the client side or browser

[onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL        | METHOD | URL PARAMS | DATA PARAMS |
| ---------- | ------ | ---------- | ----------- |
| /promotion | GET    | true       | false       |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{

  success: true,
  data: [
    {
      "_id": "63a9a25752dc2d8dc5faacb1",
      "ad": "63a8de663f63cbc707b7c956",
      "promoter": "63a8a19b9c19a7ae2f5efb19",
      "clicks": 7,
      "conversions": 0,
      "amountEarned": 175,
      "approvedForPayment": true,
      "adType": "direct-link",
      "dateInitiated": "2022-12-26T13:23:22.807Z",
      "uniqueCode": "ib-1C3jey",
      "__v": 0
    },
    {
      "_id": "63acea8d3d6e0d39623fb36f",
      "ad": "63ace9f73d6e0d39623fb365",
      "promoter": "63a8a19b9c19a7ae2f5efb19",
      "clicks": 0,
      "conversions": 0,
      "amountEarned": 0,
      "approvedForPayment": true,
      "adType": "direct-link",
      "dateInitiated": "2022-12-29T00:50:06.660Z",
      "uniqueCode": "DiXTwjTuJ",
      "__v": 0
    },
    {
      "_id": "63acebbf3d6e0d39623fb377",
      "ad": "63acd8159f1f807433ddd47b",
      "promoter": "63a8a19b9c19a7ae2f5efb19",
      "clicks": 0,
      "conversions": 0,
      "amountEarned": 0,
      "approvedForPayment": false,
      "adType": "visual",
      "dateInitiated": "2022-12-29T00:50:06.660Z",
      "link": "https://instagram.com/babyOtunba",
      "uniqueCode": "DiXTwjTuJ",
      "__v": 0
    }
  ]
}
```

-   message : "Advert has been successfully promoted"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "error message"
}

```

## Upload Images

When this endpoint is used, it uploads an image buffer and returns the link to that image along with other details
This endpoint can be used for other files bar images but we're using it solely for images currently

### How To Used

This is a POST endpoint.

This can be tested from POSTMAN or Swagger Docs

[onSuccess](#onsuccess) response is display as JSON formatted in the browser. when an error occur [onError](#onerror) is thrown.

### Features

This involves the baseUrl, body request type, all required and non required parameters, methods and url for this endpoint.

-   BaseURL : <https://www.ad-promoter.com/api/v1>
-   Request Body Schema : application/json
-   General endpoint

| URL               | METHOD | URL PARAMS | DATA PARAMS |
| ----------------- | ------ | ---------- | ----------- |
| /fileUpload/image | GET    | false      | true        |

-   DATA PARAMS if required

| NAME | DATA TYPE       | REQUIRED |
| ---- | --------------- | -------- |
| file | string($binary) | true     |

### Responses

This is the end result send back to the client on successful execution or when an error occur. Below are the response on this two scenarios

#### onSuccess

This return a json formatted response payload to the client browser display in addition to the code.

-   code :

    -   2xx -> This success ranges originate from the server, usually from a successful request(200). etc

-   payload :
    -   result

```
{
  success: true,
  data: {
    "fileName": "de9834d2-8b24-491f-ba31-d5862db2df42-a2a94035-8326-4cd6-aaca-1c06578a04ec-callus.png",
    "fileUrl": "https://adpromoter.s3.amazonaws.com/4e4a8b9b-764a-4846-89b7-a97c6ad3ce4d-de9834d2-8b24-491f-ba31-d5862db2df42-a2a94035-8326-4cd6-aaca-1c06578a04ec-callus.png",
    "key": "4e4a8b9b-764a-4846-89b7-a97c6ad3ce4d-de9834d2-8b24-491f-ba31-d5862db2df42-a2a94035-8326-4cd6-aaca-1c06578a04ec-callus.png",
    "user": "63a8a19b9c19a7ae2f5efb19",
    "_id": "63aced693d6e0d39623fb37e",
    "__v": 0
  }
}
```

-   message : "Image Uploaded successfully"

#### onError

-   code :

    -   4xx -> This error ranges originate from the client, possible from a bad request(403),page not found (404), unauthorized access(402). etc

    -   5xx -> This error ranges originate from the server, possible the server being down(500). etc

-   payload :
    -   error

```
{
  "success": false,
  "msg": "error message"
}
```
