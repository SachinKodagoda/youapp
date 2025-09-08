#!/bin/bash

echo "Testing YouApp Login API"
echo "========================"

BASE_URL="http://localhost:3000"

echo "1. Testing Register API..."
echo "=========================="

REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }')

echo "Register Response:"
echo "$REGISTER_RESPONSE" | jq '.' 2>/dev/null || echo "$REGISTER_RESPONSE"

# Extract token from register response
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.token' 2>/dev/null)

echo ""
echo "2. Testing Login API..."
echo "======================="

LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }')

echo "Login Response:"
echo "$LOGIN_RESPONSE" | jq '.' 2>/dev/null || echo "$LOGIN_RESPONSE"

# Extract token from login response
if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token' 2>/dev/null)
fi

echo ""
echo "3. Testing Get Profile API..."
echo "============================="

if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
  PROFILE_RESPONSE=$(curl -s -X GET "$BASE_URL/api/get-profile" \
    -H "Authorization: Bearer $TOKEN")

  echo "Profile Response:"
  echo "$PROFILE_RESPONSE" | jq '.' 2>/dev/null || echo "$PROFILE_RESPONSE"
else
  echo "No token available, skipping profile test"
fi

echo ""
echo "4. Testing Login with Wrong Password..."
echo "======================================="

WRONG_LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "wrongpassword"
  }')

echo "Wrong Password Response:"
echo "$WRONG_LOGIN_RESPONSE" | jq '.' 2>/dev/null || echo "$WRONG_LOGIN_RESPONSE"

echo ""
echo "Testing complete!"
