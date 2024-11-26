# Backend Project

## Overview

This is the backend part of the project, built using Node.js and Express to create a robust API for managing application data and handling server-side logic.

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js)
- MongoDB (for data storage)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SahilGhadiya/TodoApp.git
   cd backend

   ```

2. Install the dependencies:

   ```bash
   npm install

   ```

3. Set up environment variables: Create a .env file in the root directory with the following variables:

   ```bash
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
   JWT_SECRET=<your-jwt-secret>

   ```

4. Running the Development Server
   ```bash
   node index.js
   ```

### Tools and Libraries Used

- Express.js: A Node.js web framework for building APIs and handling HTTP requests.
- Mongoose: An ODM for MongoDB to simplify data interactions.
- JWT (JSON Web Token): Used for secure authentication and authorization.
- dotenv: Loads environment variables from a .env file into process.env

### Challenges Faced and Decisions Made

- Database Configuration: Setting up MongoDB with Mongoose required designing an efficient data schema and handling connections.
- Authentication and Authorization: JWT was chosen to handle secure user authentication, as it provides a stateless, scalable solution for user management.
- Error Handling: Implemented a consistent error-handling mechanism for better debugging and user feedback.
