# Fullstack PhoneBook Application
Link: https://phonebook-6575.onrender.com/

The code defines a RESTful API using Express.js for a phonebook application. It includes routes for getting all persons, getting a single person by ID, deleting a person by ID, and adding a new person. The API also includes middleware for handling CORS, parsing JSON, serving static files, and logging requests.

Example Usage
// start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// get all persons
app.get('/api/persons', (request, response) => {
  response.json(data);
});

// get a single person by ID
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// delete a person by ID
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((person) => person.id !== id);
  response.status(204).end();
});

// add a new person
app.post('/api/persons', (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: 'content missing',
    });
  }
  const name = data.find((person) => person.name === request.body.name);
  if (name) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: Math.floor(Math.random() * 1000000),
    name: request.body.name,
    number: request.body.number,
  };
  data = [...data, person];
  data.sort((a, b) => a.id - b.id);
  response.json(person);
});
Full Explanation
This code defines a RESTful API using Express.js for a phonebook application. The API includes the following routes:

GET /api/persons: Returns a JSON array of all persons in the phonebook.
GET /api/persons/:id: Returns a JSON object for the person with the specified ID.
DELETE /api/persons/:id: Deletes the person with the specified ID.
POST /api/persons: Adds a new person to the phonebook.
The API also includes middleware for handling CORS, parsing JSON, serving static files, and logging requests. The data variable is an array of objects representing the persons in the phonebook. Each object has an id, name, and number property.

The GET /info route returns a simple HTML page with information about the number of persons in the phonebook and the current date.

The POST /api/persons route checks that the request body contains name and number properties, and that the name property is unique. If these conditions are met, a new person object is created with a random id property, and added to the data array. The data array is then sorted by id. The new person object is returned as a JSON response.

The DELETE /api/persons/:id route deletes the person with the specified id from the data array using the filter method. The response status is set to 204 (No Content).

The GET /api/persons/:id route finds the person with the specified id in the data array using the find method. If the person is found, it is returned as a JSON response. Otherwise, the response status is set to 404 (Not Found).

The GET /api/persons route simply returns the data array as a JSON response.

The middleware includes:

cors: Enables Cross-Origin Resource Sharing (CORS) for the API.
express.json: Parses JSON request bodies.
express.static: Serves static files from the build directory.
morgan: Logs HTTP requests using the Apache combined log format. The :bodyData token is defined to log the request body as JSON.
