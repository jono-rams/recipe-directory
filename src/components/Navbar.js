import { Link, Outlet } from 'react-router-dom';

// components
import Searchbar from './Searchbar';

// styles
import './Navbar.css';

export default function Navbar() {
  return (
    <div>
      <header className='navbar'>
        <nav>
          <Link to='/' className='brand'>
            <h1>Recipe Directory</h1>
          </Link>
          <Searchbar />
          <Link to='/create'>Create Recipe</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
