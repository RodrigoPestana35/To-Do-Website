# To-Do List Website

## Description

This is a simple web application for task management (To-Do List), where users can create, view, edit, and mark tasks as completed. The project's goal is to provide a clear and intuitive interface for managing daily tasks, with user authentication and data persistence in a database.

## Features
- Add, view, edit, and delete tasks.
- Mark tasks as completed, visually distinguishing completed from pending tasks.
- Task persistence using a database.
- User authentication with login and registration using JWT.
- Responsive, adapting to different screen sizes without scrollbars.

## Technologies Used

- **Front-End**:
    - HTML5, CSS3, JavaScript
    - Fetch API for communication with the back-end
- **Back-End**:
   - Node.js with  Express
    - MongoDB for data persistence
- **Authentication**:
    - JSON Web Tokens (JWT)
- **Database**:
    - MongoDB Atlas (via Mongoose)
- **Version Control**:
    - Git e GitHub

## Dependencies

- **Node.js**: Runtime environment for the server.
- **Express**: Framework for building the back-end.
- **Mongoose**: ODM for interacting with MongoDB.
- **JWT**: For user authentication.
- **Cors**: To handle Cross-Origin Resource Sharing issues.
- **Body-parser**: For parsing HTTP requests.

To install all necessary dependencies, run the following command:

```sh
npm install
```

## Project Structure

```sh
├── public
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── Models
│   ├── Task.js
│   └── User.js
├── app.js
├── db.js
├── .gitignore
├── package.json
└── README.md
```
public/: Contains the front-end files.
models/: Contains the database models.

## How to Run

### Clone the repository

```sh
git clone https://github.com/teu-repositorio/to-do-list-web-app.git
```

### Install dependencies:

```sh
npm install
```

### Start the server:

```sh
node app.js
```

### Access the application
```sh
http://localhost:3000
```

## Future Improvements
- Push notifications integration to remind tasks.
- Task grouping by type.
- Add more details to tasks.

## Contributions

Feel free to open an issue or submit a pull request with improvements and suggestions.
