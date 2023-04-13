import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        PersonService
          .update(personToUpdate.id, {...personToUpdate, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    PersonService
      .create({
        name: newName,
        number: newNumber,
        id: persons.length + 1})
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

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

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      PersonService
        .deletePerson(personToDelete.id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => {
            return person.id !== personToDelete.id
          }))
        })
    }
    
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
      <Persons
        toShow={toShow}
        deleteHandler={deletePerson}/>
    </div>
  )
}

export default App