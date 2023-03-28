const Persons = ({ toShow }) => (
    <>
    {toShow.map((person) => 
        <span key={person.id}>{person.name} {person.number}<br/></span> )}
    </>
)

export default Persons