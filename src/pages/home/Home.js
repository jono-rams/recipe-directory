import { useContext } from 'react';

// contexts
import { RecipesContext } from '../../context/RecipeContext'; 

// components
import RecipeList from '../../components/RecipeList';

// styles
import './Home.css';

export default function Home() {
  const recipes = useContext(RecipesContext);

  return (
    <div className='home'>
      {!recipes && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}
