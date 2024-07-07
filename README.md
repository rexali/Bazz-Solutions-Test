# Bazz Solutions Test

1. Clone the repository

2. Run: npm install

3. Create a MYSQL database named "bazzdb" and a table with username, email and password as columns

3. Then run: npm start 

4. use Postman
   1. GET http://localhost:3001/jwt 
   2. POST http://localhost:3001/auth/register
   3. POST http://localhost:3001/auth/login

5. Curl commands:

    1. To get jwtoken as soon as user load the page to protect routes and validate the JWT token.
      Run:  curl --request GET http://localhost:3001/jwt 

    2. To rgister a user, 
      Run:  curl -d '{"username": "admin","email": "admin@bazzsolutions.com","password": "bazzsolution001"}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X POST http://localhost:3001/auth/register

    3. To log in and verify a user,
      Run:  curl -d '{"email": "admin@bazzsolutions.com","password": "bazzsolution001"}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X POST http://localhost:3001/auth/login

    4. To get an admin user profile,
      Run:  curl -d '{"userId": 1}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X GET http://localhost:3001/profile/me

    5. To get an admin user profile,
      Run:  curl -d '{"userId": 1, "email":"admin@bazzsolutions.com", "date_of_birth":"6/7/1960", "permanent_address":"28 Enyinare Quarters, Okene, Kogi State", "present_address":"463 N-Tsakiya, Kumbotso, Kano State", "city":"Kano", "postal_code":"70001", "country":"Nigeria"}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X PATCH http://localhost:3001/profile/me
      

                  