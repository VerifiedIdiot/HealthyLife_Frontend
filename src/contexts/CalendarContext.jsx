import React, { createContext, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CalendarContext = createContext();

const initialState = {
 
};

const actions = {


}

const calendarReducer = (state, action) => {
  switch (action.type) {
    case "" :
      if ("" === "".payload) {
        return state;
      }
  }
}



export const CalendarProvider = ({children}) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();  

  return (
    <CalendarContext.Provider value={{state, actions}}>
    {children}
    </CalendarContext.Provider>
  );
};

