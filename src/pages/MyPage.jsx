import { useState } from "react";
import MemberApi from "../api/MemberApi";
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
import { useEffect } from "react";

const MyPage = () => {
  const [memberInfo, setMemberInfo] = useState([]);

  useEffect(() => {
    const memberDetail = async () => {
      try {
        const res = await MemberApi.getMemberDetail();
        console.log("상세정보야 들어왔니 ? " + res.data);
        setMemberInfo(res.data);
      } catch (error) {
        console.log(error);
        console.log(memberInfo);
      }
    };
    memberDetail();
  }, []);

  return (
    <>
      <MypageComp memberInfo={memberInfo && memberInfo} />
      {/* <MypageEditComp userData={userData && userData} /> */}
    </>
  );
};
export default MyPage;
