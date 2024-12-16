const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URL
console.log("Connecting to databse")
mongoose.connect(url).then(result =>{
    console.log('Connedted to MongoDB')
}).catch(error => {
    console.log('error connecting MongoDB ',error.message)
})
const phoneSchema = new mongoose.Schema({
    name:String,
    number: String
})
phoneSchema.set('toJSON', {
    transform: (document,returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Person',phoneSchema)