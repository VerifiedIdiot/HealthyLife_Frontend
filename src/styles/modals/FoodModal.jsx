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

    .image {
      width: 80%;
      height: 200px;
      border-radius: 8px;
      object-fit: cover;
    }

    .imageBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 250px;
    }

    .servingSize {
      font-size: 13px;
    }

    .name {
      font-size: 20px;
    }

    .detail {
      display: flex;
      justify-content: space-around;
    }

    .detail1 {
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
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

const FoodModal = (props) => {
  const { open, close, detail } = props;

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <main>
              <div className="imageBox">
                <img className="image" src={detail.image} alt="이미지"/>
                <p className="name">{detail.name}</p>
                <p className="servingSize">1회 제공량 {detail.servingSize} g</p>
              </div>
              <div className="detail">
                <div className="detail1">
                  <p>칼로리 : {detail.kcal} kcal</p>
                  <p>당류 : {detail.sugar} g</p>
                  <p>지방 : {detail.fat} g</p>
                  <p>트랜스지방 : {detail.transFat} g</p>
                  <p>포화지방 : {detail.saturatedFat} g</p>
                  <p>나트륨 : {detail.salt} g</p>
                  <p>탄수화물 : {detail.carbohydrate} g</p>
                  <p>단백질 : {detail.protein} g</p>
                  <p>콜레스테롤 : {detail.cholesterol} g</p>
                </div>
                <div className="detail1">
                  <p>칼슘 : {detail.calcium} g</p>
                  <p>식이섬유 : {detail.dietaryFiber} g</p>
                  <p>철분 : {detail.iron} g</p>
                  <p>비타민 B1 : {detail.vitaB1} g</p>
                  <p>비타민 B12 : {detail.vitaB12} g</p>
                  <p>비타민 B2 : {detail.vitaB2} g</p>
                  <p>비타민 C : {detail.vitaC} g</p>
                  <p>아연 : {detail.zinc} g</p>
                </div>
              </div>
              <button style={{ backgroundColor: "blue" }} onClick={close}>
                닫기
              </button>
            </main>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default FoodModal;
