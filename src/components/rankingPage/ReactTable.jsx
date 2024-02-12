import React from "react";
import {
  TableArea,
  TableHeader,
  TableRow,
  TableBody,
  TableHeaderCell,
  TableDataCell,
} from "./RankingStyle";

const ReactTable = () => {

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
        <TableDataCell>내용</TableDataCell>
        </TableRow>
      </TableBody>
    </TableArea>
  );
};
export default ReactTable;
