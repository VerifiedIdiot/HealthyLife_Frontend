import React, { createContext, useState } from "react";

export const CalendarContext = createContext(null);

export const CalendarProvider = (props) => {
  const [addedMeals, setAddedMeals] = useState({});
  const [isTrue, setIsTrue] = useState();

  return (
    <CalendarContext.Provider
      value={{
        addedMeals,
        setAddedMeals,
        isTrue,
        setIsTrue,
        
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};

