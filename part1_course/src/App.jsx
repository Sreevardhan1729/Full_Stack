import { useState } from "react"
const Button = ({onClick,text}) => {
  return(
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}
const App = (props) => {
  const [counter,setCounter] = useState(0)
  const add = () => setCounter(counter+1)
  const reset = () => setCounter(0)
  const remove = () => setCounter(counter-1);
  return (
    <>
      <div>{counter}</div>
      <Button onClick={add} text = "plus"/>
      <Button onClick={reset} text = "reset"/>
      <Button onClick={remove} text = "remove"/>
    </>
  )
}
export default App
