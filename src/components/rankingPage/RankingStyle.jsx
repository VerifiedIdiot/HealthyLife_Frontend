import styled from "styled-components";
import { Section, Area, Box, Item } from "../../styles/Layouts";

// 순위별 레이아웃
export const SortedImgBoxSection = styled(Section)`
  margin: 30px 0;
  height: 23vh;
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    & > Area {
      width: 50%;
    }
  }
`;

export const SortedBoxArea = styled(Area)`
  box-shadow: none;
  margin: 0 1vw;
  cursor: pointer;
  border-bottom: ${({ isSelected }) => isSelected ? '2px solid #4942E4' : 'none'};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05); 
  }
`;

export const ItemType = styled(Item)`
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled.img.attrs({
  className: "ranking-icon",
})`
  object-fit: contain;
  height: 50%;
`;

// 검색 레이아웃
export const ItemSearchSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 10%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ItemArea = styled(Item)`
  align-items: center;
  flex-direction: column;
`;

export const ItemBox = styled(Box)`
  justify-content: ${(props) => props.$justify || "center"};
`;

export const SearchSection = styled(Section)`
  height: 10vh;
  align-items: center;
  justify-content: space-between;
`;

export const SelectBox = styled(Box)`
  width: 30%;
  height: 40px;
  align-items: center;
  box-shadow: none;
  padding: 0 2.8%;
`;

export const InputField = styled.input`
  width: 40vw;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  justify-content: end;
  margin: 0 2.8%;

  @media (max-width: 768px) {
    width: 60vw;
    margin-left: 5px;
  }
`;

export const ItemViewSection = styled(Section)`
  height: 15%;
`;

export const ItemBoardSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// React-Table
export const TableArea = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TableHeader = styled.thead`
  vertical-align: middle;
`;

export const TableRow = styled.tr`
  height: 60px;
  max-width: 300px;
  vertical-align: middle;
  box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
`;

export const TableHeaderCell = styled.th`
  text-align: center;
  vertical-align: middle;
  width: 25vw;
`;

export const TableBody = styled.tbody`
  vertical-align: middle;
  width: 100%;
`;

export const TableDataCell = styled.td`
  height: 8vh;
  vertical-align: middle;
  padding-left: 5px;
  width: 100vw;
`;

// 페이지네이션 레이아웃
export const ItemPaginationSection = styled(Section)`
  height: 5%;
  justify-content: center;
  align-items: center;
  min-height: 80px;
`;

export const ItemPaginationArea = styled(Area)`
  display: flex;
  justify-content: center;

  height: 90%;
  width: 95%;
`;

export const ItemPaginationButton = styled.button`
  height: 30px;
  width: 30px;
  margin-right: 2px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  background-color: ${(props) => (props.$isActive ? "#007bff" : "white")};
  color: ${(props) => (props.$isActive ? "white" : "black")};
`;



export const PaginationButton = styled.button`
  padding: 8px;
  margin: 0 4px;
  background-color: ${({ isActive }) => (isActive ? "#4942E4" : "white")};
  border: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;