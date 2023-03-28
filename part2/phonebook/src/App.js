import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons([...persons].concat({
      name: newName,
      number: newNumber,
      id: persons.length + 1}))
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const toShow = persons.filter(person => {
    return person.name.toLowerCase().includes(Filter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={Filter} onChange={handleFilterChange}/></div>
      <form>
        <h2>add a new</h2>
        <div>
          name: <input
                  value={newName}
                  onChange={handleNameChange}/>
        </div>
        <div>number: <input
                        value={newNumber}
                        onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {toShow.map((person) => 
        <span key={person.id}>{person.name} {person.number}<br/></span> )}
    </div>
  )
}

export default App