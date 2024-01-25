import axios from "axios";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const CalendarApi = {
  CalendarReg: async (Detail, Title, WriteDate) => {
    const CalendarData = {
      Detail: Detail,
      Title: Title,
      WriteDate: WriteDate
    };
    return await axios.post(BACKEND_DOMAIN + "/calendar/new", CalendarData);
  },
}

export default CalendarApi;