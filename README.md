# User Management System

## Live Demo
> Note: Please be patient while the website is loading.

you can view the live version of the project  [here](https://user-management-system-web-app.onrender.com/dashboard)

# Overview:

- This is a simple User Management System web application built using the MVC framework. It allows users to perform CRUD (Create, Read, Update, Delete) operations on user data, including name, phone number, email, and customer overview details.

# Features:

- Add new users
- View user details
- Update existing user information
- Delete users

# Project Structure

- controllers - Contains the MVC controllers.
- models - Contains the data models.
- views - Contains the EJS templates.
- public - Contains static files like CSS, JavaScript, and images.

# Technologies Used

- Framework: MVC
- Backend: Node.js with Express
- Database: MongoDB
- Frontend: EJS (Embedded JavaScript)
- Libraries:

  - connect-flash: ^0.1.1
  - dotenv: ^16.4.5
  - ejs: ^3.1.10
  - express: ^4.21.0
  - express-ejs-layouts: ^2.5.1
  - express-session: ^1.18.0
  - method-override: ^3.0.0
  - mongoose: ^8.7.0

# Installation

1. Clone the repository:
   git clone https://github.com/prajwalnikam7131/User-management-system-web-app

2. Install dependencies:
   npm i

3. Set up the environment variables:

- MONGODB_URL=your_mongodb_url
- SESSION_SECRET=your_session_secret_code
- MONGO_SESSION_SECRET=your_mongo_session_secret

# Usage

- npm start
- http://localhost:3000/dashboard

# License

> This project is licensed under the MIT License - see the LICENSE file for details.
