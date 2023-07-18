// UserContext.jsx
import React, { createContext, useEffect, useState } from "react";
import decode from "jwt-decode";


export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [decodedToken, setDecodedToken] = useState(null);



  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      try {
        setToken(localToken);
        setReady(true);
        const decodedLocaltToken = decode(localToken);
        setDecodedToken(decodedLocaltToken);
        if (decodedLocaltToken.exp * 1000 < new Date().getTime()) {
          setToken(null);
          setDecodedToken(null);
        }
      } catch (error) {
        console.error("Error parsing localToken:", error);
        console.log("localToken value:", localToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decodingToken = decode(token);
      setDecodedToken(decodingToken);
      if (decodingToken.exp * 1000 < new Date().getTime()) {
        setToken(null);
        setDecodedToken(null);
      }
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setDecodedToken(null);
  };


  return (
    <UserContext.Provider
      value={{
        ready,
        setReady,
        token,
        setToken,
        decodedToken,
        setDecodedToken,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
