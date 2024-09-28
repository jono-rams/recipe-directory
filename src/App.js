import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

// Page components
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';

// styles
import './App.css';
import Navbar from './components/Navbar';

function App() {
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
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
