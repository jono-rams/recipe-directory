import { RecipesContext } from '../../context/recipeContext'; 
import { useContext } from 'react';

// styles
import './Home.css';

// components
import RecipeList from '../../components/RecipeList';

export default function Home() {
  const recipes = useContext(RecipesContext);

  return (
    <div className='home'>
      {!recipes && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}
