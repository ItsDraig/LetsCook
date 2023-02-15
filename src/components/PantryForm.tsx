import React, {useState, useEffect, useRef } from 'react'

function PantryForm(props: {
        edit: { 
            value: any; 
        };
        onSubmit: (arg0: {
            id: number; // generates a random number 
            text: any;
        }) => void;
    }) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef<any>(null);

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = (e: { target: { value: any; }; }) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000), // generates a random number 
            text: input 
        });

        setInput('');
    };

    return (
        <form className="pantry-form" onSubmit={handleSubmit}>
            {props.edit ? ( 
                <>
                <input type="text" placeholder="Update Your Item" value={input} name="text" className="pantry-input edit" onChange={handleChange} ref={inputRef}/>
            <button className="pantry-button edit">Update Item</button> </>
             ) : (
                <>
                <input type="text" placeholder="Add an Item" value={input} name="text" className="pantry-input" onChange={handleChange} ref={inputRef}/>
            <button className="pantry-button">Add Item</button>
            </> 
            )}     
        </form>
    );
}

export default PantryForm;
