import { useState } from "react"
const App = () => {
  const [left,setLeft] = useState(0)
  const [right,setRight] = useState(0)
  const [AllClicks,setAll] = useState([])  
  const [total,Settotal] = useState(0)
  const handleLeft = () => {
    setAll(AllClicks.concat('L'))
    setLeft(left+1)
    Settotal(total+1)
  }
  const handleRight = () =>{
    setAll(AllClicks.concat('R'))
    setRight(right+1)
    Settotal(total+1)
  }
  return (
    <div>
      {left}
      <button onClick={handleLeft}>left</button>
      <button onClick={handleRight}>right</button>
      {right}
      <p>{AllClicks.join(' ')}</p>
      <p>{total}</p>
    </div>
  )
}
export default App
