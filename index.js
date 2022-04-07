const express = require("express");
const app = express();
const currentDate = new Date();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send(`<h1>Hello World</h1>`);
});

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p> <br>
  ${currentDate}`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.sendStatus(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.sendStatus(204).end();
});

const generateId = (max) => {
  return Math.floor(Math.random() * max)
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name == "") {
    return response.status(400).json({
      error: "name is missing",
    });
  }

  if (body.number == "") {
    return response.status(400).json({
      error: "number is missing",
    });
  }

  for (let i = 0; i < persons.length; i++) {
    if (body.name === persons[i].name) {
      return response.status(400).json({
        error: "person already posted",
      });
    }
  }

  const person = {
    id: generateId(999),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});
