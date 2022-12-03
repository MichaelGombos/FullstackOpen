import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
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
const Numbers = ({persons,filter,handler}) => (
  <div>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person key={person.name}firstName={person.name} number={person.number} deletePerson = {handler(person.name)}/>)}
      </ul>
  </div>
)
const Person = ({firstName,number,deletePerson}) => (
      <li>{firstName} {number} 
      {/* {need to find the ID with only the name} */}
      <button onClick={deletePerson}>delete</button></li>   
)


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Starting name')
  const [newNumber, setNewNumber] = useState(1233441222)
  const [filter, setFilter] = useState("");


  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) =>{
    event.preventDefault();
    if(!!persons.find(person => person.name === newName)){
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        let matchPerson = persons.find(person => person.name === newName);
        personService.update(matchPerson.id, {name: newName, number:newNumber}).then(
          response => {
            let changeIndex = persons.findIndex(person => person.name === newName)

            let personsClone = [...persons];
            personsClone[changeIndex] = {
              name: newName,
              number:newNumber,
              id:personsClone[changeIndex].id
            };
            console.log(persons,personsClone)
            setPersons(personsClone);
            console.log(persons,personsClone)
          }
        ).catch(error=>{
          console.log("unable to update person",error)
        })


        
      }
      return;
    }
    let personObject = {name: newName, number:newNumber};
    let newPersonsList = persons.concat(personObject);
    setPersons(newPersonsList);
    console.log(newPersonsList);

    personService.create(personObject)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(response.data))
    })
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

  const deletePerson = name => event => {
    const id = persons.find(p => p.name === name).id
    console.log(persons.find(p => p.name === name));
    console.log(persons.find(p => p.name === name).id)
    console.log("Did we find the name??",name,"and ID??", id)
    personService.remove(id).then( response => {
      setPersons(persons.filter(p => p.id !== id))
    })
    .catch( error => {
      console.log(`issue removing this person on ID ${id}`, error)
    })
  }

  return (
    <div>
      <div>debug: {newName} and {newNumber}</div>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleChange} />

      <Form name={newName} number={newNumber} changeHandler={handleChange}clickHandler={handleSubmit}/>
      <Numbers persons={persons} filter={filter} handler={deletePerson}/>

    </div>
  )
}

export default App