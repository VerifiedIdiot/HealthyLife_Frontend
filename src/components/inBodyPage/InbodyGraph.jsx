// import styled from "styled-components";
// import Chart from "./Chart";
// import { media } from "../../utils/MediaQuery";
// import { useState, useEffect } from "react";

// const Graph = styled.div`
//   width: 45%;
//   height: 50%;

//   ${media.small`
//     width: 100%;
//     height: 100%;
//     `}
// `;

// const Title = styled.div`
//   height: 25%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 8px 8px 0px 0px;
//   font-size: 100%;
//   font-weight: bold;
//   margin-bottom: 0.5rem;
// `;

// const GraphContainer = styled.div`
//   width: 95%;
//   height: 70vh;
//   display: flex;
//   flex-wrap: wrap; /* 줄 바꿈 적용 */
//   justify-content: center;
//   background-color: #d9d9d9;
//   border-radius: 8px;
//   padding-bottom: 1rem;
//   min-height: 600px;

//   ${media.small`
//     flex-wrap: nowrap;
//     flex-direction: column;
//     `}
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 1rem;
// `;

// const Button = styled.button`
//   margin: 0 1rem;
//   padding: 0.5rem 1rem;
//   border: none;
//   background-color: #ccc;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const InbodyGraph = ({ bodyData }) => {
//   const [selectedData, setSelectedData] = useState(); // 초기 선택: 체중
//   const [title, setTitle] = useState("체중");

//   useEffect(() => {
//     const weightData =
//       bodyData &&
//       bodyData.map((item) => ({
//         date: item.date,
//         weight: item.weight,
//       }));
//     const bmiData =
//       bodyData && bodyData.map((item) => ({ date: item.date, BMI: item.bmi }));
//     const muscleData =
//       bodyData &&
//       bodyData.map((item) => ({
//         date: item.date,
//         muscle: item.muscle,
//       }));
//     const fatData =
//       bodyData && bodyData.map((item) => ({ date: item.date, fat: item.fat }));

//     setSelectedData(weightData); // 초기 선택은 체중으로 설정
//   }, [bodyData]); // bodyData가 변경될 때마다 실행

//   const handleButtonClick = (data, title) => {
//     setSelectedData(data);
//     setTitle(title);
//   };

//   return (
//     <>
//       <ButtonContainer>
//         <Button onClick={() => handleButtonClick(weightData, "체중")}>
//           체중
//         </Button>
//         <Button onClick={() => handleButtonClick(bmiData, "BMI")}>BMI</Button>
//         <Button onClick={() => handleButtonClick(muscleData, "골격근량")}>
//           골격근량
//         </Button>
//         <Button onClick={() => handleButtonClick(fatData, "체지방량")}>
//           체지방량
//         </Button>
//       </ButtonContainer>
//       <GraphContainer>
//         <Title>{title}</Title>
//         {selectedData && <Chart data={selectedData} />}
//       </GraphContainer>
//     </>
//   );
// };

// export default InbodyGraph;
