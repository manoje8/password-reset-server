# PASSWORD RESET FLOW (SERVER)


This project implements a secure password reset flow for user accounts, with email verification and encrypted password storage in the database using industry-standard hashing algorithms.

### API Endpoints

1. **Create User:** `POST /register` - Creates a new user account.
2. **User Login:** `POST /login` - Authenticates a user with email and password. 
3. **Forgot Password:** `POST /forgot-password` - Initiates password reset by sending an OTP (One-Time Password) to the user's registered email.
4. **Reset Password:** `POST /reset-password` - Validates the OTP and email, then updates the user's password in the database using a secure hashing algorithm.

### Deployment

Live Website: [Password Reset Flow (Server)]()

### Installation and Setup

**Prerequisites:**

- Node.js
- npm (Node Package Manager)

**Instructions:**

1. Clone the repository:

```
git clone https://github.com/manoje8/repo-name.git
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev  (OR)
npm start
```

The server will start on port `3000` by default. You can access the application routes in your browser.

### Technologies Used

- Node.js: JavaScript runtime environment for server-side applications.
- Express.js: Web application framework for Node.js.
- Mongoose: Object Data Modeling (ODM) library for MongoDB.
- bcrypt: Secure password hashing library.
- cors: Enables Cross-Origin Resource Sharing (CORS) for API requests.
- dotenv: Loads environment variables from a `.env` file.
- jsonwebtoken: JSON Web Token library for secure authentication.
- nodemailer: Library for sending email messages.
- nodemon: Development utility that restarts the server automatically on code changes.
- morgan: HTTP request logger middleware for debugging purposes.