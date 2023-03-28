import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

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

  const handlefilterValueChange = (event) => {
    setFilterValue(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const toShow = persons.filter(person => {
    return person.name.toLowerCase().includes(filterValue.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} handleEvent={handlefilterValueChange} />
      <h2>add a new</h2>
      <PersonForm
        nameVal={newName}
        numberVal={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        addHandler={addPerson} />
      <h3>Numbers</h3>
      <Persons toShow={toShow} />
    </div>
  )
}

export default App