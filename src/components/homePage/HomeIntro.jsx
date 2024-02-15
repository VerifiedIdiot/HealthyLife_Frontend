import styled from "styled-components";
import Body from "../../../src/assets/icons/HomeMain/Body.png";
import Calender from "../../../src/assets/icons/HomeMain/Calender.png";
import Community from "../../../src/assets/icons/HomeMain/Community.png";
import Information from "../../../src/assets/icons/HomeMain/Infomation.png";
import Ranking from "../../../src/assets/icons/HomeMain/Ranking.png";
import { useNavigate } from "react-router";
import { media } from "../../utils/MediaQuery";

const IntroBox = styled.div`
  width: 95%;
`;

const IntroTitle = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 1rem;

  /* Add margin between BlueText elements */
  & > :not(:last-child) {
    margin-right: 5px; /* Adjust as per your preference */
  }

  ${media.large`
    font-size: 25px;
    `}
  ${media.small`
    font-size: 18px;
    `}
`;

const BlueText = styled.span`
  color: blue;
`;

const IntroContent = styled.div`
  display: flex;
  justify-content: space-around;
`;

const IntroElement = styled.div`
  display: flex;
  flex-direction: column;
  width: 16%;
  justify-content: space-between;
  background-color: lightgray;
  border-radius: 8px;
  align-items: center;
`;

const IntroElement1 = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  text-align: center;
  font-weight: bold;
  height: 40px;

  ${media.large`
    font-size: 20px;
    `}

  ${media.small`
    font-size: 12px;
    `}
`;

const IntroElement2 = styled.div`
  display: flex;
  font-size: 15px;
  height: 40px;
  text-align: center;
  align-items: center;
  font-weight: bold;

  ${media.large`
    font-size: 12px;
    `}
`;

const IntroElement3 = styled.img`
  width: 130px;
  height: 130px;

  ${media.large`
    width: 80px;
    height: 80px;
    `}

  ${media.small`
    width: 50px;
    height: 50px;
    `}
`;

const HomeIntro = () => {
  const navigate = useNavigate();

  return (
    <>
      <IntroBox>
        <IntroTitle>
          <BlueText>건강</BlueText>하고
          <BlueText> 똑똑</BlueText>한 운동을 위한 <BlueText>Wellv</BlueText>
          만의 맞춤 기능
        </IntroTitle>
        <IntroContent>
          <IntroElement onClick={() => navigate("/inbody")}>
            <IntroElement1>Inbody</IntroElement1>
            <IntroElement3 src={Body}></IntroElement3>
            <IntroElement2>신체 변화를 한눈에 알아봐요</IntroElement2>
          </IntroElement>
          <IntroElement onClick={() => navigate("/calendar")}>
            <IntroElement1>Calender</IntroElement1>
            <IntroElement3 src={Calender}></IntroElement3>
            <IntroElement2>일자별 운동, 식단을 기록해봐요</IntroElement2>
          </IntroElement>
          <IntroElement onClick={() => navigate("/information")}>
            <IntroElement1>Information</IntroElement1>
            <IntroElement3 src={Information}></IntroElement3>
            <IntroElement2>맞춤 식단, 운동을 검색해봐요</IntroElement2>
          </IntroElement>
          <IntroElement onClick={() => navigate("/communitypage")}>
            <IntroElement1>Community</IntroElement1>
            <IntroElement3 src={Community}></IntroElement3>
            <IntroElement2>나만의 운동, 식단을 공유해봐요</IntroElement2>
          </IntroElement>
          <IntroElement onClick={() => navigate("/ranking")}>
            <IntroElement1>Ranking</IntroElement1>
            <IntroElement3 src={Ranking}></IntroElement3>
            <IntroElement2>기록으로 유저들과 경쟁해봐요</IntroElement2>
          </IntroElement>
        </IntroContent>
      </IntroBox>
    </>
  );
};

export default HomeIntro;
