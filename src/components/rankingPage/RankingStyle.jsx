import styled from "styled-components";
import { Section, Area, Box, Item, Element } from "../../styles/Layouts";

// 순위별 레이아웃
export const SortedImgBoxSection = styled(Section)`
  height: 23vh;
`;

export const SortedBoxArea = styled(Area)`
  box-shadow: none;
  padding: 0 1vw;
  margin: 0 2vw;
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
  height: 20vh;
  

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


// React-Table
export const TableArea = styled.table`
  display: flex;
  flex-direction: column;
  width: 95%;
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
