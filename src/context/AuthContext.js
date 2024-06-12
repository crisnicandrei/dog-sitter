// AuthContext.js

import React, { useState, useEffect, createContext, useContext } from "react";

import {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  getUserInfoUsingUiid,
  updateProfile,
} from "../configs/firebase.config";
import { set } from "date-fns";

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
    try {
      const userData = await logInWithEmailAndPassword(email, password);

      if (userData.appointments) {
        userData.appointments = userData.appointments.map((appointment) => ({
          ...appointment,
          startDate: new Date(appointment.startDate.seconds * 1000),
          endDate: new Date(appointment.endDate.seconds * 1000),
        }));
      }

      setUser(userData);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const setUserUsingUid = async () => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser && !user) {
      const userData = await getUserInfoUsingUiid(localStorageUser.uid);

      if (userData && userData.appointments) {
        userData.appointments = userData.appointments.map((appointment) => {
          return {
            ...appointment,
            startDate: new Date(appointment.startDate.seconds * 1000),
            endDate: new Date(appointment.endDate.seconds * 1000),
          };
        });
      }
      setUser(userData);
    }

    setLoading(false);
  };

  const updateUser = async (data) => {
    try {
      await updateProfile(data);
      setUser(data);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    setUserUsingUid();
    console.log("AICI");
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
  //   }, [])

  const logoutUser = async () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const values = {
    user,
    loading,
    loginError,
    login,
    updateUser,
    logoutUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
