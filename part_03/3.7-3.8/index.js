const http = require('http')
const express = require('express')
const app = express();
const morgan = require('morgan')

app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
// app.use(requestLogger)
morgan.token('body', function getId (req) {
  return `Name: ${req.body.name} Number${req.body.number}`
})

app.use(morgan(':body :method :url :response-time'))

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {

  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${Date()} </p>
  `)
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.delete("/api/persons/:id" , (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end();
})
//start



const generateId = () => {
  return Math.floor(Math.random() * 100000) 
}


app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log("posted tho..")
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  else if (!body.number) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  else if (persons.map(value => value.name).includes(body.name)){
    return response.status(400).json({ 
      error: 'name already in phonebook' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)