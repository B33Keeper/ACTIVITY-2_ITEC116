# Blog API (NestJS + React)

A simple blog application with authentication, posts, and comments.  
Backend powered by **NestJS + TypeORM (MySQL)**, frontend built in **React**.

---

## Features

- **Swagger API Docs** (`http://localhost:4000/api`)
- **Authentication** (JWT-based)
  - Register
  - Login
- **User management** (CRUD planned)
- **Posts** (public feed, create with JWT)
- **Comments** (CRUD planned)
- **React frontend** (created with CRA)

---

## Tech Stack

- **Backend**
  - [NestJS](https://nestjs.com/) (TypeScript)
  - TypeORM + MySQL (XAMPP local DB)
  - JWT authentication (Passport.js strategies)
  - Bcrypt for password hashing
  - Swagger UI for API documentation
- **Frontend**
  - React (CRA)
- **Environment**
  - Node.js + npm (installed via Chocolatey)
  - Tested in Cursor + Git Bash

---

## Setup

### Environment Variables (`.env`)
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=blog_db

JWT_SECRET=supersecretjwt
JWT_EXPIRES=1d
PORT=4000
```

## Installed Dependencies

npm install @nestjs/common @nestjs/core @nestjs/platform-express
npm install @nestjs/config class-validator class-transformer
npm install @nestjs/typeorm typeorm mysql2
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install bcrypt
npm install @nestjs/swagger swagger-ui-express
npm install -D @types/bcrypt @types/passport @types/passport-jwt

## database:
CREATE DATABASE blog_db;

Generating Modules (Nest v11+)
# Users
npx nest g module users
npx nest g controller users --no-spec
npx nest g service users --no-spec

# Posts
npx nest g module posts
npx nest g controller posts --no-spec
npx nest g service posts --no-spec

# Comments
npx nest g module comments
npx nest g controller comments --no-spec
npx nest g service comments --no-spec

# Auth
npx nest g module auth
npx nest g controller auth --no-spec
npx nest g service auth --no-spec

Entities
UserEntity: id, email (unique), passwordHash, createdAt

PostEntity: id, title, content, createdAt




## RUNNNING THE PROJECT

#BACK END
cd "server"
RUN THIS ON THE CONSOLE: npm run start:dev

#FRONT END
cd "client"
npm start


API Usage (via Swagger)

##1.Register
* POST /auth/register
* Body:
{
  "email": "test@example.com",
  "password": "test123"

}


##2. Login

* POST /auth/login
* Response:
{
  "access_token": "..."
}

##3.Authorize

*Click Authorize in Swagger
*Paste the token (⚠️ without Bearer prefix)

##4. Posts

GET /posts → list posts (public, supports offset + limit)

POST /posts → create new post (requires JWT)




## SUMMARY

Backend: NestJS + TypeORM + JWT + Swagger
Frontend: React
Database: MySQL (XAMPP)
Scope: minimal blog API with authentication and posts feed
Future: user CRUD, comments CRUD, admin roles

