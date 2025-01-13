# Project README

## Bizcuit Backend

API for a TODO list application.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/beatmasta/bizcuit-api.git
    cd bizcuit-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Copy the .env.example file to .env:
    ```sh
    cp .env.example .env
    ```

4. Start the backend:
    ```sh
    npm start
    ```

## Running the Tests

1. Run the tests:
    ```sh
    npm test
    ```

## Project Structure

- `src/index.ts`: Entry point of the application.
- `src/middleware/auth.middleware.ts`: Middleware for handling JWT authentication.
- `src/models/todo.model.ts`: TypeScript interface for the Todo model.
- `src/routes/todo.routes.ts`: Routes for managing todos.
- `src/routes/auth.routes.ts`: Routes for user authentication.
- `src/models/todo.model.test.ts`: Unit tests for the Todo model.

## Design Choices

### TypeScript
- **Reason**: Type safety for avoiding runtime errors and improving code quality.

### Express
- **Reason**: As a minimal web framework.

### JWT (jsonwebtoken)
- **Reason**: For secure authentication.

### MySQL (mysql2)
- **Reason**: For a minimal MySQL support, didn't use any ORM for quicker implementation.

### dotenv
- **Reason**: For reading .env file.

### bcryptjs
- **Reason**: Secure way of hashing passwords.

### cors
- **Reason**: For allowing the frontend to connect to the API.

### jest
- **Reason**: Chose as a widely used testing framework. (Could've also chosen Vitest - used this in the ShellRecharge project)

### jest-mock-extended
- **Reason**: For mocking in Jest.

### ts-jest
- **Reason**: For being able to use TypeScript in Jest.

All of the choices were mostly made to be able to quickly implement the application, but use at least a secure JWT authentication.
