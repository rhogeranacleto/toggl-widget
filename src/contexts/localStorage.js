import React, { useContext } from 'react';
import { createContext } from "react";

export const LocalStorageContext = createContext();

export const LocalStorageProvider = ({ token, setToken, children }) => (
  <LocalStorageContext.Provider value={{ token, setToken }}>
    {children}
  </LocalStorageContext.Provider>
)

export const useStateValue = () => useContext(LocalStorageContext);