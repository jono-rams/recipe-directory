import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// contexts
import { RecipesContext } from '../../context/recipeContext'; 

// components
import RecipeList from '../../components/RecipeList';

// styles
import './Search.css';

export default function Search() {
  const queryString = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(queryString.search), [queryString.search]);
  const [searchTerm, setSearchTerm] = useState(null);
  
  useEffect(() => {
    setSearchTerm(queryParams.get('q'));
  }, [queryParams]);
  
  const latestRecipes = useRef(null);
  const recipes = useContext(RecipesContext);

  useEffect(() => {
    latestRecipes.current = recipes;
  }, [recipes]); 

  const [filteredRecipes, setFilteredRecipes] = useState(null);

  useEffect(() => {
    if (!latestRecipes.current || !searchTerm) return;
    const filtered = latestRecipes.current.filter(recipe => {
      const title = recipe.title.toLowerCase();
      const term = searchTerm.trim().toLowerCase();
      return title.includes(term);
    });
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  return (
    <div>
      <h2 className="page-title">Recipes including "{searchTerm}"</h2>
      {!recipes && <p className="loading">Loading data...</p>}
      {filteredRecipes && filteredRecipes.length === 0 && <p className="error">Error fetching recipes containg term '{searchTerm}'</p>}
      {filteredRecipes && <RecipeList recipes={filteredRecipes} />}
    </div>
  )
}
