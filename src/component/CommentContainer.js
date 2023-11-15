import { border, Box, Button, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function CommentForm({ boardId }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    axios.post("/api/comment/add", {
      // 어느 게시물에 어떤 댓글
      boardId: boardId,
      comment: comment,
    });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />{" "}
      {/*여러줄 쓸때는 Textarea*/}
      <Button onClick={handleSubmit}>쓰기</Button>
    </Box>
  );
}

function CommentList() {
  return <Box>댓글 리스트</Box>;
}

export function CommentContainer({ boardId }) {
  return (
    <Box>
      <CommentForm boardId={boardId} />
      <CommentList />
    </Box>
  );
}
