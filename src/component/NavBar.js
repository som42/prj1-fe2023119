import { Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    axios.post("/api/member/logout").then(() => console.log("로그아웃 성공"));
  }

  return (
    <Flex>
      <Button bg={"red.100"} onClick={() => navigate("/")}>
        home
      </Button>
      <Button bg={"red.200"} onClick={() => navigate("/write")}>
        write
      </Button>
      <Button bg={"red.300"} onClick={() => navigate("/signup")}>
        signup
      </Button>
      <Button bg={"red.400"} onClick={() => navigate("/member/list")}>
        회원목록
      </Button>
      <Button bg={"red.500"} onClick={() => navigate("/login")}>
        로그인{" "}
      </Button>
      <Button bg={"red.600"} onClick={handleLogout}>
        로그아웃
      </Button>
    </Flex>
  );
}
