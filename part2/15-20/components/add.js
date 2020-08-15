import React from 'react'
const Add = ({onSubmit,newName,newNum,setNewName,setNewNum}) => (
    <form onSubmit={onSubmit}>
        <h1>add a new</h1>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>number: <input value={newNum} onChange={(event)=> setNewNum(event.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)
export default Add
