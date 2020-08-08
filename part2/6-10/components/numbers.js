import React from 'react'
const Person = ({person}) => (
    <li>{person.name} {person.number}</li>
)
const Numbers = ({perToShow}) => (
    <>
    <h2>Numbers</h2>
    <ul>
      {perToShow.map((person) => <Person key={person.name} person={person}/> )}
    </ul>
    </>
)
export default Numbers
