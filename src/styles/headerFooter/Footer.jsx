import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AgreementModal from "../../utils/Agreement/AgreementModal";
const StyledFooter = styled.footer.attrs({
  className: "footer",
})`

  height: 130px;
  width: 96.5%;

  display: flex;
  flex-direction: column;
  align-items: center;
  height: 130px;
  width: 100%;

  line-height: 60px;
  color: #8a8c8f;
  background-color: #333333;
  .linkBox {
    display: flex;
    flex-direction: row;
    width: 40%;
    align-items: center;
    justify-content: start;
  }

  h1 {
    display: flex;
    font-size: 0.7em;
    padding: 0 2%;
    white-space: nowrap;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      font-weight: bold;
      color: #d4cfcf;
    }
  }
  .infoBox {
    width: 80%;
    display: flex;
    align-items: end;
    justify-content: space-between;
    flex-direction: row;
    h2 {
      font-size: 0.8em;
      line-height: 1.2;
      @media (max-width: 768px) {
        font-size: 0.5em;
      }
    }
  }
  @media (max-width: 768px) {
      display: none;
    }
`;

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = (a) => {
    setModalInfo(a);
    setModalOpen(true);
  };
  return (
    <>
      <StyledFooter>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <div className="linkBox">
            <h1 onClick={() => openModal("개인정보처리방침")}>
              개인정보처리방침
            </h1>
            <h1 onClick={() => openModal("이용약관")}>이용약관</h1>
            <h1 onClick={() => openModal("책임의 법적고지")}>
              책임의 법적고지
            </h1>
            <h1 onClick={() => openModal("무단수집거부")}>무단수집거부</h1>
          </div>
          <div className="linkBox one" style={{ justifyContent: "end" }}>
            <h1>
              <InstagramIcon />
            </h1>
            <h1>
              <FacebookIcon />
            </h1>
            <h1>
              <TwitterIcon />
            </h1>
          </div>
        </div>
        <div className="infoBox">
          <div>
            <h2>(주) Wellv : 손인천,정벼리,문지예,차하늘,김현빈, 이재원</h2>
            <h2> 회사 주소 : 서울특별시 강남구 테헤란로14길 6</h2>
            <h2>사업자등록번호 : 999-99-00099</h2>
          </div>
          <div></div>
          <h2>ⓒ Wellv</h2>
        </div>
      </StyledFooter>
      <AgreementModal
          open={modalOpen}
          close={closeModal}
          header={modalInfo}
        />
    </>
  );
};

export default Footer;
