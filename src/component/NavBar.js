import { Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    axios.post("/api/member/logut").then(() => console.log("로그아웃 성공"));
  }

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>home</Button>
      <Button onClick={() => navigate("/write")}>write</Button>
      <Button onClick={() => navigate("/signup")}>signup</Button>
      <Button onClick={() => navigate("/member/list")}>회원목록</Button>
      <Button onClick={() => navigate("/login")}>로그인 </Button>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  );
}
