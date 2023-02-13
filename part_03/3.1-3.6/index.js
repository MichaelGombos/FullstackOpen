const express = require('express')
const app = express()
app.use(express.json())

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
  response.send('<h1>Big wungus?</h1>')
})

app.get('/api/info', (request, response) => {
  // response.json(persons)
  response.send(`<div>
    <h1>Phonebook has info for ${Object.keys(persons).length} people</h1>
    <p>${new Date()}</p>
  </div>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.send(`<div>
    <h1>${person.name}</h1>
    <p>This person is id:${person.id}</p>
    <p>Their number is ${person.number}</p>
    </div>`)
    response.json(person)
  } else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


const generateId = () => {

  return Math.floor((Math.random() * 10000) + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body.content)

  const nameExists = (persons.map(person => person.name).includes(body.name));
  if (!body) {
    console.log(request);
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  else if(nameExists){
    return response.status(400).json({ 
      error: 'name already exists' 
    })
  }
  else if(!body.name){
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  else if(!body.number){
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const person = {
    name:body.name,
    number:body.number,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})