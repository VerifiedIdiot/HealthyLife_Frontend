import React, { useState, useEffect, useMemo } from "react";
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
  const [userData, setUserData] = useState(null);
  
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

  useEffect(() => {
    if (userEmail) {
      const fetchUserData = async () => {
        try {
          const response = await RankingApi.get(`/myRanking/by-email?email=${userEmail}`);
          setUserData(response.data);
        } catch (error) {
          console.error("사용자 정보 조회 실패: ", error);
        }
      };
      fetchUserData();
    }
  }, [userEmail]);



  if (!userEmail) {
    return <div>Loading...</div>;
  }
  
  return (
    <TableArea $justify="center">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>1</TableHeaderCell>
          <TableHeaderCell>test</TableHeaderCell>
          <TableHeaderCell>여</TableHeaderCell>
          <TableHeaderCell>125</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableDataCell>{userEmail.ranks}</TableDataCell>
          <TableDataCell>{userEmail.nickname}</TableDataCell>
          <TableDataCell>{userEmail.gender}</TableDataCell>
          <TableDataCell>{userEmail.points}</TableDataCell>
        </TableRow>
      </TableBody>
    </TableArea>
  );
};


const PaginationControls = ({ currentPage, totalPages, setPage }) => {
  return (
    <div>
      {currentPage > 1 && <button onClick={() => setPage(currentPage - 1)}>이전</button>}
      {currentPage} / {totalPages}
      {currentPage < totalPages && <button onClick={() => setPage(currentPage + 1)}>다음</button>}
    </div>
  );
};

export const TotalReactTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const pageSize = 5;

  const columns = React.useMemo(
    () => [
      {
        Header: "순위",
        accessor: "ranks",
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

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable(
  //     {
  //       columns,
  //       data,
  //     },
  //     useSortBy
  //   );

  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        const result = await RankingApi.getListByTotal({});
        console.log("토탈:", result)
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
    fetchTotalData();
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);
  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [currentPage, data]);

  const tableInstance = useTable({ columns, data: currentPageData }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;


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
      {/* <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      /> */}
    </>
  );
};

export const SeasonReactTable = () => {
  const [data, setData] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "순위",
        accessor: "ranks",
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
        const result = await RankingApi.getListBySeason({});
        console.log("시즌:", result)
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



export const MaleReactTable = () => {
  const [data, setData] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "순위",
        accessor: "ranks",
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
          const result = await RankingApi.getListBySeason({});
          console.log("시즌:", result);
          result.sort((a, b) => b.points - a.points);
    
          const maleData = result.filter(item => item.gender === '남');
          const rankedData = maleData.map((item, index) => ({
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

export const FemaleReactTable = () => {
  const [data, setData] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "순위",
        accessor: "ranks",
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
          const result = await RankingApi.getListBySeason({});
          console.log("시즌:", result);
          result.sort((a, b) => b.points - a.points);
    
          const maleData = result.filter(item => item.gender === '여');
          const rankedData = maleData.map((item, index) => ({
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