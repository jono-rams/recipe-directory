import { Link, Outlet } from 'react-router-dom';

// contexts
import { useTheme } from '../hooks/useTheme';

// components
import Searchbar from './Searchbar';
import ThemeSelector from './ThemeSelector';

// styles
import './Navbar.css';

export default function Navbar() {
  const { color } = useTheme();

  return (
    <div>
      <header className='navbar' style={{background: color}}>
        <nav>
          <Link to='/' className='brand'>
            <h1>Recipe Directory</h1>
          </Link>
          <Searchbar />
          <Link to='/create'>Create Recipe</Link>
        </nav>
      </header>
      <ThemeSelector />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
