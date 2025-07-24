import React, { useState, useEffect } from "react";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import AppRouter from "./routes/AppRouter";

// PUBLIC_INTERFACE
/**
 * Root App component, provides theme and authentication context.
 */
function App() {
  const [theme, setTheme] = useState("light");

  // Set theme on root element for dark/light support
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        {/* Main app router and authentication provider encapsulates app */}
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
