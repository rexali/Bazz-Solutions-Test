# Bazz Solutions Test

1. Clone this repository: https://github.com/rexali/Bazz-Solutions-Test.git 

2. Run in your command terminal: 'cd Bazz-Solutions-Test'

3. Run: npm install

4. Create a MYSQL
   1. database named "bazzdb",
   2. table named 'users' table with columns: username, email (this should be unique)  and password as columns,
   3. table named 'profile' for an admin profile with columns: username, email, date_of_birth, permanent_address, current_address, city, country, zip_code

5. Add new .env file to root folder and then add the following configuration:
  
    1. DB_HOST=localhost
    2. DB_PORT= <your database port>  // your database port
    3. DB_USER= <your database username> // your database username
    4. DB_PASS= <your database password> your database password
    5. DB_NAME= bazzdb
    6. SECRET_KEY=asdfghjkil

6. Then run: npm start 


7. Curl Commands:

    1. To get jwtoken as soon as user load the page to protect routes and validate the JWT token.
      Run:  ***curl --request GET http://localhost:3001/jwt*** 

    2. To rgister a user using the jwtoken as a pass in request headers, 
      Run:  ***curl -d '{"username": "admin","email": "admin@bazzsolutions.com","password": "bazzsolution001"}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X POST http://localhost:3001/register***

    3. To log in and verify a user using the same jwtoken pass in request headers;
      Run:  ***curl -d '{"email": "admin@bazzsolutions.com","password": "bazzsolution001"}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X POST http://localhost:3001/login***

    4. To get an admin user profile using the same jwtoken pass in request headers,
      Run:  ***curl -d '{"userId": 1}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X GET http://localhost:3001/me***

    5. To update an admin user profile using the same jwtoken pass in request headers and the login token in body to verify if admin has a right to update the profile,
      Run:  ***curl -d '{"userId": 1, "email":"admin@bazzsolutions.com", "date_of_birth":"6/7/1960", "permanent_address":"28 Enyinare Quarters, Okene, Kogi State", "present_address":"463 N-Tsakiya, Kumbotso, Kano State", "city":"Kano", "postal_code":"70001", "country":"Nigeria", token:}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X PATCH http://localhost:3001/me***


# OR USE
    
8. use Postman and use the headers and body data below in the cURL Commands or in the documentation below:
   1. GET http://localhost:3001/jwt 
   2. POST http://localhost:3001/auth/register
   3. POST http://localhost:3001/auth/login
   4. GET http://localhost:3001/profile/me
   5. PATCH http://localhost:3001/profile/me



# Test: Unit Test

  1. Note: Before you run the test make sure you stop the server
  2. Then in your command terminal: npm test


# Endpoint Documentation : Bazz Solutions Test Endpoints

GET '/jwt'

- Fetches a jsonwebtoken at the first time a user loads the application and use it to secure all other routes below.

- Request Arguments: None

- Request Headers: None

- Request Body: None

- Returns: an object with a single key e.g.

{    
    status: "success", 
    message: "token created", 
    data: 
    {
      jwtoken:a string of JsonWebToken 
    }  
}


POST '/register'

- Sends a post request in order to register a user in this case admin

- Request Headers:
 {
    “Authorization: Bearer <JWT_TOKEN>”,    
    “Content-Type: application/json”
}

- Request Body: 
{
    'username': a string which is an admin user name,
    'email': a string which is an email,
    ‘password’: a string which is a password
 }

- Returns: an object of multiple keys e.g.,
{
    status: a string e.g, "success", 
    message: a string e.g, "registration successful", 
    data: json object e.g, registraton data
}

POST '/login'

- Sends a post request in order to login a user which is an admin

- Request Headers:
 {
    “Authorization: Bearer <JWT_TOKEN>”,    
    “Content-Type: application/json”
}

- Request Body: 
{
    'email': a string which is an email,
    ‘password’: a string which is a password
 }

- Returns: a single an object of success 
{
    status: "success", 
    message: "Logged in successful", 
    data: json object
}


GET '/me'

- Fetches an admin profile in which the keys are the ID and the value is the corresponding integer of the profile

- Request Arguments: None

- Request Headers:
 {
  “Authorization: Bearer <JWT_TOKEN>”,    
  “Content-Type: application/json”
}

- Request Body: 
{
    ‘userId’: an integer number which is the admin   profile’s userId
    'username' : a string,
    'email' : a string 
    'date_of_birth’: a string of date
    ‘permanent_address’: a string,
    ‘present_address’: a string, 
    ‘city’: a string, 
    ‘postal_code’:a string,
    ‘country’: a string,

}

- Returns: An object with with multiple key e.g.,
{

    status: "success", 
    message: "token created", 
    data: json object e.g.,
    'username' : a string 
    'email' : a string 
    'date_of_birth’: a string of date
    ‘permanent_address’: a string,
    ‘present_address’: a string, 
    ‘city’: a string, 
    ‘postal_code’:a string,
    ‘country’: a string
}


PATCH '/profile/me'

- Sends an admin profile data with multiple keys in order to update or patch some of the data in admin profile.

- Request Arguments: None

- Request Headers:
 {
   “Authorization: Bearer <JWT_TOKEN>”,    
   “Content-Type: application/json”
}

- Request Body: 
{
    ‘userId’: an integer number which is the admin   profile’s userId
    'token': a string
    'username' : a string 
    'email' : a string 
    'date_of_birth’: a string of date
    ‘permanent_address’: a string,
    ‘present_address’: a string, 
    ‘city’: a string, 
    ‘postal_code’:a string,
    ‘country’: a string
}

- Returns: An object with with a multiple key e.g.,
{

    status: a string, e.g,"success", 
    message: a string, e.g, "profile updated" 
    data: a json object, e.g, admin profile data
}




      

                  
