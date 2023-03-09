import React, {useState} from 'react'
import Ingredient from './Ingredient';
import PantryForm from './PantryForm'

function Pantry()
{
    const [ingredients, setIngredients] = useState<any[]>([])
    const [edit, setEdit] = useState({ id: null, value: ''})

    const addIngredient = (ingredient: { text: string; }) => {
      if(!ingredient.text || /^\s*$/.test(ingredient.text)) {
        return;
      }

      const newIngredients = [ingredient, ...ingredients];

      setIngredients(newIngredients);
    };


    const updateIngredient = (ingredientId: any, newValue: { text: string; }) => {
      if(!newValue.text || /^\s*$/.test(newValue.text)) {
        return;
      }

      setIngredients(prev => prev.map(item => (item.id === ingredientId ? newValue : item)));
    }


    const removeIngredient = (id: any) => {
      const removeArr = [...ingredients].filter(ingredient => ingredient.id !== id);

      setIngredients(removeArr);
    };

  
    const finishIngredient = (id: any) => {
      let updatedIngredients = ingredients.map(ingredient => {
        if (ingredient.id == id) {
          ingredient.isFinished = !ingredient.isComplete;
        }
        return ingredient;
      });
      setIngredients(updatedIngredients);
    }

    return (
      <div>
        <h2>My Pantry</h2>
        <PantryForm edit={edit} onSubmit={addIngredient}/>
        <Ingredient
        ingredients={ingredients}
        finishIngredient={finishIngredient}
        removeIngredient={removeIngredient} 
        updateIngredient={updateIngredient}/>
      </div>
    )
}

export default Pantry
