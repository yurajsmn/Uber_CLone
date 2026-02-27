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
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
  }
}
```

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

#### Notes

- Password is compared with the hashed password stored in the database
- A JWT token is generated and returned upon successful login
- The same error message is returned for both invalid email and password for security reasons
