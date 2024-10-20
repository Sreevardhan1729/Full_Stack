import { useState } from 'react'
import Name from './components/Name'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search,setSearch] = useState('')
  const [show, setShow] =  useState(persons)
  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChnage = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChnage = (event) => {
    const searchTem = event.target.value.toLocaleLowerCase()
    setSearch(searchTem)
    if(event.target.value.length==0){
      setShow(persons)
      return
    }
    const filterPersons = persons.filter(person =>
      person.name.toLocaleLowerCase().startsWith(searchTem)
    )
    setShow(filterPersons)
  }
  const addNote = (event) => {
    event.preventDefault()
    if(newName.length==0 || newNumber.length==0){
      return
    }
    let flag = false
    persons.forEach(person =>{
      if(person.name===newName){
        flag=true
      }
    })
    if(flag===true){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newObject))
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <input  value={search} onChange={handleSearchChnage}/>
      <h2>add a new</h2>
      <form onSubmit={addNote}>
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
      {show.map(person =>
        <Name key= {person.id} name={person.name} number ={person.number}/>
      )}
    </div>
  )
}

export default App