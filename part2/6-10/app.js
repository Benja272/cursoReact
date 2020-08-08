import React, { useState } from 'react'
import Search from './search'
import Add from './add'
import Numbers from './numbers'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ showAll, setShowAll ] = useState(true);
  const [ perToShow, setPerToShow ] = useState(persons);
  
  function handleSearch(e){
    let res
    if(e.target.value == '' && !showAll){
        setShowAll(true)
        setPerToShow(persons)
        res=true
    }else{
        setShowAll(false)
        res=false
    }
    if(!res){
      setPerToShow(persons.filter(person =>person.name.toLowerCase().startsWith( e.target.value.toLowerCase())))
    } 
  }

  function onSubmit(e){
    e.preventDefault()
    const per = {name: newName, number:newNum}
    let pers = persons.map(per => per.name)
    console.log(pers);
    if(!pers.includes(per.name)){
        setPersons(persons.concat(per))
        setPerToShow(persons.concat(per))
    }else{
        alert(`${per.name} is already added to phonebook`)
    }
    setNewNum('')
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearch={handleSearch}/>
      <Add onSubmit={onSubmit} newName={newName} newNum={newNum} setNewName={setNewName} setNewNum={setNewNum}/>
      <Numbers perToShow={perToShow}/>
    </div>
  )
}

export default App
