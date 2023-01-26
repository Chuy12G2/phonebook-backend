require('dotenv').config()
const mongoose  = require('mongoose');

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('CONNECTING TO', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to mongoDB (models)')
    })
    .catch(error => {
        console.log('error connecting to mongoDB (models)', error.message)
    })

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    phone:{
        type: String,
        minLength: 3,
        required: true,
    }, 
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports.Person = mongoose.model('Person', personSchema)