require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const { Person } = require('./models/person')

//const morgan = require('morgan')

const url = process.env.MONGODB_URI  

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => {
        console.log('connected to mongoDB (index)')
        // const person = new Person({
        //     name: 'Dan Abramov',
        //     phone: '12-43-234345'
        // })
        // person.save().then(result => {
        //     console.log('person saved')
        //     mongoose.connection.close()
        // })

        // Person.find({}).then(e => {
        //     console.log(e)
        // })

    })
    .catch(error => {
        console.log('error connecting to mongoDB', error.message)
    })


// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

//app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    }) 
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        res.json(person)
    })

    
    // if(person){
    //     res.json(person)
    // }else{
    //     res.statusMessage = "Person not found"
    //     res.status(404).end()
    // }
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
    
    // if(!body.name || !body.phone){
    //     return res.status(400).json({
    //         error: 'content missing'
    //     })
    // }

    // if(persons.find(p => p.name === body.name)){
    //     return res.status(400).json({
    //         error: `${body.name} already exist`
    //     })
    // }

    // persons.concat(newPerson)
    if(body.name === undefined || body.phone === undefined){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const newPerson = new Person({
        name: body.name,
        phone: body.phone,
    })

    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
