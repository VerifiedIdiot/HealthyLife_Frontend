import { useContext, useEffect, useState } from "react";
import MemberApi from "../api/MemberApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Common from "../utils/Common";
import { UserContext } from "../contexts/UserStore";

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .scroll::-webkit-scrollbar {
    display: none;
  }
`;

const Kakao = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const context = useContext(UserContext);
  const { setKakaoId, setKakaoPw } = context;

  useEffect(() => {
    const AuthReg = async () => {
      console.log(searchParams.get("code"));
      try {
        const resp = await MemberApi.KakaoLogin(searchParams.get("code"));
        const idMatch = resp.data.match(/id='([^']+)'/);
        const kakaoId = idMatch ? idMatch[1] : null;
        const kakaoEmailMatch = resp.data.match(/email='([^']+)'/);
        const kakaoEmail = kakaoEmailMatch ? kakaoEmailMatch[1] : null;
        setKakaoId(kakaoEmail);
        setKakaoPw(kakaoId);
        const rsp = await MemberApi.checkUnique(0, kakaoEmail);
        console.log("rsp : " + rsp.data);
        if (resp.status === 200) {
          console.log(kakaoEmail);
          console.log("ㅋㅋ : ", kakaoId);
          console.log("ㅎㅇ : " + resp.data);
          if (!rsp.data) {
            // 회원가입 페이지로 이동
            navigate("/join"); // 실제 경로에 맞게 수정
          } else {
            // 메인 페이지로 이동
            try {
              const res = await MemberApi.login(kakaoEmail, kakaoId);
              if (res.data.grantType === "Bearer") {
                Common.setAccessToken(res.data.accessToken);
                Common.setRefreshToken(res.data.refreshToken);
                navigate("/");
              } else {
                navigate("/");
              }
            } catch (err) {
              console.log(err);
              navigate("/");
            }
          }
        } else {
          console.log("실패했습니다.");
          // 실패 시 메인 페이지로 이동
          navigate("/");
        }
      } catch (e) {
        console.log(e);
      }
    };

    AuthReg();
  }, []);

  return (
    <>
      <Center>
        <div>카카오톡 로그인 중 입니다...</div>
      </Center>
    </>
  );
};

export default Kakao;
