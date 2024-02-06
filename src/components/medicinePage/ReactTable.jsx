import React from "react";
import { useSearch } from "../../contexts/SearchContext";
import { useTable } from "react-table";

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
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReactTable;
