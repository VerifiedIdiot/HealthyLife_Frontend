import React, { useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import {
  TableArea,
  TableHeader,
  TableRow,
  TableBody,
  TableHeaderCell,
  TableDataCell,
} from "./RankingStyle";
import RankingApi from "../../api/RankingApi";
import Common from "../../utils/Common";

export const MyReactTable = () => {
  const [userEmail, setEmail] = useState(null);
  
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await Common.TakenToken();
        const userEmail = response.data;
        console.log(userEmail);
        setEmail(response.data);
        
      } catch (error) {
        console.log("이메일 조회 실패 : " + error);
      }
    };
    fetchUserEmail();
  }, []);

  if (!userEmail) {
    return <div>Loading...</div>;
  }
  
  return (
    <TableArea $justify="center">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>순위</TableHeaderCell>
          <TableHeaderCell>닉네임</TableHeaderCell>
          <TableHeaderCell>성별</TableHeaderCell>
          <TableHeaderCell>포인트</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableDataCell>{userEmail.rank}</TableDataCell>
          <TableDataCell>{userEmail.nickname}</TableDataCell>
          <TableDataCell>{userEmail.gender}</TableDataCell>
          <TableDataCell>{userEmail.points}</TableDataCell>
        </TableRow>
      </TableBody>
    </TableArea>
  );
};

export const TotalReactTable = () => {
  const [data, setData] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "순위",
        accessor: "rank",
        width: 200,
      },
      {
        Header: "닉네임",
        accessor: "nickname",
        width: 200,
      },
      {
        Header: "성별",
        accessor: "gender",
        width: 200,
      },
      {
        Header: "포인트",
        accessor: "points",
        width: 200,
      },
    ],
    []
  );

  // useTable 훅을 사용하여 테이블 관련 프로퍼티들을 가져옵니다.
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  useEffect(() => {
    const fetchSeasonData = async () => {
      try {
        const result = await RankingApi.getListByTotal({});
        result.sort((a, b) => b.points - a.points);
        const rankedData = result.map((item, index) => ({
          ...item,
          rank: index + 1,
        }));
        setData(rankedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeasonData();
  }, []);

  return (
    <>
      <TableArea $justify="center" {...getTableProps()}>
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeaderCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  width={column.width}
                >
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
                  return (
                    <TableDataCell
                      {...cell.getCellProps()}
                      width={cell.column.width}
                    >
                      {cell.render("Cell")}
                    </TableDataCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableArea>
    </>
  );
};
