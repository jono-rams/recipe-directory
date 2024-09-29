import { useContext, useRef, useState } from 'react';
import { DbContext } from '../../dbContext';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// styles
import './Create.css';

export default function Create() {
  const db = useContext(DbContext)
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState(new Set());
  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      addDoc(collection(db, 'recipes'), {
        title,
        method,
        cookingTime: cookingTime.concat(parseInt(cookingTime) !== 1 ? ' minutes' : ' minute'),
        ingredients: [...ingredients]
      }).then(() => {
        navigate('/', {replace: true});
        navigate(0);
      })
    } catch (error) {
      console.error('Error adding document: ', error);
      setIsPending(false);
      setError(true);
    }
  }

  const handleAdd = (e) => {
    e.preventDefault();
    if (newIngredient.trim().length > 0) {
      setIngredients(prev => new Set([...prev, newIngredient.trim()]));
    }
    setNewIngredient('');
    ingredientInput.current.focus();
  }

  const handleDelete = (index) => {
    setIngredients(prev => new Set([...prev].filter((_, i) => i!== index)));
  }

  return (
    <div className='create'>
      <h2 className="page-title">Add a New Recipe</h2>

      <form className='create-form' onSubmit={handleSubmit}>

        <label>
          <span>Recipe title:</span>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input 
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">Add</button>
          </div>
        </label>
        <p>Current ingredients: {[...ingredients].map((i, index) => 
          <em className='ing' onClick={() => handleDelete(index)} key={i}>{i}, </em>
        )}</p>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type='number'
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        {!isPending && !error && <button className="btn add">Add Recipe</button> }
        {isPending && <button className='btn disabled' disabled>Adding recipe...</button>}
        {error && <p className='error'>An error occurred while adding the recipe. Please try again later.</p>}

      </form>
    </div>
  )
}
