import { useState,useEffect } from 'react'
import Name from './components/Name'
import personSerices from './services/persons'
import Notification from './components/notification'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search,setSearch] = useState('')
  const [show, setShow] =  useState([])
  const [message,setMessage] = useState(null)
  const [col, setCol] = useState(null)
  var prev = persons.length>0 ? parseInt(persons[persons.length -1].id)+1 :1
  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }
  
  useEffect(()=>{
    personSerices.getAll().then(initalPersons =>{
      setPersons(initalPersons)
    })
  },[])

  const handleNumberChnage = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChnage = (event) => {
    const searchTem = event.target.value.toLocaleLowerCase()
    setSearch(searchTem)
    if(event.target.value.length==0){
      setShow([])
      return
    }
    const filterPersons = persons.filter(person =>
      person.name.toLocaleLowerCase().startsWith(searchTem)
    )
    setShow(filterPersons)
  }
  const addInfo = (event) => {
    event.preventDefault()
    if(newName.length==0 || newNumber.length==0){
      return
    }
    const info = persons.find(person => person.name===newName)
    if(typeof(info)!="undefined"){
      if(window.confirm(`${newName} is already  added to phonebook, replace the old number with a new one?`)){
        const newInfo = {...info,number:newNumber}
        personSerices.update(info.id,newInfo).then(updateInfo =>{
          setPersons(persons.map(person => person.id==info.id ? updateInfo: person))
        })
        setMessage(`${info.name}'s number updated`)
        setCol("green")
        setInterval(()=>{
          setMessage(null)
          setCol(null)
        },5000)
        setNewName('')
        setNewNumber('')
      }
      return
    }
    const id = prev.toString()
    const newObject = {
      name: newName,
      number: newNumber,
      id: id
    }
    personSerices.create(newObject).then(createInfo =>{
      setPersons(persons.concat(createInfo))
      setMessage(`${createInfo.name} has been added`)
      setCol("green")
      setInterval(()=>{
        setMessage(null)
        setCol(null)
      },5000)
      prev+=1;
    })
    setNewName('')
    setNewNumber('')
  }
  const deleteInfo = (person) =>{
    if(window.confirm(`Delete ${person.name}?`)){
      personSerices.remove(person.id).then(info =>{
        setPersons(persons.filter(person => person.id!==info.id))
      })
      .catch(error => {
        setMessage(`Informatin of ${person.name} has alredy been removed`)
        setCol("red")
        setInterval(()=>{
          setMessage(null)
          setCol(null)
        },5000)
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} col={col} />
      <input  value={search} onChange={handleSearchChnage}/>
      {show.map(person =>
        <Name key= {person.id} name={person.name} number ={person.number}/>
      )}
      <h2>add a new</h2>
      <form onSubmit={addInfo}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
          <br />
          number: <input value={newNumber} onChange={handleNumberChnage} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Name key= {person.id} name={person.name} number ={person.number} deleteInfo={()=>deleteInfo(person)}/>
      )}
    </div>
  )
}

export default App