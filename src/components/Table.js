import React from "react";
import styled from "styled-components";

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

function Table({ data, headerData }) {
  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          {headerData.map((col) => (
            <TableHeader key={col.id}>{col.name}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.name}>
            {Object.entries(item).map((col) => (
              <TableData key={col[0]}>{col[1]}</TableData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}

export default Table;
