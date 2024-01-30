import DaumPostcode from "react-daum-postcode";
import { styled } from "styled-components";

const PostStyle = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 99;

  .postWrapper {
    width: 50%;
    height: 80%;
    margin: 0 auto;
    position: relative;
    top: 15%;
    .close {
      padding: 10px;
      background-color: var(--LIGHTVIO);
      display: flex;
      justify-content: end;
      button {
        background-color: var(--VIOLET);
        border: none;
        padding: 10px 12px;
        color: white;
        font-size: 1em;
        cursor: pointer;
      }
    }

    @media only screen and (max-width: 768px) {
      width: 100%;
      top: 20%;
    }
  }
`;

const DaumPostPopup = (props) => {
  const { onClose, setAddr, open } = props;

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? `(${extraAddress})` : "";
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zoneCode);
    setAddr(fullAddress);
    onClose();
  };

  return (
    <PostStyle>
      <div className="postWrapper">
        <div className="close">
          <button onClick={onClose}>X</button>
        </div>
        <DaumPostcode className="daumpost" onComplete={handlePostCode} />
      </div>
    </PostStyle>
  );
};
export default DaumPostPopup;
