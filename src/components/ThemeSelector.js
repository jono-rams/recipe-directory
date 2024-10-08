// contexts
import { useTheme } from '../hooks/useTheme';
import modeIcon from '../assets/mode-icon.svg'

// styles
import './ThemeSelector.css';

const themeColors = ['#58249c', '#249c6b', '#b70233', '#0abab5', '#ffd700', '#0000cd'];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className='theme-selector'>
      <div className="mode-toggle">
        <img 
          onClick={toggleMode}
          src={modeIcon}
          alt="dark/light toggle icon"
          style={{ filter: mode === 'light' ? 'invert(100%)' : 'invert(0%)' }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map(color => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{background: color}}
          />
        ))}
      </div>
    </div>
  )
}
