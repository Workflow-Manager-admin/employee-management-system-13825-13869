import React, { useState, useEffect } from 'react';
import './App.css';
import AppRouter from './AppRouter';

// PUBLIC_INTERFACE
function App() {
  // Light/dark theme support
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  // Support toggling theme from any page
  useEffect(() => {
    window.toggleTheme = () =>
      setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <div className="App">
      <AppRouter />
      <button
        className="theme-toggle"
        onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
}

export default App;
