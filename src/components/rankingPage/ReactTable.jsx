import React, { useEffect } from "react";
import {
  TableArea,
  TableHeader,
  TableRow,
  TableBody,
  TableHeaderCell,
  TableDataCell,
} from "./RankingStyle";
import RankingApi from "../../api/RankingApi";
import { useTable } from "react-table";

export const MyReactTable = () => {
  
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
    </TableArea>
  );
};

export const TotalReactTable = () => {
  // useTable 훅을 사용하여 테이블 관련 프로퍼티들을 가져옵니다.
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

  useEffect(() => {
    const fetchSeasonData = async () => {
      const result = await RankingApi.getListBySeason({

      });
      console.log("이게맞나",result);
    };
    fetchSeasonData();
  });
  return (
    <>
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
        <TableDataCell>내용</TableDataCell>

        </TableRow>
      </TableBody>
    </TableArea>
    </>
  )
}

