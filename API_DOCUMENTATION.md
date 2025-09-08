# YouApp API Documentation

This document describes the authentication API endpoints for the YouApp application.

## Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

   ```
   MONGODB_URI=mongodb://localhost:27017/youapp
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NEXTAUTH_URL=http://localhost:3000
   ```

2. Make sure MongoDB is running on your system or use MongoDB Atlas.

## API Endpoints

### 1. Register User

**POST** `/api/register`

Creates a new user account.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123",
  "username": "johndoe"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Login User

**POST** `/api/login`

Authenticates a user and returns a JWT token.

**Request Body:**

```json
{
  "password": "password123",
  "username": "johndoe" // can be username or email
}
```

**Response:**

```json
{
  "message": "Login successful",
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "displayName": "John Doe",
    "gender": "Male",
    "birthday": "1990-01-01T00:00:00.000Z",
    "horoscope": "Capricorn",
    "zodiac": "Horse",
    "height": 175,
    "weight": 70,
    "profileImage": "image_url",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Get Profile

**GET** `/api/get-profile`

Retrieves the authenticated user's profile information.

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
  "message": "Profile retrieved successfully",
  "success": true,
  "user": {
    "_id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "displayName": "John Doe",
    "gender": "Male",
    "birthday": "1990-01-01T00:00:00.000Z",
    "horoscope": "Capricorn",
    "zodiac": "Horse",
    "height": 175,
    "weight": 70,
    "profileImage": "image_url",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Error Responses

All endpoints return appropriate HTTP status codes and error messages:

- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Authentication required or invalid credentials
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists (e.g., username/email taken)
- `500 Internal Server Error` - Server error

Example error response:

```json
{
  "message": "Invalid credentials",
  "success": false
}
```

## Authentication

After successful login or registration, include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer your_jwt_token_here
```

The token expires after 7 days and needs to be refreshed by logging in again.

## Database Schema

The users collection in MongoDB has the following structure:

```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  displayName: String (optional),
  gender: String (optional),
  birthday: Date (optional),
  horoscope: String (optional),
  zodiac: String (optional),
  height: Number (optional),
  weight: Number (optional),
  profileImage: String (optional),
  createdAt: Date (required),
  updatedAt: Date (required),
  lastLoginAt: Date (optional)
}
```

## Testing the API

You can test the API using tools like Postman, curl, or any HTTP client:

```bash
# Register a new user
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Get profile (replace TOKEN with actual JWT token)
curl -X GET http://localhost:3000/api/get-profile \
  -H "Authorization: Bearer TOKEN"
```
