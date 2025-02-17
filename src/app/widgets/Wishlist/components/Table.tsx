"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import * as S from "./Table.style";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import Image from "next/image";




const TableWish: React.FC = ({ wishes }) => {
  const handleDelete = (id: number) => {
    console.log(`Delete wish with id: ${id}`);
  };
  const shareItem = (id: number) => {
    console.log(`share item: ${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {wishes.attributes.wishes.map((wish, i: number) => (
            <TableRow key={wish.id}>
              <S.Cell>{i + 1}</S.Cell>
              <S.Cell>{wish.title}</S.Cell>
              <S.Cell>{wish.description}</S.Cell>
              <S.Cell>{wish.price}</S.Cell>
              <S.Cell>{wish.link}</S.Cell>
              <S.Cell sx={{ display: "flex", justifyContent: "flex-end" }}>
                {wish.image.length > 0 && (
                  <Image
                    loader={() =>
                      `http://localhost:1337${wish.image.data[0].attributes.formats.thumbnail.url}`
                    }
                    src={`http://localhost:1337${wish.image.data[0].attributes.formats.thumbnail.url}`}
                    width={50}
                    height={50}
                    alt="image"
                  />
                )}
                <Tooltip title="Share" aria-label="add">
                  <IconButton onClick={() => shareItem(wish.id)}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" aria-label="delete">
                  <IconButton onClick={() => handleDelete(wish.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </S.Cell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableWish;
