import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import './App.css';

function App({ db }) {
  // Fetch recipes from Firestore database
  const [recipes, setRecipes] = useState([]);
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
    <div className="App">
      {recipes.length !== 0 && recipes.map(recipe => <p key={recipe.id}>{recipe.title}</p>)}
    </div>
  );
}

export default App;
