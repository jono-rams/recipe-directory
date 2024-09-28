import { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { DbContext } from '../../dbContext';

// styles
import './Home.css';

// components
import RecipeList from '../../components/RecipeList';

export default function Home() {
  // Fetch recipes from Firestore database
  const db = useContext(DbContext)
  const [recipes, setRecipes] = useState(null);
  const [recipesDb] = useState(collection(db, 'recipes'));

  useEffect(() => {
    onSnapshot(recipesDb, (snapshot) => {
      const data = [];
      snapshot.forEach(doc => {
        const recipe = doc.data();
        data.push({
          id: doc.id,
          title: recipe.title,
          ingredients: recipe.ingredients,
          method: recipe.method,
          cookTime: recipe.cookingTime
        });
      });
      setRecipes(data);
    });
  }, [recipesDb]);

  return (
    <div className='home'>
      {!recipes && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}
