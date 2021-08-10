# myFlix Angular

The front end or client-side of my myFlix app making use of the existing server-side of the myFlix API that I built using **MongoDB**. The user interface was making use of the MEAN stack to demonstrate my ability to work with **_Angular_**.

## Features ✅

**Login Form Component**

- Allow users to log in with a username and password using Angular Material dialogs (similar to Bootstrap Modals)
- Allow user to register (username, password, email and DOB) with a seperate similar \
  **Registration Form dialog**
- Authentication and authorization into API using basic HTTP authentication and JWT (token-based) authorization

**Main Movie Card Component**

- Return a list of ALL movies listed with an image, title, and description
- Ability to select a synopsis, director and genre for more details through a Dialog
- Allow users to add a movie to their list of favorites

**Profile Component**

- Allow users to update their user info(username, password, email, DOB)
- Allow users to deregister/delete their profile
- Display users favorite movies
- Allow users to remove movies from their favorites list

---

### User Stories

1. As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I have watched or am interested in.
2. As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Technologies

- TypeScript
- [Angular CLI](https://github.com/angular/angular-cli)
- [Angular Material](https://material.angular.io/)
- Kanban ([Trello](https://trello.com/))

# Quick Start 🚀

### Development Server

```bash
ng serve --port 8080
```

Navigate to [http://localhost:8080/](http://localhost:8080/) The app will automatically reload if you change any of the source files.

```bash
ng generate component <component-name>
```

Generates a new component. You can also use:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

To build the project.

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

---

## Final Reflections

<!-- I cant remember much about this other than having a difficult time understanding the point of endpoints but everything seemed to click after I started using Postmans because i could see the tanghible results of what the endpoints and HTTP requests meant -->

### Author

[Aaron Keohane](https://aakeohane.github.io/Portfolio-Website/index.html)

### Version

**_1.0.0_**
