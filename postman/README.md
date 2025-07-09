### 🧪 Test Case Descriptions 


| #  | Test Name                         | Endpoint                     | Method         | Description                                                                          |
| -- | --------------------------------- | ---------------------------- | -------------- | ------------------------------------------------------------------------------------ |
| 1  | **User Login**                    | `/auth/login`                | `POST`         | Verifies successful login returns 200, token, and success=true.                      |
| 2  | **User Registration**             | `/auth/register`             | `POST`         | Validates registration returns 201, token, user object with schema.                  |
| 3  | **Duplicate Registration**        | `/auth/register`             | `POST`         | Ensures duplicate registration returns 400 with proper error message.                |
| 4  | **Invalid Credentials**           | `/auth/login`                | `POST`         | Confirms invalid login returns 401, with message “Invalid credentials”.              |
| 5  | **Blocked User Login**            | `/auth/login`                | `POST`         | Verifies blocked user receives 403 and appropriate message.                          |
| 6  | **Invalid Input on Registration** | `/auth/register`             | `POST`         | Checks missing username triggers 400 with validation errors.                         |
| 7  | **Access with Valid Token**       | `/products`                  | `GET`          | After login, accesses protected route using token. Checks 200 OK and token validity. |
| 8  | **Access with Invalid Token**     | `/products`                  | `GET`          | Confirms invalid token returns 401 Unauthorized and proper error message.            |
| 9  | **Access Without Token**          | `/products`                  | `GET`          | Ensures missing token returns 401 with message "No token provided".                  |
| 10 | **Logout Flow**                   | `/auth/logout` → `/products` | `POST` + `GET` | Validates logout success and that token becomes blacklisted on further access.       |


---

### 💡 Each Test Validates:
HTTP Status codes (200, 201, 400, 401, 403)

Response schema (keys, types, formats)

Token presence and correctness

Behavior under invalid or missing inputs

Response time under 200ms

