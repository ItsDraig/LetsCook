import React, {useState} from 'react'
import PantryForm from './PantryForm'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

function Ingredient({ingredients, finishIngredient, removeIngredient, updateIngredient}
    : {ingredients: any, finishIngredient: any, removeIngredient: any, updateIngredient: any}) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = (value: any) => {
        updateIngredient(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }
    
    if(edit.id) {
        return <PantryForm edit={edit} onSubmit={submitUpdate} />
    }

    return ingredients.map((ingredient: any, index: any) => (
        <div className={ingredient.isFinished ? 'ingredient-row complete' : 
        'ingredient=row'} key={index}>
            <div key={ingredient.id} onClick={() => finishIngredient(ingredient.id)}>
                {ingredient.text}
            </div>
            <div className="icons">
                <RiCloseCircleLine 
                onClick={() => removeIngredient(ingredient.id)}
                className='delete-icon'
                />
                <TiEdit 
                onClick={() => setEdit({ id: ingredient.id, value: ingredient.text})}
                className='edit-icon'/>
            </div>
        </div>

    ))
}

export default Ingredient
