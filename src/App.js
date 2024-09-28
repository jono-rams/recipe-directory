import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

// Page components
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';

// styles
import './App.css';
import Navbar from './components/Navbar';

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

  console.log(recipes);

  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='create' element={<Create />} />
        <Route path='search' element={<Search />} />
        <Route path='recipe/:id' element={<Recipe />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
