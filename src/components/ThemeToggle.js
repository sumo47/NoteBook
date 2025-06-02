import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className="theme-switch-container">
      <i className="fas fa-sun" style={{ color: theme === 'light' ? '#ffc107' : '#6c757d' }}></i>
      <label className="theme-switch">
        <input 
          type="checkbox" 
          onChange={toggleTheme}
          checked={theme === 'dark'}
          aria-label="Toggle dark mode"
        />
        <span className="slider"></span>
      </label>
      <i className="fas fa-moon" style={{ color: theme === 'dark' ? '#f8f9fa' : '#6c757d' }}></i>
    </div>
  );
}

export default ThemeToggle; 