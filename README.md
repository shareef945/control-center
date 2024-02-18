# Express App Scaffold

This project provides a quick and easy way to set up a new Express.js application using TypeScript. It includes a basic file structure for an Express.js application, along with some common middleware and utility functions.

## Project Structure

The generated project has the following structure:

```
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── pnpm-lock.yaml
├── README.md
├── server.ts
├── src/
│   ├── config/
│   │   ├── config.ts
│   │   └── endpoints.ts
│   ├── controllers/
│   │   └── v1/
│   │       ├── auth-controller.ts
│   │       └── todos-controller.ts
│   ├── lib/
│   │   ├── db/
│   │   │   └── db.ts
│   │   └── http/
│   │       └── axios.ts
│   ├── middleware/
│   │   ├── error.ts
│   │   └── validation/
│   │       ├── auth.ts
│   │       ├── todos.ts
│   │       └── validation.ts
│   ├── models/
│   │   └── v1/
│   │       ├── auth-model.ts
│   │       └── todo-model.ts
│   ├── routes/
│   │   └── v1/
│   │       ├── auth-routes.ts
│   │       └── ...
│   └── utils/
│       ├── generateToken.ts
│       ├── not-found.ts
│       └── utils.ts
├── test/
├── tests/
└── tsconfig.json
```

## Usage

To create a new project, run the following command:

```
npx express-app-generator-ts <project-directory-name>
```

## Features

- Pre-configured TypeScript setup
- Express.js server setup
- Basic authentication and todo routes, controllers, and models
- Middleware for error handling and request validation
- Utility functions for token generation and handling 404 errors
- Dockerfile and docker-compose.yml for containerization
- Pre-configured testing setup

## Contributing

Contributions are welcome! Please open an issue if you encounter any problems or have a feature request.
