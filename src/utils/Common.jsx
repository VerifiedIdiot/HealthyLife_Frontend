import moment from "moment";
import axios from "axios";
import "moment/locale/ko"; // 한글 로컬라이제이션
moment.locale("ko"); // 한글 설정 적용
const Common = {
  BACKEND_DOMAIN: process.env.REACT_APP_BACKEND_DOMAIN,
  truncateText: (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  },
  timeFromNow: (timestamp) => {
    return moment(timestamp).fromNow();
  },
  formatDate: (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading 0 if needed
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  },
};

export default Common;

// 유즈이펙트 Axios시 사용 : 변경해줄꺼 보이지?
// useEffect(() => {
//////////////////요부분부터/////////////////////////////
//   const accessToken = Common.getAccessToken();
//////////////////요부분까지/////////////////////////////
//   const getCategories = async () => {
//     try {
//       const rsp = await AxiosApi.cateList();
//       console.log(rsp.data);
//       setCategories(rsp.data);
//     } catch (e) {
//////////////////요부분부터/////////////////////////////
//       if (e.response.status === 401) {
//         await Common.handleUnauthorized();
//         const newToken = Common.getAccessToken();
//         if (newToken !== accessToken) {
//           const rsp = await AxiosApi.cateList();
//           console.log(rsp.data);
//           setCategories(rsp.data);
//////////////////요부분까지/////////////////////////////
//         }
//       }
//     }
//   };
//   getCategories();
// }, []);

// 함수형 Axios사용 : 클릭할때 쓰는 함수 변경해줘야함
// const handleSubmit = async () => {
//////////////////요부분부터/////////////////////////////
//   const accessToken = Common.getAccessToken();
//////////////////요부분까지/////////////////////////////
//   try {
//     const rsp = await AxiosApi.boardWrite(
//       title,
//       selectedCategory,
//       content,
//       url
//     );
//     if (rsp.data === true) {
//       alert("글쓰기 성공");
//       navigate("/Boards");
//     } else {
//       alert("글쓰기 실패");
//     }
//   } catch (e) {
//////////////////요부분부터/////////////////////////////
//     if (e.response.status === 401) {
//       await Common.handleUnauthorized();
//       const newToken = Common.getAccessToken();
//       if (newToken !== accessToken) {
//         const rsp = await AxiosApi.boardWrite(
//           title,
//           selectedCategory,
//           content,
//           url
//         );
//         if (rsp.data === true) {
//           alert("글쓰기 성공");
//           navigate("/Boards");
//         } else {
//           alert("글쓰기 실패");
//         }
//////////////////요부분까지/////////////////////////////
//       }
//     }
//   }
// };

// Axios API 적용시  : 상단의 엑세스 토큰 받아서 헤더에 뿌려주셈
// memberGetInfo: async () => {
//////////////////요부분부터/////////////////////////////
//   const accessToken = Common.getAccessToken();
//////////////////요부분까지/////////////////////////////
//   return await axios.get(Common.KH_DOMAIN + `/users/info/`,
//////////////////요부분부터/////////////////////////////
//     {headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + accessToken,
//     },
//////////////////요부분까지/////////////////////////////
//   });
// },
