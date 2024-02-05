// const [searchParams] = useSearchParams();
// const context = useContext(UserContext);
// const { setKakaoId, setKakaoPw } = context;

import { useNavigate, useSearchParams } from "react-router-dom";
import UserStore from "../../store/UserStore";
import { useContext, useEffect } from "react";
import MemberApi from "../../api/MemberApi";
import Common from "../../utils/Common";
import styled from "styled-components";

// useEffect(() => {
//   const AuthReg = async () => {
//     console.log(searchParams.get("code"));
//     try {
//       const resp = await MemberApi.KakaoLogin(searchParams.get("code"));
//       const idMatch = resp.data.match(/id='([^']+)'/);
//       const kakaoId = idMatch ? idMatch[1] : null;
//       const kakaoEmailMatch = resp.data.match(/email='([^']+)'/);
//       const kakaoEmail = kakaoEmailMatch ? kakaoEmailMatch[1] : null;
//       setKakaoId(kakaoEmail);
//       setKakaoPw(kakaoId);
//       const rsp = await MemberApi.SingupIdCheck(kakaoEmail);
//       if (resp.status === 200) {
//         console.log(kakaoEmail);
//         console.log("Kakao ID:", kakaoId);
//         console.log(resp.data);
//         if (rsp.data === true) {
//           // 회원가입 페이지로 이동
//           navigate("/signup"); // 실제 경로에 맞게 수정
//         } else {
//           // 메인 페이지로 이동
//           try {
//             const res = await MemberApi.login(inputEmail, inputPw);
//             console.log("tlqkf" + res.data);
//             if (res.data.grantType === "Bearer") {
//               console.log("성공");
//               console.log("엑세스토큰나와 ! " + res.data.accessToken);
//               console.log("리프레시토큰나와 ! " + res.data.refreshToken);
//               Common.setAccessToken(res.data.accessToken);
//               Common.setRefreshToken(res.data.refreshToken);
//               loginNavigate("/");
//             }
//           } catch (err) {
//             console.log("로그인 에러 : " + err);
//             if (err.response && err.response.status === 401) {
//               console.log("로그인 실패: 401 Unauthorized");
//               console.log("잘못된 아이디 또는 비밀번호 입니다.");
//             } else {
//               console.log("로그인 에러 : " + err);
//               console.warn("서버와의 연결이 끊어졌습니다!");
//               console.log(inputEmail);
//               console.log(inputPw);
//             }
//           }
//         }
//       } else {
//         console.log("실패했습니다.");
//         // 실패 시 메인 페이지로 이동
//         navigate("/");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   AuthReg();
// }, []);

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .scroll::-webkit-scrollbar {
    display: none;
  }
`;

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const context = useContext(UserStore);
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
        const rsp = await MemberApi.checkUnique(kakaoEmail);
        if (resp.status === 200) {
          console.log(kakaoEmail);
          console.log("Kakao ID:", kakaoId);
          console.log(resp.data);
          if (rsp.data === true) {
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

export default Auth;
