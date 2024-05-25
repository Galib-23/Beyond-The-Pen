# Blog Website

## Overview

This is a fully functional blog website built with Next.js. The application features role-based authentication using NextAuth with a GitHub provider. It employs Mongoose and MongoDB for the backend database and Bcrypt.js for password hashing. The application is responsive and supports two roles: normal user and admin.

## Live Link: [Beyond The Pen](https://beyond-the-pen.vercel.app/)

## Features

### User Authentication
- **GitHub Authentication**: Users can log in using their GitHub account.
- **Role-Based Access Control**: 
  - Normal users can only access the blog page after logging in.
  - Admin users have access to an admin dashboard.

### Admin Dashboard
- **User Management**: Admins can manage users, including setting user roles to admin or deleting users permanently.
- **Blog Management**: Admins can create, update, and delete blog posts.

### Responsive Design
- The application is fully responsive and works well on various screen sizes.

## Tech Stack

### Frontend
- **Next.js**: React framework for server-side rendering and static site generation.
- **CSS**: For styling the components.

### Backend
- **Next.js API Routes**: For handling backend logic.
- **NextAuth**: Authentication library for Next.js.
  - **GitHub Provider**: OAuth provider for GitHub login.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **MongoDB**: NoSQL database for storing user and blog data.
- **Bcrypt.js**: Library for hashing passwords.

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- GitHub OAuth App setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Galib-23/Beyond-The-Pen.git
   cd Beyond-The-Pen
   ```

2. Install Dependencies:
    ```bash
    npm install
    ```
<!-- 3. Creaet a .env.local file in the root directory:
    ```.env
    MONGO_URL=mongodb+srv://beyondthepen:5jA9e6EI7ccBrCrs@mern-estate-cluster.pesxosd.mongodb.net/blog?retryWrites=true&w=majority&appName=mern-estate-cluster
    AUTH_SECRET=thisisauthsecrethaha
    AUTH_URL=http://localhost:3000/api/auth
    NEXTAUTH_URL=http://localhost:3000 // change the url after production
    GITHUB_CLIENT_ID=Ov23liXbiwhbLv1koQNE
    GITHUB_CLIENT_SECRET=cc705a6f9b351e6dc02a1be2a662d95dc2462d4b
    ``` -->

3. Run the local development server:
    ```bash
    npm run dev
    ```

## Issues Regarding Authentication with User credentials:

```javascript
providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials){
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      }
    })
  ],
```

#### Here it returns either null or the user that's why it's quite difficult to show custom message to the client side

For more details [See here (next-auth/issues/9900)](https://github.com/nextauthjs/next-auth/issues/9900)