# Node.js Practical - Capermint 

## Overview

Node.js application that implements a registration and login system, along with an admin panel for managing categories and products. The application uses Express.js for the backend, EJS for rendering views, and JSON Web Tokens (JWT) for authentication. 

## Features

- **User Registration API**: Allows users to register with their name, email, phone, and password.
- **User Login API**: Authenticates users using their email and password, providing a JWT for session management.
- **Profile Management**: Users can view and update their profiles, which includes their name, email, phone, and password.
- **Admin Panel**: An admin interface built with EJS for managing categories and products.
- **Category Management**: Admins can create and manage multilevel categories.
- **Product Management**: Admins can add, update, and delete products, including images and descriptions.
- **Product Search**: Users can filter products by title.

## Session Management

- The application uses `express-session` to manage user sessions, ensuring that only authenticated users can access certain routes.

## Frontend Integration

The frontend is built using EJS, which allows for dynamic rendering of HTML pages. The following features are integrated:

- **Login Page**: For user and admin login.
- **Category Management Page**: For admins to manage categories.
- **Product Management Page**: For admins to manage products.
- **User Profile Page**: For users to view and update their profiles.

## Screenshots

For a visual representation of the application, please refer to the [Screenshots README](screenshots.md).

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Access the application at `http://localhost:3000`.
