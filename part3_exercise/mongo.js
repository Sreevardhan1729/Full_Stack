const mongoose = require('mongoose')
if(process.argv.length<3){
    console.log('Enter the password')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://Sreevardhan:${password}@cluster0.8jj8i.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)
const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const person = mongoose.model('person',phoneSchema)
if(process.argv.length==3){
    person.find({}).then(result => {
        result.forEach(person =>{
            console.log(person)
        })
        mongoose.connection.close()
    })
}
else if(process.argv.length==5){
    const name = process.argv[3]
    const number = process.argv[4]
    const item = new person({
        name:name,
        number:number,
    })
    item.save().then(result =>{
        console.log('item Savevd')
        mongoose.connection.close()
    }).catch(error =>{
        console.log('some error Occoured')
    })
}
else{
    console.log('Enter correct arguents');
    process.exit(1)
}
