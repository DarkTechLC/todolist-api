# Route's information

### POST `/users/register`

- Registe a new user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "name": "User Name",
      "email": "user@mail.com",
      "password": "password"
    }
  }
  ```

- Response example:
  ```json
  {
    "auth": true,
    "token": "lkda21pd121po211adspoa023kp390"
  }
  ```

### POST `/users/login`

- Authenticate an user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "email": "user@mail.com",
      "password": "password"
    }
  }
  ```

- Response example:
  ```json
  {
    "auth": true,
    "token": "lkda21pd121po211adspoa023kp390"
  }
  ```

### GET `/users/logout`

- De-authenticate the user.

- Response example:
  ```json
  {
    "auth": false,
    "token": null
  }
  ```

### POST `/todos`

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
      "priority": "low"
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
      "priority": "low",
      "finished": false,
      "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
    }
  }
  ```

### GET `/todos`

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
        "priority": "low",
        "finished": true,
        "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
      },
      {
        "id": "E0B1Z9",
        "title": "Title 2 To Do",
        "description": "To do description",
        "priority": "medium",
        "finished": false,
        "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
      },
      {
        "id": "a0B1Z4",
        "title": "Title 3",
        "description": "To do description",
        "priority": "lowhigh",
        "finished": true,
        "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
      }
    ]
  }
  ```

### GET `/todos?search_words=&priority=`

- Search to dos by title or description and priority of authenticated user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "lkda21pd121po211adspoa023kp390"
    },
    "params": {
      "search_words": "To Do",
      "priority": ""
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
        "priority": "low",
        "finished": true,
        "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
      },
      {
        "id": "E0B1Z9",
        "title": "Title 2 To Do",
        "description": "To do description",
        "priority": "medium",
        "finished": false,
        "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
      }
    ]
  }
  ```

### PUT `/todos`

- Update a to do to the authenticated user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "lkda21pd121po211adspoa023kp390"
    },
    "body": {
      "id": "a0B1Z9",
      "title": "Title 1 edited",
      "description": "To do description edited",
      "priority": "high",
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
      "priority": "high",
      "finished": true,
      "date_added": "Tue Aug 18 2020 16:15:23 GMT-0300 (Brasilia Standard Time)"
    }
  }
  ```

### DELETE `/todos`

- Delete a to do to the authenticated user.

- Request example:

  ```json
  {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "lkda21pd121po211adspoa023kp390"
    },
    "body": {
      "id": "a0B1Z9"
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
