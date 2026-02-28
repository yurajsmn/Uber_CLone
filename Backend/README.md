# Uber Clone Backend API Documentation

## User Registration Endpoint

### POST /users/register

Creates a new user account in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Required Fields

| Field                | Type   | Description          | Validation                   |
| -------------------- | ------ | -------------------- | ---------------------------- |
| `fullname.firstname` | string | User's first name    | Minimum 3 characters         |
| `fullname.lastname`  | string | User's last name     | Optional                     |
| `email`              | string | User's email address | Must be a valid email format |
| `password`           | string | User's password      | Minimum 6 characters         |

#### Response

**Success (201 Created)**

```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "_id": "user_id",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
  }
}
```

**Validation Error (400 Bad Request)**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Server Error (500 Internal Server Error)**

```json
{
  "message": "Error message"
}
```

#### Status Codes

| Status Code | Description                           |
| ----------- | ------------------------------------- |
| 201         | User successfully created             |
| 400         | Validation error - Invalid input data |
| 500         | Internal server error                 |

#### Example Request

```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Example Response

**Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4YTNiNGU0YjJjMTIzNDU2Nzg5MGEiLCJpYXQiOjE3MDg5ODc2MDB9.xK8j9mNvL2pQrT6sU8wY3zB5cD7eF9gH1iJ2kL3mN4o",
  "user": {
    "_id": "65f8a3b4e4b2c123456789",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (Validation Failed):**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

**Error Response (Duplicate Email):**

```json
{
  "message": "E11000 duplicate key error collection: uber-clone.users index: email_1 dup key: { email: \"john@example.com\" }"
}
```

#### Notes

- Password is automatically hashed using bcrypt before storing
- A JWT token is generated and returned upon successful registration
- Token is set as an HTTP cookie named 'token' with 24-hour expiration
- Email must be unique - duplicate emails will result in an error

---

## User Login Endpoint

### POST /users/login

Authenticates an existing user and returns a JWT token.

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Required Fields

| Field      | Type   | Description          | Validation                   |
| ---------- | ------ | -------------------- | ---------------------------- |
| `email`    | string | User's email address | Must be a valid email format |
| `password` | string | User's password      | Minimum 6 characters         |

#### Response

**Success (200 OK)**

Returns user object and JWT token. Also sets an HTTP-only cookie with the token.

```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

**Set-Cookie Header:**

```
Set-Cookie: token=JWT_TOKEN_STRING; Path=/; HttpOnly
```

**Validation Error (400 Bad Request)**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Authentication Error (401 Unauthorized)**

```json
{
  "message": "Invalid email or password"
}
```

#### Status Codes

| Status Code | Description                           |
| ----------- | ------------------------------------- |
| 200         | Login successful                      |
| 400         | Validation error - Invalid input data |
| 401         | Invalid credentials                   |

#### Example Request

```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Example Response

**Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4YTNiNGU0YjJjMTIzNDU2Nzg5MGEiLCJpYXQiOjE3MDg5ODc2MDB9.xK8j9mNvL2pQrT6sU8wY3zB5cD7eF9gH1iJ2kL3mN4o",
  "user": {
    "_id": "65f8a3b4e4b2c123456789",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

**Note:** The token is also automatically set in an HTTP cookie for subsequent authenticated requests.

**Error Response (Invalid Credentials):**

```json
{
  "message": "Invalid email or password"
}
```

**Error Response (Validation Failed):**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

#### Authentication Flow

1. User submits email and password
2. Server validates credentials against hashed password in database
3. JWT token is generated with user ID and 24-hour expiration
4. Token is sent in both:
   - Response body (JSON)
   - HTTP-only cookie (for automatic authentication)

#### Notes

- Password is compared with the hashed password stored in the database using bcrypt
- Token expires after 24 hours
- Cookie is automatically included in subsequent requests to authenticated endpoints
- The same error message is returned for both invalid email and password for security reasons
- Token can be used via cookie (recommended) or Authorization header

---

## User Profile Endpoint

### GET /users/profile

Retrieves the authenticated user's profile information.

#### Authentication

This endpoint requires authentication. Include the JWT token in one of the following ways:

1. **Cookie (Recommended)**: Token automatically sent via HTTP cookie
2. **Authorization Header**: `Authorization: Bearer <token>`

#### Response

**Success (200 OK)**

```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com"
}
```

**Authentication Error (401 Unauthorized)**

```json
{
  "message": "Unauthorized"
}
```

```json
{
  "message": "User not found"
}
```

#### Status Codes

| Status Code | Description                        |
| ----------- | ---------------------------------- |
| 200         | Profile retrieved successfully     |
| 401         | Not authenticated or invalid token |

#### Example Request

**Using Cookie (automatic after login):**

```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Content-Type: application/json" \
  --cookie "token=YOUR_JWT_TOKEN"
```

**Using Authorization Header:**

```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Example Response

**Success Response:**

```json
{
  "_id": "65f8a3b4e4b2c123456789",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com"
}
```

**Error Response (Not Authenticated):**

```json
{
  "message": "Unauthorized"
}
```

#### Notes

- Authentication middleware checks for token in cookies first, then falls back to Authorization header
- Token must be valid and not expired (24-hour expiration)
- User password is not included in the response for security

---

## Captain Registration Endpoint

### POST /captains/register

Creates a new captain (driver) account in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": number,
    "vehicleType": "string"
  }
}
```

#### Required Fields

| Field                 | Type   | Description                | Validation                              |
| --------------------- | ------ | -------------------------- | --------------------------------------- |
| `fullname.firstname`  | string | Captain's first name       | Minimum 3 characters                    |
| `fullname.lastname`   | string | Captain's last name        | Minimum 3 characters (optional)         |
| `email`               | string | Captain's email address    | Must be a valid email format, unique    |
| `password`            | string | Captain's password         | Minimum 6 characters                    |
| `vehicle.color`       | string | Vehicle color              | Minimum 3 characters                    |
| `vehicle.plate`       | string | Vehicle license plate      | Minimum 3 characters                    |
| `vehicle.capacity`    | number | Vehicle passenger capacity | Minimum 1                               |
| `vehicle.vehicleType` | string | Type of vehicle            | Must be: "car", "motorcycle", or "auto" |

#### Response

**Success (201 Created)**

```json
{
  "token": "JWT_TOKEN_STRING",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Yuvraj",
      "lastname": "Suman"
    },
    "email": "yuvrajsuman@gmail.com",
    "vehicle": {
      "color": "red",
      "plate": "MP 434 67573",
      "capacity": 3,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

**Set-Cookie Header:**

```
Set-Cookie: token=JWT_TOKEN_STRING; Path=/; HttpOnly
```

**Validation Error (400 Bad Request)**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Captain Already Exists (400 Bad Request)**

```json
{
  "message": "Captain already exist"
}
```

#### Status Codes

| Status Code | Description                         |
| ----------- | ----------------------------------- |
| 201         | Captain successfully created        |
| 400         | Validation error or duplicate email |
| 500         | Internal server error               |

#### Example Request

```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Yuvraj",
      "lastname": "Suman"
    },
    "email": "yuvrajsuman@gmail.com",
    "password": "password",
    "vehicle": {
      "color": "red",
      "plate": "MP 434 67573",
      "capacity": 3,
      "vehicleType": "car"
    }
  }'
```

#### Example Response

**Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4YTNiNGU0YjJjMTIzNDU2Nzg5MGEiLCJpYXQiOjE3MDg5ODc2MDB9.xK8j9mNvL2pQrT6sU8wY3zB5cD7eF9gH1iJ2kL3mN4o",
  "captain": {
    "_id": "65f8a3b4e4b2c123456789",
    "fullname": {
      "firstname": "Yuvraj",
      "lastname": "Suman"
    },
    "email": "yuvrajsuman@gmail.com",
    "vehicle": {
      "color": "red",
      "plate": "MP 434 67573",
      "capacity": 3,
      "vehicleType": "car"
    },
    "status": "inactive",
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

**Note:** The token is also automatically set in an HTTP cookie for subsequent authenticated requests.

**Error Response (Validation Failed):**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Invalid vehicle type",
      "path": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

**Error Response (Duplicate Email):**

```json
{
  "message": "Captain already exist"
}
```

#### Authentication Flow

1. Captain submits registration details including vehicle information
2. Server validates all fields and checks for duplicate email
3. Password is hashed using bcrypt with salt rounds of 10
4. Captain account is created with default status "inactive"
5. JWT token is generated with captain ID and 24-hour expiration
6. Token is sent in both:
   - Response body (JSON)
   - HTTP-only cookie (for automatic authentication)

#### Notes

- Password is automatically hashed using bcrypt before storing
- Token expires after 24 hours
- Cookie is automatically included in subsequent requests to authenticated endpoints
- Email must be unique - duplicate emails will result in an error
- Captain status defaults to "inactive" upon registration
- Vehicle type is restricted to: "car", "motorcycle", or "auto"
- Location coordinates (lat/lng) are initialized as null and can be updated later
- Token can be used via cookie (recommended) or Authorization header

---

## Captain Login Endpoint

### POST /captains/login

Authenticates an existing captain and returns a JWT token.

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Required Fields

| Field      | Type   | Description             | Validation                   |
| ---------- | ------ | ----------------------- | ---------------------------- |
| `email`    | string | Captain's email address | Must be a valid email format |
| `password` | string | Captain's password      | Minimum 6 characters         |

#### Response

**Success (200 OK)**

Returns captain object and JWT token. Also sets an HTTP-only cookie with the token.

```json
{
  "token": "JWT_TOKEN_STRING",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Yuvraj",
      "lastname": "Suman"
    },
    "email": "yuvrajsuman@gmail.com",
    "vehicle": {
      "color": "red",
      "plate": "MP 434 67573",
      "capacity": 3,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

**Set-Cookie Header:**

```
Set-Cookie: token=JWT_TOKEN_STRING; Path=/; HttpOnly
```

**Validation Error (400 Bad Request)**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Authentication Error (401 Unauthorized)**

```json
{
  "message": "Invalid email or password"
}
```

#### Status Codes

| Status Code | Description                           |
| ----------- | ------------------------------------- |
| 200         | Login successful                      |
| 400         | Validation error - Invalid input data |
| 401         | Invalid credentials                   |

#### Example Request

```bash
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "yuvrajsuman@gmail.com",
    "password": "password"
  }'
```

#### Example Response

**Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "65f8a3b4e4b2c123456789",
    "fullname": {
      "firstname": "Yuvraj",
      "lastname": "Suman"
    },
    "email": "yuvrajsuman@gmail.com",
    "vehicle": {
      "color": "red",
      "plate": "MP 434 67573",
      "capacity": 3,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

**Note:** The token is also automatically set in an HTTP cookie for subsequent authenticated requests.

#### Authentication Flow

1. Captain submits email and password
2. Server validates credentials against hashed password in database
3. JWT token is generated with captain ID and 24-hour expiration
4. Token is sent in both:
   - Response body (JSON)
   - HTTP-only cookie (for automatic authentication)

#### Notes

- Password is compared with the hashed password stored in the database using bcrypt
- Token expires after 24 hours
- Cookie is automatically included in subsequent requests to authenticated endpoints
- The same error message is returned for both invalid email and password for security reasons
- Token can be used via cookie (recommended) or Authorization header

---

## Captain Profile Endpoint

### GET /captains/profile

Retrieves the authenticated captain's profile information.

#### Authentication

This endpoint requires authentication. Include the JWT token in one of the following ways:

1. **Cookie (Recommended)**: Token automatically sent via HTTP cookie
2. **Authorization Header**: `Authorization: Bearer <token>`

#### Response

**Success (200 OK)**

```json
{
  "_id": "captain_id",
  "fullname": {
    "firstname": "Yuvraj",
    "lastname": "Suman"
  },
  "email": "yuvrajsuman@gmail.com",
  "vehicle": {
    "color": "red",
    "plate": "MP 434 67573",
    "capacity": 3,
    "vehicleType": "car"
  },
  "status": "inactive",
  "location": {
    "lat": null,
    "lng": null
  }
}
```

**Authentication Error (401 Unauthorized)**

```json
{
  "message": "Unauthorized"
}
```

#### Status Codes

| Status Code | Description                        |
| ----------- | ---------------------------------- |
| 200         | Profile retrieved successfully     |
| 401         | Not authenticated or invalid token |

#### Example Request

**Using Cookie (automatic after login):**

```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Content-Type: application/json" \
  --cookie "token=YOUR_JWT_TOKEN"
```

**Using Authorization Header:**

```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Example Response

**Success Response:**

```json
{
  "_id": "65f8a3b4e4b2c123456789",
  "fullname": {
    "firstname": "Yuvraj",
    "lastname": "Suman"
  },
  "email": "yuvrajsuman@gmail.com",
  "vehicle": {
    "color": "red",
    "plate": "MP 434 67573",
    "capacity": 3,
    "vehicleType": "car"
  },
  "status": "inactive",
  "location": {
    "lat": null,
    "lng": null
  }
}
```

#### Notes

- Authentication middleware checks for token in cookies first, then falls back to Authorization header
- Token must be valid and not expired (24-hour expiration)
- Captain password is not included in the response for security
- Blacklisted tokens (from logout) are rejected

---

## Captain Logout Endpoint

### POST /captains/logout

Logs out the authenticated captain by blacklisting their token and clearing the cookie.

#### Authentication

This endpoint requires authentication. Include the JWT token in one of the following ways:

1. **Cookie (Recommended)**: Token automatically sent via HTTP cookie
2. **Authorization Header**: `Authorization: Bearer <token>`

#### Response

**Success (200 OK)**

```json
{
  "message": "Logout Successfully"
}
```

**Authentication Error (401 Unauthorized)**

```json
{
  "message": "Unauthorized"
}
```

#### Status Codes

| Status Code | Description                        |
| ----------- | ---------------------------------- |
| 200         | Logout successful                  |
| 401         | Not authenticated or invalid token |

#### Example Request

**Using Cookie:**

```bash
curl -X POST http://localhost:4000/captains/logout \
  -H "Content-Type: application/json" \
  --cookie "token=YOUR_JWT_TOKEN"
```

**Using Authorization Header:**

```bash
curl -X POST http://localhost:4000/captains/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Example Response

**Success Response:**

```json
{
  "message": "Logout Successfully"
}
```

#### Logout Process

1. Captain sends logout request with valid token
2. Server extracts token from cookie or Authorization header
3. Token is added to blacklist database
4. Cookie is cleared from response
5. Success message is returned

#### Notes

- Once logged out, the token is blacklisted and cannot be reused
- Attempting to use a blacklisted token will result in 401 Unauthorized
- Cookie is automatically cleared on logout
- Token remains blacklisted even after the 24-hour expiration
- Captain must login again to receive a new valid token

---
