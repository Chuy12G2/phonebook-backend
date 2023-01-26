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
    })
    .catch(error => {
        console.log('error connecting to mongoDB', error.message)
    })


//app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const errorHandler = (error, req, res, next) => {
    console.error(error.name)
    if(error.name === 'CastError'){
        return res.status(404).send({ error: 'malformed id'})
    }else if(error.name === 'ValidationError'){
        return res.status(400).json({error: error.message})
    }
    next(error)
}

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
        if(person){
            res.json(person)
        }else{
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (req, res) => {
    
    const body = req.body
    
    const newPerson = new Person({
        name: body.name,
        phone: body.phone,
    })

    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
    })

})

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
