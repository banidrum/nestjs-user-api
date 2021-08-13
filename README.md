# user-nest-sample

A simple Nest.js user API to apply some Nest.js framework concepts.

## Disclaimer

This API is not meant to be used in production. Use it only as a reference.

## Todos:

* Create user ✔
* Retrieve all users ✔
* Retrieve user by id ✔
* Delete user ✔
* Update user info ✔
* Login ✔
* Add .env file ✔ 
* Add database configuration ✔
* Add migrations
* Add some simple authentication/authorization (JWT) ✔
* Unit testing ✔
* Add Docker to run the application
* Add proper typing
* Add OpenAPI documentation ✔
* Add logging ✔
* Add proper error handling ✔
* Restructure the project when everything is ready ✔

## Stack:

* Node.js version 14
* Nest.js
* Jest
* Docker
* PostgresSQL
* TypeORM

## How to install and run the project

* Requirements:
    * Node.js version 14+
    * NPM

1. Run ```npm install``` to install all the project dependencies

2. To start the application, run ```npm run start```

FYI: Some database configuration may be necessary, I've used my own on this project.

## Running with Docker

* 

## Tests

* Run tests:

    ```bash
    $ npm run test
    ```

* Run tests with coverage:

    ```bash
    $ npm run test:cov
    ```

## Sample requests:

* ### Create user

    ```
    curl --location --request POST 'http://localhost:3000/users' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "firstName": "Sample",
        "lastName": "User",
        "address": "Sample Street",
        "email": "sample@email.com",
        "password": "userpass"
    }'
    ```

* ### Get all users 

    ```
    curl --location --request GET 'http://localhost:3000/users'
    ```

* ### Get user by id

    ```
    curl --location --request GET 'http://localhost:3000/users/8a072a35-4d9a-49ec-ab6f-0517e2791b13
    ```

* ### Update user

    ```
    curl --location --request PUT 'http://localhost:3000/users/id' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsYWJsYUBhLmNvbSIsImlhdCI6MTYyMjUxNzY0NSwiZXhwIjoxNjIyNTE3NzY1fQ.vBIFWQu8K73uJrpbF9-bmNK09nAR16WgAzpW0y8Bepo' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "firstName": "Sample",
        "lastName": "Update",
        "address": "Update Street",
        "email": "update@email.com"
    }'
    ```

* ### Delete user

    ```
    curl --location --request DELETE 'http://localhost:3000/users/8a072a35-4d9a-49ec-ab6f-0517e2791b13' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsYWJsYUBhLmNvbSIsImlhdCI6MTYyMjUxNzY0NSwiZXhwIjoxNjIyNTE3NzY1fQ.vBIFWQu8K73uJrpbF9-bmNK09nAR16WgAzpW0y8Bepo'
    ```

* ### Login

    ```
    curl --location --request POST 'http://localhost:3000/users/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "blabla@a.com",
        "password": "123456"
    }'
    ```

## API documentation

* The documentation is available at [Swagger](http://localhost:3000/swagger) and as a JSON file located at the user-sample-api folder
