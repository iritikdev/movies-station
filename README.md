# movies-station

Movies-Station is a movie rental API built using Node.js. It allows users to browse and rent movies from a wide selection of movies. The API provides a variety of endpoints to manage user accounts, search for movies, add movies to a user's rental queue, and handle rental transactions.

To set up the Movies-Station project locally, you will need to follow these steps:

**Install Node.js:** If you haven't already, you will need to install Node.js on your local machine. You can download and install the latest version from the official website.

**Clone the repository:** Next, you will need to clone the Movies-Station project repository from Github to your local machine. You can do this by running the following command in your terminal or command prompt:

**bash**

```
git clone https://github.com/iritikdev/movies-station.git
```

**Install dependencies**: Once you have cloned the repository, navigate to the project directory in your terminal or command prompt and run the following command to install the project dependencies:

```
npm install
```

**Set up environment variables:** The Movies-Station project requires certain environment variables to be set up in order to run. Create a .env file in the project directory and add the following variables:

**makefile**

```
PORT = 8000
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here
```

Replace your_database_url_here with the URL of your MongoDB database and your_jwt_secret_here with a secret string of your choice.

**Start the server:** Finally, you can start the Movies-Station server by running the following command in your terminal or command prompt:

```
npm start
```

The server should start running at http://localhost:8000. You can test the API by making requests to the endpoints using tools like Postman or curl.

Here is an example documentation for testing the Movies-Station API endpoints without response:

# /api/genres

`GET /api/genres`

Returns a list of all movie genres.

Request:

bash

```
GET /api/genres
```

`POST /api/genres`

Creates a new movie genre.

Request:

bash

```
POST /api/genres
Content-Type: application/json

{
  "name": "Comedy"
}
```

# /api/customers

`GET /api/customers`

Returns a list of all customers.

Request:

bash

```
GET /api/customers
```

`POST /api/customers`

Creates a new customer.

Request:

```
POST /api/customers
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "1234567890",
  "isGold": true
}
```
