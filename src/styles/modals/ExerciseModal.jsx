import React from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  .modal {
    display: none; // 숨겨진 상태로 시작
    position: fixed; // 스크롤해도 동일한 위치
    top: 0; // 화면 전체를 덮도록 위치
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000; // 다른 모달 보다 위에 위치하도록 함
    background-color: rgba(0, 0, 0, 0.6); // 배경색을 검정으로 하고 투명도 조절
  }
  .openModal {
    display: flex; // 모달이 보이도록 함
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }
  button {
    outline: none;
    cursor: pointer;
    margin-right: 10px;
    border: 0;
    margin-bottom: 1rem;
  }
  section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }

  section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  section > main button {
    padding: 6px 12px;
    color: #fff;
    background-color: #45474b;
    border-radius: 5px;
    font-size: 13px;
    width: 100%;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ExerciseModal = (props) => {
  const { open, close, detail } = props;

  const GoToLink = () => {
    window.open(
      `https://www.youtube.com/results?search_query=${detail.name}`,
      "_blank"
    );
  };

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <main>
              <p>운동명 : {detail.name}</p>
              <p>난이도 : {detail.difficulty}</p>
              <p>장비 : {detail.equipment}</p>
              <p>운동 부위 : {detail.muscle}</p>
              <p>종류 : {detail.type}</p>
              <p>설명 : {detail.instructions}</p>
              <div>
                <button style={{ backgroundColor: "blue" }} onClick={GoToLink}>
                  운동 설명 보러가기
                </button>
                <button style={{ backgroundColor: "blue" }} onClick={close}>
                  닫기
                </button>
              </div>
            </main>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default ExerciseModal;
