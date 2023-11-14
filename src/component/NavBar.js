import { Flex, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../App";

export function NavBar() {
  // 세션이 지금 서버에 있어서 클라이언트 한테 건네줄수있는 코드를 계쏙 넣어줘야 한다.
  const { fetchLogin, login, isAuthenticated } = useContext(LoginContext);
  const toast = useToast();

  const navigate = useNavigate();

  function handleLogout() {
    // TODO : 로그아웃 후 할 일 추가
    axios
      .post("/api/member/logout")
      .then(() => {
        toast({
          description: "로그아웃 되었습니다",
          status: "info",
        });
        navigate("/");
      })
      .finally(() => fetchLogin());
  }

  return (
    <Flex>
      <Button bg={"red.100"} onClick={() => navigate("/")}>
        home
      </Button>
      {isAuthenticated() && (
        <Button bg={"red.200"} onClick={() => navigate("/write")}>
          write
        </Button>
      )}
      {isAuthenticated() || (
        <Button bg={"red.300"} onClick={() => navigate("/signup")}>
          signup
        </Button>
      )}
      {isAuthenticated() && (
        <Button bg={"red.400"} onClick={() => navigate("/member/list")}>
          회원목록
        </Button>
      )}
      {isAuthenticated || (
        <Button bg={"red.500"} onClick={() => navigate("/login")}>
          로그인{" "}
        </Button>
      )}
      {isAuthenticated && (
        <Button bg={"red.600"} onClick={handleLogout}>
          로그아웃
        </Button>
      )}
    </Flex>
  );
}
