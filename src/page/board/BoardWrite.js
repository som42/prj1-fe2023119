import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast(); //Toast로 잘되든 안되든 요청 결과를 보여 주면 된다.
  const navigate = useNavigate();

  function handleSubmit() {
    // 저장 버튼 누르자 마자
    setIsSubmitting(true);

    // js로 포트 요청.
    axios
      .post("/api/board/add", {
        title,
        content,
      })
      // 잘 됬으면
      .then(() => {
        toast({
          description: "새 글이 저장되었습니다.",
          status: "success",
        });
        navigate("/"); // 저장이 끝났으면 홈으로 이동
      })
      // 잘 안됬으면
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 400) {
          toast({
            description: "작성한 내용을 확인해주세요.",
            status: "error",
          });
        } else {
          toast({
            description: "저장 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      // 위에 두개가 다 끝나면 이건 무조건 실행된다.
      .finally(() => setIsSubmitting(false));
  }

  return (
    <Box>
      <h1>게시물 작성</h1>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          {/*컴포넌트가 새로 그려질때마다 저장 하는 공간이 스테이트*/}
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Textarea>
        </FormControl>

        <Button
          isDisabled={isSubmitting}
          onClick={handleSubmit}
          colorScheme="blue"
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}
