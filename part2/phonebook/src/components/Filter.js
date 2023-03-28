const Filter = ( {value, handleEvent} ) => (
    <div>
        filter shown with <input value={value} onChange={handleEvent}/>
    </div>
)

export default Filter