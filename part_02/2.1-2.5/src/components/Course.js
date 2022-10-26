const Header = (props) => {
  return(
      <h1>{props.course}</h1>
  )
}

const Content = ({parts}) => {
  return(
    <ul>
      {parts.map(part => <Part part={part}/>)}
    </ul>
  )
}

const Part = ({part}) =>{
  return(
    <li key={part.id}>
      {part.name} {part.exercise}
    </li>
  )
}

const Total = (props) => {
  return(
    <strong>
      <p>Total of {props.parts.reduce((total,current) => total += current.exercises, 0)} exercises</p>
    </strong>

  )
}

const Course = ({course}) => {
  console.log(course)
  return (
    <div key={course.id}>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </div>
  )
}

export default Course