import { useState } from 'react'

const StatisticLine = ({text, value}) =>{
  if(text === "Positive"){
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  // return (<p>{text} : {value}</p>)
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

  


const Statistics = ({good,bad,neutral}) => 
{
  if(good == 0 && bad == 0 && neutral == 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="All" value={bad + good + neutral}/>
        <StatisticLine text="Average" value={((bad * -1) + good)/ (bad+good+neutral)}/>
        <StatisticLine text="Positive" value={good / (good + bad + neutral) * 100}/>
    </table>
  )
}

const Button = ({handleClick, text}) =>(
  <button onClick={handleClick}>{text}</button>
)



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={()=> setGood(good+1)} text="Good"/>
      <Button handleClick={()=> setNeutral(neutral+1)} text="Neutral"/>
      <Button handleClick={()=> setBad(bad+1)} text="Bad"/>

      <Statistics good={good} neutral={neutral} bad ={bad}/>

    </div>

  )
}

export default App