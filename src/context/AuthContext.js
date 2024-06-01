// AuthContext.js

import React, { useState, useEffect, createContext, useContext } from "react";

import {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  getUserInfoUsingToken,
} from "../configs/firebase.config";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  loginError: false,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  //   register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(false);

  const login = async (email, password) => {
    const userData = await logInWithEmailAndPassword(email, password);
    console.log("THE USER DATA IS:", userData);
    setUser(userData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && !user && getUserInfoUsingToken(token);
    console.log("THE USER IS:", token && !user);
  }, [user]);

  //   const logout = () => {
  //     return auth.signOut();
  //   };

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((user) => {
  //         setUser(user);
  //       setLoading(false);
  //     });

  //     return unsubscribe;
  //   }, []);

  const values = {
    user,
    loading,
    loginError,
    login,
    // logout,
    // register,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
