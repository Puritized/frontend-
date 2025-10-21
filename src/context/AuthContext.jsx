import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { token, id, role, name, email }

  useEffect(() => {
    const stored = localStorage.getItem("phia_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userData) => {
    /**
     * Expect userData to include at least: token, id, role, name, email
     * Backend login should return these fields.
     */
    const payload = {
      token: userData.token,
      id: userData.id || userData._id || userData.userId,
      role: userData.role,
      name: userData.name,
      email: userData.email,
    };
    localStorage.setItem("phia_user", JSON.stringify(payload));
    setUser(payload);
  };

  const logout = () => {
    localStorage.removeItem("phia_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};