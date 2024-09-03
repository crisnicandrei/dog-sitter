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
  uploadImageToFirebase,
  getUsersByCity,
} from "../configs/firebase.config";
import { set } from "date-fns";
import { async } from "@firebase/util";
import { useRouter } from "next/router";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  loginError: false,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  signInAndRegisterUsingGoogle: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
  logoutUser: () => Promise.resolve(),
  getUsersByCity: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  const signInAndRegisterUsingGoogle = async () => {
    const { uid } = await signInWithGoogle();

    const userData = await getUserInfoUsingUiid(uid);

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

    router.push("/editare-profil");
  };

  const register = async (name, email, password, router) => {
    try {
      const { uid } = await registerWithEmailAndPassword(name, email, password);

      const userData = await getUserInfoUsingUiid(uid);

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

      router.push("/editare-profil");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

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

  const logoutUser = async () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    setUserUsingUid();
  }, [user]);

  const uploadImage = async (file) => {
    try {
      const downloadURL = await uploadImageToFirebase(file);
      // console.log(downloadURL);
      return downloadURL;
    } catch (error) {}
  };

  const fetchSitters = async (city) => {
    try {
      const sitters = await getUsersByCity(city);
      return sitters;
    } catch (error) {
      console.error("Error getting sitters:", error);
    }
  };

  const values = {
    user,
    loading,
    loginError,
    login,
    register,
    signInAndRegisterUsingGoogle,
    updateUser,
    logoutUser,
    uploadImage,
    fetchSitters,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
