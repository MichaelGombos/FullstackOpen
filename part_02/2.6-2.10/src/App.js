import { useState } from 'react'

const Filter = ({value,handler}) => (
  <div>
      filter name shown with <input value={value} onChange={handler("filter")}></input>
  </div>
)

const Form = ({name,number,changeHandler,clickHandler}) => (
    <form>
      <div>
        name: <input value={name} onChange={changeHandler("name")}/>
        number: <input value={number} onChange={changeHandler("number")}/>
      </div>
      <div>
        <button type="submit" onClick={clickHandler}>add</button>
      </div>
    </form>
)
const Numbers = ({persons,filter}) => (
  <div>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person key={person.name}firstName={person.name} number={person.number}/>)}
      </ul>
  </div>
)
const Person = ({firstName,number}) => (
    <li>{firstName} {number}</li>
)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('Starting name')
  const [newNumber, setNewNumber] = useState(1233441222)
  const [filter, setFilter] = useState("");

  const handleSubmit = (event) =>{
    event.preventDefault();
    if(!!persons.find(person => person.name === newName)){
      alert(`${newName} is already in the numbers list`);
      return;
    }

    let newPersonsList = persons.concat({name: newName, number:newNumber});
    setPersons(newPersonsList);
    console.log(newPersonsList);
  }

  const handleChange = (value) => (event) => {
    if(value === "name"){
      setNewName(event.target.value);
      console.log(newName);
    }
    else if(value === "number"){
      setNewNumber(event.target.value);
      console.log(newNumber);
    }
    else if(value === "filter"){
      setFilter(event.target.value);
      console.log(filter);
    }
    else{
      alert("invalid value");
    }

  }

  return (
    <div>
      <div>debug: {newName} and {newNumber}</div>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleChange} />

      <Form name={newName} number={newNumber} changeHandler={handleChange}clickHandler={handleSubmit}/>
      <Numbers persons={persons} filter={filter}/>

    </div>
  )
}

export default App