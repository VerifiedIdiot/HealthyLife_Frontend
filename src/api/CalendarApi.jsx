import axios from "axios";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const CalendarApi = {
  DiaryReg: async (Detail, Title, WriteDate) => {
    const DiaryData = {
      Detail: Detail,
      Title: Title,
      WriteDate: WriteDate,
      memberId: email,
    };
    return await axios.post(BACKEND_DOMAIN + "/diary/new", DiaryData);
  },

}

export default CalendarApi;