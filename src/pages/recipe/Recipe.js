import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DbContext } from '../../context/DbContext';

import './Recipe.css';
import { doc, getDoc } from 'firebase/firestore';

export default function Recipe() {
  const { id } = useParams();
  const db = useContext(DbContext)
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

  return (
    <div className="recipe">
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
