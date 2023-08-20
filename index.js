// Import required modules
require('dotenv').config();
const Person = require('./models/person');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:', request.path);
  console.log('Body:', request.body);
  console.log('---');
  next();
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// Use middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static('build'));

// Define custom morgan token for logging request body data
morgan.token('bodyData', (request, response) => {
  return JSON.stringify(request.body);
});
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :bodyData'
  )
);

// Get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

// Get information about the phonebook
app.get('/info', async (request, response) => {
  try {
    const count = await Person.countDocuments();
    response.send(
      `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`
    );
  } catch (err) {
    console.log('Error', err);
  }
});

// Get a single person by ID
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  // Find one document with that specific _id and send it back to client as json object
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Delete a person by ID
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log(`deleted ${result.name} with id ${id}`);
      return response.status(204).end();
    })
    .catch((error) => next(error));
});

// Add a new person
app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: 'Name or number is missing',
    });
  }
  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .then(console.log(`added ${name} and ${number}`));
});

//Update an existing person
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  const { name, number } = request.body;
  // Check that the body contains all required fields before updating anything!
  if (!name || !number) {
    return response.status(400).json({
      error: 'Name or number is missing',
    });
  }

  const person = {
    name,
    number,
  };

  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

// Set the port
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
