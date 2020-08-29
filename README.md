# practice-sails-js

This is the code written while roughly following [Kelvin Omereshone](https://blog.logrocket.com/author/kelvinomereshone/)'s ["Building a Node.js web API with Sails.js"](https://blog.logrocket.com/building-a-node-js-web-api-with-sails-js/) tutorial.

**Note:** The email functionality was replaced with links to the next step being returned directly. This was done to avoid signing up to SendGrid.

Technologies used:

- postgresql: 14.5
- node: 16.19.0
- npm: 8.19.3

## Set up

**This set up assumes you have psql installed on your machine with a postgres database.**

Create a user and database in postgres:

```sql
CREATE USER sails_user WITH ENCRYPTED PASSWORD 'Password123';
CREATEDB sails_user;
```

Install the node application:

```bash
cd user-api
npm i
```

Start the sails server:

```bash
sails lift
```

## Api Requests

**If you're using the [insomnia rest client](https://insomnia.rest/), be sure to import the [insomnia project](https://github.com/Kayra/practice-sails-js/blob/main/docs/practice-sails-insomnia_2022-12-28.json).**

### **GET** Index`/`

Example request:

```bash
curl --request GET \
  --url http://localhost:1337/ 
```

Example response:

```bash
{
	"message": "User API"
}
```

### **POST** User Create `/user/register`

Example request:

```bash
curl --request POST \
  --url http://localhost:1337/user/register \
  --header 'Content-Type: multipart/form-data' \
  --form 'fullName=Test Account' \
  --form email=test@sails.com \
  --form password=Password123
```

Example response:

```bash
{
	"message": "An account has been created for test@sails.com successfully. Visit the confirmation link to verify: http://localhost:1337/user/confirm?token=9aPdq1MsjdeaOY7EWZhXw"
}
```

## **GET** User Confirm `/user/confirm?token=<generated_token>`

Example request:

```bash
curl --request GET \
  --url 'http://localhost:1337/user/confirm?token=LOsyFvyem8kTsQFS7hfChA'
```

Example response:

```bash
{
	"message": "Your account has been confirmed"
}
```

## **POST** User Log In `/user/login`

Example request:

```bash
curl --request POST \
  --url http://localhost:1337/user/login \
  --header 'Content-Type: multipart/form-data' \
  --form email=test@sails.com \
  --form password=Password123
```

Example response:

```bash
{
	"message": "test@sails.com has been logged in",
	"data": {
		"createdAt": 1672230604410,
		"updatedAt": 1672230628740,
		"id": 8,
		"fullName": "Test Account",
		"email": "test@sails.com",
		"emailStatus": "confirmed",
		"accountProofToken": "",
		"accountProofTokenExpiresAt": 0,
		"passwordResetToken": "",
		"passwordResetTokenExpiresAt": 0
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHNhaWxzLmNvbSIsImlzcyI6IlVzZXIgQVBJIiwiaWF0IjoxNjcyMjMwNjM2LCJleHAiOjE2NzIzMTcwMzZ9.BoRYGsDWQLQdod9QHEdCdtQgSH0MJnjSeWVE87KiNPQ"
}
```

## **POST** User Forgot Password `/user/forgot-password`

Example request:

```bash
curl --request POST \
  --url http://localhost:1337/user/forgot-password \
  --header 'Content-Type: multipart/form-data' \
  --form email=test@sails.com
```

Example response:

```bash
{
	"message": "Password reset process has been initiated for test@sails.com. Visit the link to reset the password: http://localhost:1337/user/reset-password?token=nbUnsOnu6reMzPFO3bX4w"
}
```

## **POST** User Reset Password `/user/reset-password?token=<generated_token>`

Example request:

```bash
curl --request POST \
  --url 'http://localhost:1337/user/reset-password?token=mzgPJLJFKQOMfXNepQo9pg' \
  --header 'Content-Type: multipart/form-data' \
  --form password=Password1234
```

Example response:

```bash
{
	"message": "Password reset successful. test@sails.com has been logged in",
	"data": {
		"createdAt": 1672230604410,
		"updatedAt": 1672230644207,
		"id": 8,
		"fullName": "Test Account",
		"email": "test@sails.com",
		"emailStatus": "confirmed",
		"accountProofToken": "",
		"accountProofTokenExpiresAt": 0,
		"passwordResetToken": "nbUnsOnu6reMzPFO3bX4w",
		"passwordResetTokenExpiresAt": 1672317100000
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHNhaWxzLmNvbSIsImlzcyI6IlVzZXIgQVBJIiwiaWF0IjoxNjcyMjMwNjU4LCJleHAiOjE2NzIzMTcwNTh9.M171STVDKs6DRuxzJVH4d2YXkxeYmwAHkMaSD6Y9hiM"
}
```