## Current Routes

* GET ```/healthcheck``` - Check to see if server is up


### User

* POST ```/api/users``` - Create user

                    Body:
                        {username, 
                          email, 
                          password, 
                          passwordConfirmation}


* GET ```/api/users``` - Get all users

* GET ```/api/users/:id``` - Get user by id


### Session

*   POST ```/api/sessions``` - Create access token for user

                    Body:
                        {email, 
                          password}


## Import routes
  * Import ```postman_collection.json``` to quickly import and use the current routes in Postman.


