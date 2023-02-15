import './App.css';
import { useState, useEffect } from 'react';

import RecipeCard from './RecipeCard'
import SearchIcon from './search.svg'
import Pantry from './components/Pantry';

const API_URL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=eec512c1c7924522aa6a293a7a73a893'

const recipe = {
    "id": 654857,
    "title": "Pasta On The Border",
    "image": "https://spoonacular.com/recipeImages/654857-312x231.jpg",
    "imageType": "jpg",
    "nutrition": {
        "nutrients": [
            {
                "name": "Fat",
                "amount": 19.8995,
                "unit": "g"
            }
        ]
    }
}

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchRecipes = async (title: string) => { 
    const response = await fetch(`${API_URL}&query=${title}`);
    const data = await response.json();

    setRecipes(data.results);
  }

  useEffect(() => {
    searchRecipes('pasta&maxFat=25');
  }, []);

  return (
    <div className="app">
      <h1>Lets Cook!</h1>

      <div className="pantry">
        <Pantry />
      </div>

      <div className="search">
        <input
          placeholder="Search for recipes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchRecipes(searchTerm)}
        />
      </div>

      {recipes?.length > 0
        ? (
          <div className="container">
            {recipes.map((recipe) => (
              <RecipeCard recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No recipes found</h2>
          </div>
        )}  
    </div>
  );
}

export default App;