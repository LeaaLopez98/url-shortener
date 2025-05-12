# URL Shortener 🔗

A full-featured URL shortening service built with modern web technologies.

## ✨ Features

- **🔗 URL Shortening**: Create shortened URLs for easier sharing
- **🔒 User Authentication**: Register and login to manage your URLs
- **📊 URL Management**: View, track, and delete your shortened URLs
- **👆 Click Tracking**: Monitor how many times your shortened URLs have been accessed
- **⏱️ Expiration**: URLs automatically expire after 7 days by default (customizable)
- **📚 API Documentation**: Complete Swagger documentation

## 🛠️ Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black" alt="Swagger" />
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. Create `.env` file in the root directory
   ```
   JWT_SECRET=your_secret_key_here
   SALT=your_salt_for_hashids
   ```

3. Start MongoDB and Redis using Docker Compose
   ```bash
   cd deployment
   docker-compose up -d
   ```

4. Install dependencies
   ```bash
   npm install
   ```

5. Run the application
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 📚 API Documentation

Swagger UI documentation is available at `http://localhost:3000/api-docs` when the application is running.

## 💾 Data Models

### URL Schema
```javascript
{
  originalUrl: String,
  shortUrl: String,
  clicks: Number,
  createdAt: Date,
  expiresAt: Date
}
```

### User Schema
```javascript
{
  username: String,
  password: String (hashed),
  email: String,
  urls: [ObjectId]
}
```

## 🔐 Security

- Authentication using JWT
- Passwords hashed using bcrypt
- Token-based access control for URL management
