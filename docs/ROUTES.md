# Route's information

### POST `/user/register`

- Registe a new user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "user_name": "User Name",
      "user_email": "user@mail.com",
      "password": "password"
    }
  }
  ```

- Response example:

  ```json
  {
    "auth": true,
    "token": "lkda21pd121po211adspoa023kp390",
    "user_name": "User Name"
  }
  ```

### POST `/user/login`

- Authenticate an user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "user_email": "user@mail.com",
      "password": "password"
    }
  }
  ```

- Response example:

  ```json
  {
    "auth": true,
    "token": "lkda21pd121po211adspoa023kp390",
    "user_name": "User Name"
  }
  ```

### GET `/user/logout`

- De-authenticate the user.

- Response example:

  ```json
  {
    "auth": false,
    "token": null,
    "user_name": null,
  }
  ```

### GET `/user/profile`

- View profile to the authenticated user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "lkda21pd121po211adspoa023kp390"
    }
  }
  ```

- Response example:

  ```json
  {
    "user_info": {
      "user_name": "User Name",
      "user_email": "user@mail.com",
    }
  }
  ```

### POST `/user/todos`

- Add a to do to the authenticated user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "lkda21pd121po211adspoa023kp390"
    },
    "body": {
      "title": "Title 1",
      "description": "To do description",
      "priority": 1
    }
  }
  ```

- Response example:

  ```json
  {
    "new_todo": {
      "id": "a0B1Z9",
      "title": "Title 1",
      "description": "To do description",
      "priority": 1,
      "finished": false,
      "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
    }
  }
  ```

### GET `/user/todos`

- Get all to dos of authenticated user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "lkda21pd121po211adspoa023kp390"
    }
  }
  ```

- Response body example:

  ```json
  {
    "todos": [
      {
        "id": "a0B1Z9",
        "title": "Title To Do 1",
        "description": "To do description",
        "priority": 1,
        "finished": true,
        "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
      },
      {
        "id": "E0B1Z9",
        "title": "Title 2 To Do",
        "description": "To do description",
        "priority": 2,
        "finished": false,
        "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
      },
      {
        "id": "a0B1Z4",
        "title": "Title 3",
        "description": "To do description",
        "priority": 3,
        "finished": true,
        "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
      }
    ]
  }
  ```

### GET `/user/todos?priority=1`

- Search to dos by priority.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "lkda21pd121po211adspoa023kp390"
    }
  }
  ```

- Response body example:

  ```json
  {
    "todos": [
      {
        "id": "a0B1Z9",
        "title": "Title To Do 1",
        "description": "To do description",
        "priority": 1,
        "finished": true,
        "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
      }
    ]
  }
  ```

### PUT `/todos/:id`

- Update a to do to the authenticated user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "lkda21pd121po211adspoa023kp390"
    },
    "body": {
      "title": "Title 1 edited",
      "description": "To do description edited",
      "priority": 3,
      "finished": true
    }
  }
  ```

- Response example:

  ```json
  {
    "updated_todo": {
      "id": "a0B1Z9",
      "title": "Title 1 edited",
      "description": "To do description edited",
      "priority": 3,
      "finished": true,
      "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
    }
  }
  ```

### DELETE `/todos/:id`

- Delete a to do to the authenticated user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "lkda21pd121po211adspoa023kp390"
    }
  }
  ```

- Response example:

  ```json
  {
    "deleted_todo": {
      "id": "a0B1Z9"
    }
  }
  ```

> The priority of the tasks ranges from 1 to 3, with **1** being **"low"**, **2** being **"medium"** and **3** being **"high"**.