const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
app.use (express.json ())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body',(req)=> {
  if(req.method == "POST"){
    return JSON.stringify(req.body)
  }
})
let persons = [
    { 
        name: "Arto Hellas", 
        number: "040-123456",
        id: 1
    },
    { 
        name: "Ada Lovelace", 
        number: "39-44-5323523",
        id: 2
    },
    { 
        name: "Dan Abramov", 
        number: "12-43-234345",
        id: 3
    },
    { 
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
        id: 4
    },
    {
        name: "Benja Martinez",
        number: "54-0-19291201",
        id: 5
    }
]

app.get('/info', (req,res) => {
    console.log(res.get('Date'));
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${new Date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(per => per.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)  
    response.status(204).end()
  })

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
  console.log(body);
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
    const pers = persons.map((per)=>per.name)
    if(pers.includes(body.name)){
      return response.status(400).json({ 
        error: 'the name is already added' 
      })
    }
    const person = {
      name: body.name,
      number: body.number,
      id: getRandomInt(10000),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
