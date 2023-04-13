const Persons = ({ toShow, deleteHandler }) => (
    <>
    {toShow.map((person) => 
        <span key={person.id}>{person.name} {person.number} <button onClick={() => deleteHandler(person)}>delete</button><br/></span> )}
    </>
)

export default Persons