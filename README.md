<h1 align="center">NOW-Issue-Tracker</h3>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow steps.

1. Clone the repo
   ```sh
   git clone https://github.com/nestorcayananjr/now-issue-tracker.git
   ```
2. Install and open [Docker Desktop](https://www.docker.com/products/docker-desktop/) 

3. Run following command in project root to build the docker image.
   ```sh
   docker compose up --build
   ```

4. Start the server
   ```sh
   cd server
   npm install
   npm run dev
   ```

5. Start the client 
   ```sh
   cd ../client
   npm install
   npm start
   ```
<br>

User Credentials for Testing

| email   | password 
| -------- | ------------ |
| test@test.com       | password123       |
| win@win.com     | securepass |
| thomas@magee.com   | nowopwells |

<!-- Engineering Decisions -->
## Engineering Decisions
<br>

### User, Project, and Issue Schemas

1. User Schema

| Column   | Type         | Constraints      | Notes                |
| -------- | ------------ | ---------------- | -------------------- |
| id       | SERIAL       | PRIMARY KEY      | Auto-incrementing ID |
| name     | VARCHAR(100) |                  |                      |
| email    | VARCHAR(100) | UNIQUE, NOT NULL | Must be unique       |
| password | VARCHAR(100) | NOT NULL         | Hashed password      |

**Explanation:**
Emails need to be unique and passwords are stored hashed for security. Name row is not currently being used but is included for when we want to attach names to issues or projects.

---

2. Project Schema

| Column        | Type         | Constraints             | Notes                              |
| ------------- | ------------ | ----------------------- | ---------------------------------- |
| id            | SERIAL       | PRIMARY KEY             | Auto-incrementing ID               |
| project\_name | VARCHAR(100) | NOT NULL                | Name of the project                |
| created\_by   | INTEGER      | FOREIGN KEY → users(id) | Deletes project if user is deleted |

**Explanation:**
Since projects can only be created by registered users, we use the id from the user table for created_by. This prevents the need to update a project when a user changes their name or email.

---

3. Issues Schema

| Column             | Type           | Constraints                | Notes                               |
| ------------------ | -------------- | -------------------------- | ----------------------------------- |
| id                 | SERIAL         | PRIMARY KEY                | Auto-incrementing ID                |
| title              | VARCHAR(100)   | NOT NULL                   | Issue title                         |
| issue\_description | VARCHAR(255)   | NOT NULL                           |      Issue Description           |
| status             | ticket\_status | NOT NULL                   | ENUM: `'open'` or `'closed'`        |
| created\_at        | TIMESTAMP      | DEFAULT CURRENT\_TIMESTAMP | Timestamp when issue is created     |
| project\_id        | INTEGER        | FOREIGN KEY → projects(id) | Deletes issue if project is deleted |

**Explanation:**
Issues are always associated with a project so similar to the projects schema, we store the reference to the project id as a foreign key. Again, this prevents the need to update all issues that are associated with a project. Created_at is not currently being used, but is included to expand functionality in the future (ex: show how long ago an issue was posted). Finally the status of an issue can only be 'open' or 'closed' so we use an enum.

---

### Authentication

For authentication I am using express-session. 

When a user successfully logs in, the `userId` is stored on the session object which lives server-side. 

In return, express-session sends the browser a cookie `connect.sid`. This cookie’s value is the session ID, which the server uses to look up the session on future requests. 

As long as the client makes axios requests with the `withCredentials` option set to `true` the browser will send the cookie with each request. This allows express-session to find the session and attach it to `req.session`. 

In `authController` is a middleware function `requireAuth`. For routes that require authentication, this middleware function is ran first (ex: creating a new project and issue). 

In the middleware function `requireAuth` I check for the userId that was stored on the session object...
- if it is there it will move on to the next middleware function. 
- if not, user is given a **401 Unauthorized** error.

## Further Development

### User Facing Features
- Project start and end dates.
- Multiple users assigned to projects.
- Issue assignees.
- Issue priorities.
- Auto-updating when creating new data.
- Styling.

### Codebase Improvements
- Including some storage for express-session.
- Improved state-management: Redux, Zustand, Context/Reducer
- Testing
- Standardized Types
- Reusable components and hooks
- Security Enhancements (ex: improved sterilization)
- Axios controller for frontend