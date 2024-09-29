// contexts
import { useRecipe } from '../../hooks/useRecipe';

// components
import RecipeList from '../../components/RecipeList';

// styles
import './Home.css';

export default function Home() {
  const recipes = useRecipe();

  return (
    <div className='home'>
      {!recipes && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}
