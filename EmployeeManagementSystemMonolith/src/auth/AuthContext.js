import React, { createContext, useContext, useState } from "react";

// Defines the shape of the authentication context
const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * AuthProvider manages authentication state and user info for the app.
 */
export function AuthProvider({ children }) {
  // Stub user - replace with real authentication/backend integration later
  const [user, setUser] = useState(null);

  // PUBLIC_INTERFACE
  const login = (username, password) => {
    // Stub: Replace with API call; simulate roles based on username for demo
    let role = "Employee";
    if (username === "hr") role = "HR";
    else if (username === "manager") role = "Manager";

    setUser({ username, role });
    return Promise.resolve({ success: true });
  };

  // PUBLIC_INTERFACE
  const logout = () => setUser(null);

  // PUBLIC_INTERFACE
  const isAuthenticated = !!user;

  // PUBLIC_INTERFACE
  const hasRole = (requiredRoles) =>
    user && requiredRoles.includes(user.role);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, hasRole, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * Custom hook to access authentication context.
 */
export const useAuth = () => useContext(AuthContext);
