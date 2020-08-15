import React, { useState, useEffect } from 'react'
import Search from './search'
import Add from './add'
import Numbers from './numbers'
import services from './../services/server'
import Mensage from './mensage'
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ showAll, setShowAll ] = useState(true);
  const [ perToShow, setPerToShow ] = useState(persons);
  const [ iD, setiD ] = useState(1);
  const [ mensage, setMensage ] = useState("");
  const [ error, setError ] = useState(false);
  const proxID = (data)=>{
    let i=1
    data = data.map(per => parseInt(per.id))
    while(data.includes(i)){
      i++
    }
    return(i)
  }
  useEffect(() =>{
    services.get().then(data => {
      setPersons(data)
      setPerToShow(data)
      setiD(proxID(data))
    }
    )
  },[])
  function handleButton(e){
    const nombre = e.target.parentNode.id
    e.preventDefault()
    if(window.confirm("delete "+nombre+ "?")){
      const per = persons.find((person)=> person.name === nombre)
      const pers = persons.filter((person) => person.name != per.name)
      setPersons(pers)
      setPerToShow(pers)
      setiD(proxID(pers))
      services.elim(per).catch(error => {
        setMensage(`Information of ${per.name} has already been removed from server`)
        setError(true)
        setTimeout(()=>{
          setMensage("")
          setError(false)
        },5000)
        console.log("fail to elim",error)
      })
    }
  }
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
    let pers = persons.map(perso => perso.name)
    let per = {id:iD,name: newName, number:newNum}
    if(!pers.includes(per.name)){
          services.adder(per).then(()=>{
          setPersons(persons.concat(per))
          setPerToShow(persons.concat(per))
          setiD(proxID(persons.concat(per)))
          setMensage(`Added ${per.name}`)
          setTimeout(()=>{
            setMensage("")
          },5000)
        }
        )
    }else{
          per = persons.find((per)=> per.name === newName)
          per.number = newNum
          if(window.confirm(per.name +" is already added to phonebook, remplace the old number with a new one?")){
          services.actualizar(per).then((response)=> {
            setPerToShow(persons.map(note => note.id !== per.id ? note : per))
            setPersons(persons.map(note => note.id !== per.id ? note : per))
            setMensage(`Changed ${per.name}'s number`)
            setTimeout(()=>{
              setMensage("")
            },5000)
            }
          )
        }
    }
    setNewNum('')
    setNewName('')
  }
  return (
    <div>
    <h2>Phonebook</h2>
      <Mensage mensage = {mensage} error = {error}/>
      <Search handleSearch={handleSearch}/>
      <Add onSubmit={onSubmit} newName={newName} newNum={newNum} setNewName={setNewName} setNewNum={setNewNum}/>
      <Numbers perToShow={perToShow} handleButton={handleButton}/>
    </div>
  )
}

export default App