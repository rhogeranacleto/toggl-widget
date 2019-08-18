import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';

export const FocusContext = createContext();

export const FocusProvider = ({ reducer, initialState, children }) => (
  <FocusContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </FocusContext.Provider>
)

export const useFocusValue = () => useContext(FocusContext);

export const useWindowFocus = () => {

  const [focus, setFocus] = useState(true);

  const getFocused = () => setFocus(true);
  const getBlured = () => setFocus(false);

  useEffect(() => {

    window.addEventListener('focus', getFocused);
    window.addEventListener('blur', getBlured);

    return () => {
      window.removeEventListener('focus', getFocused);
      window.removeEventListener('blur', getBlured);
    }
  }, [])

  return focus;
}