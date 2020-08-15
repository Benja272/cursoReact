import React from 'react'

const Person = ({person,handleButton}) => (
    <li id={person.name}>{person.name} {person.number}
      <button onClick={handleButton}>delete</button>
    </li>
)
const Numbers = ({perToShow,handleButton}) => (
    <>
    <h2>Numbers</h2>
    <ul>
      {perToShow.map((person) => <Person key={person.name} person={person} handleButton={handleButton}/> )}
    </ul>
    </>
)
export default Numbers