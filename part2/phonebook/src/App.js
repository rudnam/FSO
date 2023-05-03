import { useState, useEffect } from 'react'
import Error from './components/Error'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
            setNotifMessage(`Updated ${personToUpdate.name}`)
            setTimeout(() => {
              setNotifMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${personToUpdate.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setPersons(persons.filter(person => person.id !== personToUpdate.id))
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
        setNotifMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
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
        .then(() => {
          setPersons(persons.filter(person => {
            return person.id !== personToDelete.id
          }))
          setNotifMessage(`Deleted ${personToDelete.name}`)
          setTimeout(() => {
            setNotifMessage(null)
          }, 3000)
        })
    }
    
  }

  const toShow = persons.filter(person => {
    return person.name.toLowerCase().includes(filterValue.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <Error message={errorMessage} />
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