import React, { useState } from "react";
import styled from "styled-components";
import { useSearch } from "../../contexts/SearchContext";
import { useTable } from "react-table";
import { useMobileView, useTabletView } from "../../hooks/useMobileView";

const TableArea = styled.table`
  max-width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow-x: auto;
  table-layout: fixed;
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }

  @media (max-width: 500px) {
  }
`;
const TableHeader = styled.thead`
  vertical-align: middle;
  height: 50px;
  background-color: #4942e4;
  color: #ffffff;

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;
const TableRow = styled.tr`
  min-height: 60px;
  vertical-align: middle;
  box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
  border: 1px solid black;
  &:nth-child(even) {
    background-color: #f7f7f7;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

const TableBodyRow = styled(TableRow)`
  &:hover {
    background-color: #ccc9c9;
  }
`;
const TableHeaderCell = styled.th`
  height: 60px;
  text-align: center;
  vertical-align: middle;
  width: ${(props) => `${props.width}`};
  font-weight: bold;

  @media (max-width: 768px) {
    
  }

  @media (max-width: 500px) {
  }
`;
const TableBody = styled.tbody`
  vertical-align: middle;
`;
const TableDataCell = styled.td`
  height: 8vh;
  vertical-align: middle;
  padding: 5px;
  border-top: 1px solid #ddd;
  text-align: left;
  cursor: pointer;

  @media (max-width: 768px) {
    max-width: 32vw;
    overflow: hidden; // 내용이 넘칠 경우 숨김
  text-overflow: ellipsis; // 넘친 텍스트는 ...으로 표시
  white-space: nowrap; // 텍스트를 한 줄로 표시

    
  &:hover {
    overflow: visible; // 호버 시 전체 텍스트를 보이도록 설정 (선택적)
    white-space: normal; // 호버 시 텍스트 줄바꿈 허용 (선택적)
    z-index: 1; // 다른 셀 위에 텍스트를 보이도록 z-index 설정 (선택적)
  }
  }

  @media (max-width: 500px) {
  }
`;



const ReactTable = () => {
  const { state, actions } = useSearch();
  const { searchResults, searchExecuted } = state;
  const isMobileView = useMobileView();
  const isTabletView = useTabletView();
  const [expandedRow, setExpandedRow] = useState(null);

  // 클릭 이벤트 핸들러: 선택된 행을 토글하고 다른 행이 열려있다면 닫습니다.
  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  // 컬럼 너비를 환경에 따라 동적으로 설정
  const getColumnWidth = (key) => {
    // 모바일 또는 태블릿 환경일 때 사용할 너비(%)
    const widthPercentage = {
      
      name: "20%",
      
      functionalities: "33%",
      company: "33%",
    };

    // PC 환경일 때 사용할 너비(px)
    const widthPixels = {
      reportNo: "200px",
      name: "300px",
      originType: "120px",
      functionalities: "1000px",
      company: "300px",
    };

    // 모바일 또는 태블릿 환경이면 % 단위, 그렇지 않으면 px 단위를 반환
    return isMobileView || isTabletView
      ? widthPercentage[key]
      : widthPixels[key];
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "신고번호",
        accessor: "reportNo",
        width: getColumnWidth("reportNo"),
        show: !(isMobileView || isTabletView),
      },
      {
        Header: "제품명",
        accessor: "name",
        width: getColumnWidth("name"),
      },
      {
        Header: "제품 구분",
        accessor: "originType",
        show: !(isMobileView || isTabletView),
        width: isMobileView ? 80 : isTabletView ? 100 : 120,
        width: getColumnWidth("originType"),
      },

      {
        Header: "기능성",
        accessor: "functionalities",
        Cell: ({ cell: { value } }) => value.join(", "), // 배열을 문자열로 변환
        width: getColumnWidth("functionalities"),
      },
      {
        Header: "제조사명",
        accessor: "company",
        width: getColumnWidth("company"),
      },
    ],
    [isMobileView, isTabletView]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: Array.isArray(searchResults) ? searchResults : [],
    });

  return (
    <TableArea {...getTableProps()}>
      <TableHeader>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(
              (column) =>
                column.show !== false && ( // show 속성이 false가 아닐 때만 컬럼 렌더링
                  <TableHeaderCell
                    {...column.getHeaderProps()}
                    width={column.width}>
                    {column.render("Header")}
                  </TableHeaderCell>
                )
            )}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const isExpanded = row.id === expandedRow; // 현재 행이 확장된 행인지 확인
          return (
            <TableBodyRow
              {...row.getRowProps()}
              onClick={() => handleRowClick(row.id)} // 클릭 이벤트 핸들러 연결
              $shadow={isExpanded ? "0 8px 16px rgba(0,0,0,0.2)" : "0 2px 4px rgba(0,0,0,0.1)"}
              // 확장된 행에 대한 추가 스타일링 (옵션)
            >
              {row.cells.map((cell) => {
                // 컬럼의 show 속성을 확인하여 셀 렌더링
                if (cell.column.show === false) return null;
                return (
                  <TableDataCell
                    {...cell.getCellProps()}
                    width={cell.column.width}
                    style={{
                      maxWidth: isExpanded ? "none" : "", // 확장된 행에 대한 스타일 조정
                      whiteSpace: isExpanded ? "normal" : "nowrap",
                      overflow: isExpanded ? "visible" : "hidden",
                      textOverflow: isExpanded ? "" : "ellipsis",
                    }}
                  >
                    {cell.render("Cell")}
                  </TableDataCell>
                );
              })}
            </TableBodyRow>
          );
        })}
      </TableBody>
    </TableArea>
  );
};

export default ReactTable;
