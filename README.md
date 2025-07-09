# Postman API Testing Demo


[![API Tests](https://github.com/tfariyah31/Postman-API-Testing-Demo/actions/workflows/main.yml/badge.svg)](https://github.com/tfariyah31/Postman-API-Testing-Demo/actions/workflows/main.yml)

This project demonstrates API testing using **Postman**, **Newman**, and **GitHub Actions**, tested against a locally hosted Node.js backend application.

## 📁 Project Structure
```
Postman-API-Testing-Demo/
├── backend/
│   └── Node.js backend app
├── postman-tests/
│   ├── SimpleWebApp-API-Testing.postman_collection.json
│   ├── SimpleWebApp.postman_environment.json
│   └── README.md 
├── TestResults/
│   └── newman-report.html
├── .github/
│   └── workflows/
│       └── api-tests.yml 
├── README.md

```


## 🚀 Getting the Backend Up and Running

The backend is a simple Node.js + Express app that supports user registration, login and a product list.

### Technologies Used

- Node.js
- Express.js
- MongoDB (for database)
- Mongoose (for MongoDB object modeling)
- JWT (for authentication)

### 🔧 Prerequisites
- Node.js v18+
- MongoDB (or use MongoDB Atlas for a cloud database)
- Git

### 📦 Setup Instructions
##### 1. Navigate to the backend folder:

```bash

cd backend
```

##### 2. Install dependencies:

```bash
npm install
```

##### 3. Start the server:

```bash
node server.js
```

By default, the app runs on:
http://localhost:5000

## 🔬 Running API Tests Locally

### Tools Used
- Postman
- Newman
- GitHub Actions

### What’s Included
- Postman test scripts for a simple API app (backend)
- Newman test report
- CI workflow to run tests on every push

### ✅ Prerequisites
Install Newman globally if you haven’t:

```bash
npm install -g newman
```

### ▶️ Run the Postman collection:

```bash
newman run postman/SimpleWebApp-API-Testing.postman_collection.json \
  -e postman/SimpleWebApp.postman_environment.json \
  -r cli,html \
 --reporter-html-export TestResults/newman-report.html

```

💡 The HTML report will be saved in the TestResults/ folder.


### 🔄 Continuous Integration with GitHub Actions
This project includes a GitHub Actions workflow that:

- Installs Node.js and Newman
- Runs the Postman test suite on every push or pull request
- Uploads the Newman HTML report as an artifact

You can find the workflow file here:
.github/workflows/api-tests.yml

### Postman Test Coverage
The Postman collection includes tests for:

✅ Authentication 

✅ Authorization 

✅ Session Management 



---


### 👨‍💻 Author
👤 Tasnim Fariyah
🔗 [Github](https://github.com/tfariyah31)
🔗 [LinkedIn](https://www.linkedin.com/in/tasnim-fariyah/)

---

