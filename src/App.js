import React, { useState, useEffect } from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { collection, onSnapshot } from 'firebase/firestore';

// contexts
import { useDatabase } from './hooks/useDatabase';
import { RecipesContext } from './context/RecipeContext';

// Page components
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';

// styles
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const db = useDatabase();
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);
  const [recipesDb] = useState(collection(db, 'recipes'));

  useEffect(() => { 
    try {
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
    } catch (err) {
      setError(err.message);
    }
    
  }, [recipesDb]);

  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='create' element={<Create />} />
        <Route path='search' element={<Search />} />
        <Route path='recipes/:id' element={<Recipe />} />
      </Route>
    )
  );

  return (
    <RecipesContext.Provider value={recipes}>
      <div className="App">
        {!error && <RouterProvider router={route} />}
        {error && <p className='error'>Error: {error}</p>}
      </div>
    </RecipesContext.Provider>
  );
}

export default App;
