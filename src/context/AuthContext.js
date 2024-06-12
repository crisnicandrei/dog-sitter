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
    const userData = await logInWithEmailAndPassword(email, password);
    console.log("THE USER DATA IS:", userData);
    if (userData.appointments) {
      userData.appointmentsArray = userData.appointments.map((appointment) => {
        return {
          ...appointment,
          startDate: new Date(appointment.startDate.seconds * 1000),
          endDate: new Date(appointment.endDate.seconds * 1000),
        };
      });
    }
    setUser(userData);
  };

  const setUserUsingUid = async () => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser && !user) {
      const userData = await getUserInfoUsingUiid(localStorageUser.uid);
      if (userData.appointmentsArray) {
        userData.appointmentsArry = userData.appointmentsArray.map(
          (appointment) => {
            return {
              ...appointment,
              startDate: new Date(appointment.startDate.seconds * 1000),
              endDate: new Date(appointment.endDate.seconds * 1000),
            };
          }
        );
      }
      console.log("THE USER IS:", userData);
      setUser(userData);
      setLoading(false);
    }
  };

  const updateUser = async (data) => {
    try {
      console.log("THE DATA IS:", data);
      await updateProfile(data);
      setUser(data);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    setUserUsingUid();
    console.log("THE USER IS:", user);
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
