import React, { useState } from "react";
import styled from "styled-components";
import { useSearch } from "../../contexts/SearchContext";
import { useTable } from "react-table";
import { useMobileView, useTabletView } from "../../hooks/useMobileView";

const TableArea = styled.table`
  width: 100%;
  border-collapse: separate;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 그림자를 더 섬세하게 */
  border-bottom: 1px solid #ddd; /* 행 간 구분을 위한 하단 경계선 추가 */
  &:nth-child(even) {
    background-color: #d7d5d5; /* 배경색 변경 */
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

const TableBodyRow = styled(TableRow)`
  /* &:hover {
    background-color: #eae6e6;
  } */
`;
const TableHeaderCell = styled.th`
  height: 60px;
  text-align: center;
  vertical-align: middle;
  width: ${props => `${props.width}`};
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  font-size: 16px;

  

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
  width: ${props => `${props.width}`};
  padding: 10px; /* 패딩 변경 */
  border-top: 1px solid #ddd; /* 데이터 셀의 상단 경계선 추가 */
  border-bottom: 1px solid #ddd; /* 데이터 셀의 하단 경계선 추가 */
  
  text-align: left;
  
  font-size: 14px; /* 폰트 크기 조정 */

  &:last-child {
    border-right: none; // 마지막 셀에서는 오른쪽 경계선 제거
  }

  @media (max-width: 768px) {
    cursor: pointer;
    max-width: 32vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      overflow: visible;
      white-space: normal;
      z-index: 1;
    }
  }

  @media (max-width: 500px) {
  }
`;

const ReactTable = () => {
  const { state } = useSearch();
  const { searchResults } = state;
  const isMobileView = useMobileView();
  const isTabletView = useTabletView();
  

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
      reportNo: "15%",
      name: "20%",
      originType: "10%",
      functionalities: "50%",
      company: "30%",
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

        width: getColumnWidth("originType"),
      },

      {
        Header: "기능성",
        accessor: "functionalities",
        Cell: ({ cell: { value } }) => value.join(", "), // 배열을 문자열로 변환
        // width: getColumnWidth("functionalities"),
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
          return (
            <TableBodyRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                // 컬럼이 숨겨져 있지 않은 경우에만 셀 렌더링
                if (cell.column.show !== false) {
                  return (
                    <TableDataCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableDataCell>
                  );
                }
                return null; // 컬럼이 숨겨진 경우 셀을 렌더링하지 않음
              })}
            </TableBodyRow>
          );
        })}
      </TableBody>
    </TableArea>
  );
};

export default ReactTable;
