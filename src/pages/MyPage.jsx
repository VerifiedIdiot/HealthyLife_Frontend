import MypageComp from "../components/mypage/MypageComponent";
import MypageEditComp from "../components/mypage/MypageEditComp";
import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";

const MyPage = () => {
  const userData = {
    image:
      "https://images.unsplash.com/photo-1541260894924-7ff059b93d54?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "dlwodnjs2669@naver.com",
    name: "이재원",
    nickName: "개멍순주인",
    phone: "010-7486-8669",
    addr: "서울특별시 강남구 청담동이 전부다 우리집",
  };
  return (
    <>
      <MypageComp userData={userData && userData} />
      {/* <MypageEditComp userData={userData && userData} /> */}
    </>
  );
};
export default MyPage;
