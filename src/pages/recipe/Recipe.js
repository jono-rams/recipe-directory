import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

// contexts
import { useDatabase } from '../../hooks/useDatabase';
import { useTheme } from '../../hooks/useTheme';

// styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const db = useDatabase();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const docRef = doc(db, 'recipes', id);
    getDoc(docRef).then((snap) => {
      if (snap.exists()) {
        setRecipe(snap.data());
      } else {
        setError(true);
      }
    })
  }, [db, id])

  const { mode } = useTheme();

  return (
    <div className={`recipe ${mode}`}>
      {!recipe && !error && <p className='loading'>Loading recipe details...</p>}
      {error && <p className='error'>Error loading that recipe, it may not exist...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li> )}
          </ul>
          <p className='method'>{recipe.method}</p>
        </>
      )}
    </div>
  )
}
