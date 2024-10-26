import { useState,useEffect } from 'react'
import Note from './components/Note'
import noteService from "./services/notes"
import Notification from "./components/notification"
const Footer = () =>{
  const footerStyle = {
    color:'green',
    fontStyle:'italic',
    fontSize:16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Massachusetts</em>
    </div>
  )
}
const App = (props) => {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState("Try entering something")
  const [showAll,setShowAll] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)
  const notesToShow = showAll ? notes: notes.filter(note => note.important === true)
  useEffect(()=>{
    noteService
      .getAll().then(inititalNotes =>{
        setNotes(inititalNotes)
      })
  },[])
  const toggleInprtantof = (id)=>{
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(updateNote => {
        setNotes(notes.map(note => note.id === id ? updateNote : note))
      })
      .catch(error =>{
        setErrorMessage(`Note ${note.content} was alredy removed from the server`)
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
        setNotes(notes.filter(n=> n.id!== id))
      })
  }
  const handleNoteChange = (event) =>{
    setNewNote(event.target.value)
  }
  const addNote = (event) =>{
    event.preventDefault()
    const id = (notes.length +1).toString()
    const newObject = {
      id: id,
      content: newNote,
      important: Math.random()<0.5,
    }
    noteService
      .create(newObject).then(createNote =>{
        setNotes(notes.concat(createNote))
        setNewNote('')
      })
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)} >
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={()=>toggleInprtantof(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App