import {
  border,
  Box,
  Spinner,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function BoardList() {
  const [boardList, setBoardList] = useState(null);

  useEffect(() => {
    axios
      .get("/api/board/list")
      .then((response) => setBoardList(response.data));
  }, []);
  return (
    <Box>
      <h1>게시물 목록</h1>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>title</Th>
              <Th>by</Th>
              <Th>at</Th>
            </Tr>
          </Thead>
        </Table>
        {boardList || <Spinner />}
        {boardList &&
          boardList.map((border) => (
            <Tr>
              <Td>{border.id}</Td>
              <Td>{border.title}</Td>
              <Td>{border.writer}</Td>
              <Td>{border.inserted}</Td>
            </Tr>
          ))}
      </Box>
    </Box>
  );
}
