import React , { useEffect } from "react";
import styled from "styled-components";
import { useSearch } from "../../contexts/SearchContext";
import { useTable } from "react-table";

const TableArea = styled.table`
   border: 1px solid black;
`
const TableHeader = styled.thead`
  vertical-align: middle;
  
  height: 50px;
  border: 1px solid black;
`
const TableRow = styled.tr`
    min-height: 60px; /* 원하는 높이로 조정하세요 */
    vertical-align: middle;
    box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
    border: 1px solid black;
`
const TableHeaderCell = styled.th`
    height: 60px; 
  text-align: center; 
  vertical-align: middle;
  width: ${(props) => `${props.width}px`};
  border: 1px solid black;
`
const TableBody = styled.tbody`
vertical-align: middle;

  
`
const TableDataCell = styled.td`
  height: 8vh; 
  vertical-align: middle;
  padding-left: 5px;
  width: ${(props) => `${props.width}px`};
  border: 1px solid black;
`

const ReactTable = () => {
  const { state , actions} = useSearch();
  const { searchResults, searchExecuted } = state;
  


  


  // columns의 선언 및 초기화를 useTable 호출 이전으로 이동
  const columns = React.useMemo(
    () => [
      {
        Header: "신고번호",
        accessor: "reportNo",
        width: 200,
      },
      {
        Header: "제품명",
        accessor: "name",
        width: 300,
      },
      {
        Header: "제품 구분",
        accessor: "originType",
        width: 80,
      },

      {
        Header: "기능성",
        accessor: "functionalities",
        Cell: ({ cell: { value } }) => value.join(", "), // 배열을 문자열로 변환
        width: 1000,
      },
      {
        Header: "제조사명",
        accessor: "company",
        width: 300,
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
    data: Array.isArray(searchResults) ? searchResults : [],
  });
  
  return (

    
    <TableArea {...getTableProps()}>
      <TableHeader>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeaderCell {...column.getHeaderProps()} width={column.width}>
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
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <TableDataCell {...cell.getCellProps()} width={cell.column.width}>
                {cell.render("Cell")}
              </TableDataCell>
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </TableArea>
  );
};

export default ReactTable;
