import React, { useEffect } from "react";
import styled from "styled-components";
import { useSearch } from "../../contexts/SearchContext";
import { useTable } from "react-table";
import { useMobileView } from "../../hooks/useMobileView";

const TableArea = styled.table`
  max-width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow-x: auto;
  table-layout: fixed;
  @media (max-width: 1024px) {
    min-width: 600px; 
  }

  @media (max-width: 480px) {
    min-width: 400px; 
  }

`;
const TableHeader = styled.thead`
  vertical-align: middle;
  height: 50px;
  background-color: #4942e4;
  color: #ffffff;

  @media (max-width: 1024px) {
    height: 40px; 
  }

  @media (max-width: 480px) {
    height: 35px; 
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

  @media (max-width: 1024px) {
    min-height: 50px; 
  }

  @media (max-width: 480px) {
    min-height: 40px; 
  }
`;

const TableBodyRow = styled(TableRow)`
  &:hover {
    background-color: #eaeaea;
  }
`;
const TableHeaderCell = styled.th`
  height: 60px;
  text-align: center;
  vertical-align: middle;
  width: ${(props) => `${props.width}px`};
  font-weight: bold;

  @media (max-width: 1024px) {
    padding: 8px; // 태블릿 화면에서 셀의 패딩 조정
  }

  @media (max-width: 480px) {
    padding: 5px; // 모바일 화면에서 셀의 패딩을 더 줄임
    font-size: 14px; // 모바일 화면에서 폰트 크기 조정
  }
`;
const TableBody = styled.tbody`
  vertical-align: middle;
`;
const TableDataCell = styled.td`
  height: 8vh;
  vertical-align: middle;
  padding-left: 5px;
  width: ${(props) => `${props.width}px`};
  border-top: 1px solid #ddd;
  text-align: left;

  @media (max-width: 1024px) {
    padding: 8px; 
  }

  @media (max-width: 480px) {
    padding: 5px; 
    font-size: 14px; 
  }
`;

const ReactTable = () => {
  const { state, actions } = useSearch();
  const { searchResults, searchExecuted } = state;
  const isMobileView = useMobileView();
  // columns의 선언 및 초기화를 useTable 호출 이전으로 이동
  const columns = React.useMemo(() => {
    const baseColumns = [
      {
        Header: "제품명",
        accessor: "name",
        width: isMobileView ? 150 : 300, // 모바일 화면에서 너비 조정
      },
      {
        Header: "기능성",
        accessor: "functionalities",
        Cell: ({ cell: { value } }) => value.join(", "),
        width: isMobileView ? 200 : 1000, // 모바일 화면에서 너비 조정
      },
      {
        Header: "제조사명",
        accessor: "company",
        width: isMobileView ? 150 : 300, // 모바일 화면에서 너비 조정
      },
    ];

    // 모바일 화면이 아닐 때만 추가할 컬럼들
    if (!isMobileView) {
      baseColumns.unshift(
        { Header: "신고번호", accessor: "reportNo", width: 200 },
        { Header: "제품 구분", accessor: "originType", width: 80 }
      );
    }

    return baseColumns;
  }, [isMobileView]);

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
            {headerGroup.headers.map((column) => (
              <TableHeaderCell
                {...column.getHeaderProps()}
                width={column.width}>
                {column.render("Header")}
              </TableHeaderCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableBodyRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableDataCell
                    {...cell.getCellProps()}
                    width={cell.column.width}>
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
