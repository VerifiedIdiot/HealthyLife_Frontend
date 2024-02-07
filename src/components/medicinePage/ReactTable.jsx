import React from "react";
import styled from "styled-components";
import { useSearch } from "../../contexts/SearchContext";
import { useTable } from "react-table";

const TableArea = styled.table`
   
`
const TableHeader = styled.thead`
  vertical-align: middle;
  
  height: 50px;
  
`
const TableRow = styled.tr`
    min-height: 60px; /* 원하는 높이로 조정하세요 */
    vertical-align: middle;
    box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
`
const TableHeaderCell = styled.th`
    height: 60px; 
  text-align: center; 
  vertical-align: middle;
  
`
const TableBody = styled.tbody`
vertical-align: middle;

  
`
const TableDataCell = styled.td`
  height: 8vh; 
  vertical-align: middle;
  padding-left: 5px;
`

const ReactTable = () => {
  const { state } = useSearch();
  const { searchResults } = state;

  // columns의 선언 및 초기화를 useTable 호출 이전으로 이동
  const columns = React.useMemo(
    () => [
      {
        Header: "신고번호",
        accessor: "reportNo",
      },
      {
        Header: "제품명",
        accessor: "name",
      },
      {
        Header: "제품 구분",
        accessor: "originType",
      },

      {
        Header: "기능성",
        accessor: "functionalities",
        Cell: ({ cell: { value } }) => value.join(", "), // 배열을 문자열로 변환
      },
      {
        Header: "제조사명",
        accessor: "company",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: searchResults,
  });

  return (
    <TableArea {...getTableProps()}>
      <TableHeader>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeaderCell {...column.getHeaderProps()}>{column.render("Header")}</TableHeaderCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <TableDataCell {...cell.getCellProps()}>{cell.render("Cell")}</TableDataCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </TableArea>
  );
};

export default ReactTable;
