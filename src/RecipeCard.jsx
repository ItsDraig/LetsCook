import React from 'react';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe">
          <div>
            <p>{recipe.title}</p>
          </div>

          <div>
            <img src={recipe.image !== 'N/A' ? recipe.image : 'https://via.placeholder.com/400'} alt={recipe.title}/>
          </div>

          <div>
            <span>{recipe.title}</span>
            <h3>{recipe.title}</h3>
          </div>
        </div>
    );
}

export default RecipeCard;