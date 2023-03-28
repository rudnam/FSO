const PersonForm = ( {nameVal, numberVal, nameHandler, numberHandler, addHandler}) => (
    <form>
    <div>
        name: <input
                value={nameVal}
                onChange={nameHandler}/>
    </div>
    <div>number: <input
                    value={numberVal}
                    onChange={numberHandler}/>
    </div>
    <div>
        <button type="submit" onClick={addHandler}>
        add
        </button>
    </div>
    </form>
)

export default PersonForm