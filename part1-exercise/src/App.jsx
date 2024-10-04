import { useState } from "react";
const Button = (props) =>{
  return (
    <button onClick={props.handelClick}>{props.text}</button>
  )
}
const Display = (props) =>{
  return (
    <div>
      {props.text} {props.count}
    </div>
  )
}
const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if(total!=0){
    return (
      <div>
        <Display text="Good" count={good}/>
        <Display text="Neutral" count={neutral}/>
        <Display text="Bad" count={bad}/>
        <Display text="All" count={total}/>
        <Display text="Average" count={average}/>
        <Display text="Positive" count={positive}/>
      </div>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}
const App = () => {
  const [good,setGood] = useState(0)
  const [bad,setBad] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [total,setTotal] = useState(0)
  const [average,setAverage] = useState(0)
  const [positive,setPositive] = useState(0)
  const incGood = () => {
    const update = good+1
    setGood(update)
    const tot = update+bad+neutral
    setTotal(tot)
    setAverage((update-bad)/tot)
    setPositive(update/tot)
  }
  const incBad = () =>{
    const update = bad+1
    setBad(update)
    const tot = (update+good+neutral)
    setTotal(tot)
    setAverage((good-update)/tot)
    setPositive(good/tot)
  }
  const incNetural = () =>{
    const update = neutral+1
    setNeutral(update)
    const tot = (update+bad+good)
    setTotal(tot)
    setAverage((good-bad)/tot)
    setPositive(good/tot)
  }
  return (
    <div>
      <Button handelClick = {incGood} text="Good" />
      <Button handelClick = {incNetural} text="Neutral" />
      <Button handelClick = {incBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}
export default App