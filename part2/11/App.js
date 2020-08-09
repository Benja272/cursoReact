import React,{useEffect,useState} from 'react';
import axios from 'axios'

const Person = (props) => {
  let name = props.name 
  let number = props.number
  let id = props.id
  return(
    <>
      <li>{name} {number} ID:{id} </li>
    </>
  )
}
function App() {
  const [persons,setPersons] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
    console.log(response)
    setPersons(response.data)
    })
  }
,[])


  return (
    <div>
      <ul>
        {persons.map(person => <Person key={person.id} name={person.name} number= {person.number} id={person.id}/>)}
      </ul>
    </div>
  );
}

export default App;
