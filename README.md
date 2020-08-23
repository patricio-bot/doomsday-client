# DOOMSDAY

### Believing in Judgment Day

---

![logo](public/images/doomsday.jpg)
<br/><br/>

## Description

---

<br/>
<p>This application allows users to know their remaining life time, based on age, lifestyle, weight, height, for example. At the same time, it determines the most probable cause of death and its symptoms. The application has two modes of use, one for betting and one for challenge. Depending on the mode chosen by the user, the application will assign tasks to be performed.</p>
<br/>

## User Stories

---

- **Signup**: As anon users we can sign up in the app so we can get our life expectancy.
- **Login**:
  As a user I can log in to the app to see my pending tasks, the tasks performed, create new tasks, change the user mode, visit the judges' wall and edit my profile.
- **Logout**: As a user I can exit the App by closing my session.

- **Dashboard**:
  As a user I can check the updated life expectancy counter, as well as the probable cause of my death and the APP mode.

* **List of Tasks**: As a user I can check my tasks either completed or pending.

* **Add task**: As a user I can create new tasks with different difficulty levels.

* **The Judges' wall**: As a user I can visit the Judges' Wall, where I can see my current score and interact with other users.

* **Necrology**: As a user I can see the users who have died.

* **At Doomsday's Door**: As user I can filter users by illness and see their life expectancy.

* **User profile**: As user I can see, edit or delete my profile.

* **404**:
  As a user I can try to cheat the App and get an error for a response (and that's because Doomsday is benevolent).
  <br/><br/>
  ## Backlog
  ---
  <br/><br/>

# Client/Front-end

## Routes (React App)

---

| **Path**           | **Component** | **Permissions** | **Behavior**                                                                                                 |
| :----------------- | :------------ | :-------------- | :----------------------------------------------------------------------------------------------------------- |
| `/`                | SplashPage    | anon only       | Home page                                                                                                    |
| `/signup`          | Signup        | anon only       | Signup form, link to login (if required), navigate to Dashboard afterwards                                   |
| `/login`           | Login         | anon only       | Login form, link to signup (if required), navigate to Dashboard afterwards                                   |
| `/logout`          | n/a           | anon only       | Go to public homepage, expire session                                                                        |
| `/dashboard`       | Dashboard     | user            | Show Doomsday counter, the App mode and links to other pages                                                 |
| `/dashboard/:data` | DoomsdayData  | user            | Show the initial form to collect data from the user. Navigate to dashboard with the counter and the App mode |
| `/task`            | TaskList      | user            | Display the tasks assigned to the user by the App according to the chosen mode                               |
| `/task/:id`        | TaskCard      | user            | Display the details of a specific task                                                                       |
| `/task/add`        | CreateTask    | user            | As a user I can add new tasks according to the App mode                                                      |
| `/users`           | ListUsers     | user            | Show all users in The Judges' wall                                                                           |
| `/user/:id`        | UserCard      | user            | Show details of an user                                                                                      |
| `/user/edit/:id`   | EditUser      | user            | Edit details of the user                                                                                     |
| `/users/necrology` | ListUsers     | user            | Show all dead users in Necrology page                                                                        |
| `/sins/user/:id`   | ListSins      | user            | Show all the probably causes of death for a particular user                                                  |
| `sins/:id`         | SinCard       | user            | Show details of an illness, its causes and symptoms                                                          |
| `/user/results`    | ResultsCard   | user            | Show the initial result data gathered from doomsday form                                                     |

<br/>

## Components

---

- SplashPage
- SignUp Page
- Login Page
- Dashboard Page
- DoomsdayData
- TaskList
- Taskcard
- CreateTask
- ListUsers
- UserCard
- EditUser
- ListSins
- SinCard
- ResultsCard
- SearchBar
- SearchFilter
- NavBar
- Footer
- 404Page

<br/>

## Services

---

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth. me()

- User service

  - user.getAll()
  - user.getByFilter()
  - user.getOne(id)
  - user.updateOne(id,body)

- Task Service

  - task.getAll()
  - tasks.getOne(id)
  - task.create(body)
  - task.delete(id)

- Sin Service
  - sin.getAll()
  - sin.getOne(id)

<br/>

# Server / Back-end

## Models

---

User model
<br/><br/>

```javascript
{
  firstName:{type: String, required: true},
  lastName:{type:String, required:true},
  gender:{type:String, required:true},
  email: {type:String, required: true, unique:true},
  password:{type:String,required:true,unique:true},
  image: {type: String},
  tasksCreated:[{ type: mongoose.Schema.Types.ObjectId,ref: "Task"}],
  hasSins:[{ type: mongoose.Schema.Types.ObjectId, ref: "Sin"}],
  status:{type:String, enum:['alive', 'dead']}
}
```

<br/><br/>
Task model
<br/><br/>

```javascript
{
 title:{type:String, required:true},
 description:{type:String,required:true},
 punctuation:{type:Number, required:true},
 kind:{type:String, enum:[true, false]},
 image:{type:String},
 author:[{type: mongoose.Schema.Types.ObjectId,ref: "User"}]
}
```

<br/><br/>

Sin model
<br/><br/>

```javascript
{
  title:{type:String, required:true},
  symptoms:{type:String,required:true},
  image:{type:String},
  causes:{type:String,required:true}
}
```

<br/><br/>

## API Endpoints (back-end routes)

---

| **Method** | **Route**          | **Description**                                        | **Request Body**                                      |
| ---------- | ------------------ | ------------------------------------------------------ | ----------------------------------------------------- |
| `GET`      | `/auth/me`         | Check if user is logged                                | Saved session                                         |
| `POST`     | `/auth/signup`     | Create user and store it in session                    | {firstName, lastName,email,password,gender}           |
| `POST`     | `/auth/login`      | Stores user in session                                 | {email,password}                                      |
| `POST`     | `/auth/logout`     | Destroy the session                                    | (empty)                                               |
| `GET`      | `/user`            | Show all users                                         |                                                       |
| `GET`      | `/user/:id`        | User' details                                          | {id}                                                  |
| `PUT`      | `/user/edit`       | Edit the user profile                                  | {image,firstName,lastName}                            |
| `GET`      | `/task`            | Show all tasks                                         |                                                       |
| `GET`      | `/task/:id`        | Display an specific task                               | {id}                                                  |
| `POST`     | `/task/add`        | Creates a new task                                     | {author, image,kind,punctuation,title,description}    |
| `PUT`      | `/task/edit/:id`   | Edit task                                              | {id,author, image,kind,punctuation,title,description} |
| `DELETE`   | `/task/delete/:id` | Delete an specific task already created by the user    | {id}                                                  |
| `GET`      | `/sins/user/:id`   | Display all the diseases associated with the user      | {id}                                                  |
| `GET`      | `/sins/:id`        | Display a specific disease and its causes and symptoms | {id}                                                  |
| `POST`     | `/user/data`       | Update all the user information and stores it in DB    |                                                       |
| `GET`      | `/users/necrology` | Show all dead users                                    | {status}                                              |
