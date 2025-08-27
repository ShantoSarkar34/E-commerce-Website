import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase";
import axios from "axios";
export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dark = theme === "dark";

  useEffect(() => {
    fetch("https://online-shop9070-server.onrender.com/all-users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const adminRole = data?.filter((res) => res.role === "admin");
  const currentRole = data?.filter((res) => res.email === user?.email);

  const createUser = async (email, password, name) => {
    const newUser = {
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      role: "user",
    };
    try {
      const response = await axios.post(
        "https://online-shop9070-server.onrender.com/all-users",
        newUser
      );
      if (response.data.insertedId) {
        return createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.log("error submitting :", error);
    }
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    console.log(provider);
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    updateUser,
    logout,
    login,
    loginWithGoogle,
    loading,
    setLoading,
    theme,
    setTheme,
    dark,
    adminRole,
    currentRole,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
