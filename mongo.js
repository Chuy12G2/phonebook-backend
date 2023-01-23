const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

if(process.argv.length < 3){
    console.log("Something is missing")
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]



const url = `mongodb+srv://phonebook:${password}@cluster0.qleosba.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: 'String',
    phone: 'String'
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
    mongoose
        .connect(url)
        .then((result) => {
            Person.find({}).then(result => {
                result.forEach(person => {
                    console.log(person)
                })
                mongoose.connection.close()
            })
        })   
}
else if(process.argv[3] && process.argv[4]){
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')

        const person = new Person({
            name: name,
            phone: phone
        })

        return person.save()
    })
    .then(() => {
        console.log('person saved')
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

