const express = require('express')
const app = express()

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

app.use(express.json())

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    
    if(person){
        res.json(person)
    }else{
        res.statusMessage = "Person not found"
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end() 
})

const generateId = () => {
    const maxId = persons.length > 0 
        ? Math.max(...persons.map(p => p.id))
        : 0

        return maxId + 1
}

app.post('/api/persons', (req, res) => {
    
    const body = req.body
    console.log(body)

    if(!body.name || !body.phone){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    if(persons.find(p => p.name === body.name)){
        return res.status(400).json({
            error: `${body.name} already exist`
        })
    }



    const newPerson = {
        name: body.name,
        phone: body.phone,
        id: generateId(),
    }

    persons.concat(newPerson)

    res.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})