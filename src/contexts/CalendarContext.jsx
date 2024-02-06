import React, { createContext, useState, useContext } from 'react';

const CalendarContext = createContext();

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const [addedMeals, setAddedMeals] = useState({});

  const updateAddedMeals = (date, meal) => {
    setAddedMeals(prevState => ({
      ...prevState,
      [date]: meal
    }));
  };

  return (
    <CalendarContext.Provider value={{ addedMeals, updateAddedMeals }}>
      {children}
    </CalendarContext.Provider>
  );
};
