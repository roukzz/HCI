# RB-Web
HOW TO RUN TEST: npm test

HOW TO RUN the APP: npm start

HOW TO REGISTER A NEW USER :
   - make a POST request to http://localhost:3000/api/user/register
   - the POST request has to have the following String fields. all fields are required and have the following syntax:
        - email
        - password
        - institution
        - firstName
        - lastName

HOW TO UPDATE A USER INFO BY PROVIDING EMAIL:
  - make a POST request to http://localhost:3000/api/user/updateUser
  - The POST request should contain all the following fields and the user email of the given user who wants his data to be updated:
        - email (email of the user)
        - password (new password)
        - institution (new institution)
        - firstName (new firstName)
        - lastName (new lastName)

HOW TO GET A USER INFO BY EMAIL:
  - make a POST request to http://localhost:3000/api/user/getUserByEmail
  - The POST request should contain  the following field:
        - email (email of the user)

HOW TO DELETE A USER INFO BY PROVIDING EMAIL:
   - make a POST request to http://localhost:3000/api/user/deleteUser
   - The POST request should contain  the following field:
        - email (email of the user)

HOW TO LOGIN AN USER :
   - make a POST request to http://localhost:3000/api/authentication/login
   - the POST request has to have the following String fields. all fields are required and have the following syntax:
        - email
        - password  
        
HOW TO LOGOUT A USER:
      make a GET request to http://localhost:3000/api/authentication/logout
