const express = require('express')
const app = express()

require('dotenv').config()
const Person = require('./models/person')



let persons = [
]
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  const errorHandler = (error,request,response,next) => {
    console.error(error.message)
    if(error.name=='CastError'){
      return response.status(400).send({error : 'malformatted id'})
    }
    next(error)
  }


  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
app.get('/api/persons',(request,response) => {
    Person.find({}).then(result =>{
        response.json(result)
    })
})
app.get('/info',(request,response) =>{
    Person.find({}).then(result => {
      response.send(`<div>
          <p>${result.length}</p>
          <p>${new Date()}</p>
        </div>`)
    })
})
app.get('/api/persons/:id',(request,response) =>{
    Person.findById(request.params.id).then(person =>{
      response.json(person)
    })
})
app.delete('/api/persons/:id',(request,response,next) => {
    Person.findByIdAndDelete(request.params.id).then(result =>{
      response.status(200).end()
    })
    .catch(error =>next(error))
})
app.post('/api/persons',(request,response) =>{
   const body = request.body
   if(body.name==undefined || body.number ==undefined){
    return response.status(404).json({error: 'name or number is missing'})
   }
   const person = new Person({
    name:body.name,
    number: body.number
   })
   person.save().then(result =>{
    response.json(result)
   })
})
app.use(errorHandler)
app.use(unknownEndpoint)
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Listining to port : ${PORT}`)
})