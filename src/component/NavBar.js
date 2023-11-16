import { Button, Flex, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { LoginContext } from "./LogInProvider";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const toast = useToast();

  const navigate = useNavigate();

  const urlParams = new URLSearchParams();

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== "") {
    urlParams.set("id", login.id);
  }

  function handleLogout() {
    axios.post("/api/member/logout").then(() => {
      toast({
        description: "로그아웃 되었습니다.",
        status: "info",
      });
      navigate("/");
    });
  }

  return (
    <Flex>
      <Button bg="red.100" onClick={() => navigate("/")}>
        home
      </Button>
      {isAuthenticated() && (
        <Button bg="red.200" onClick={() => navigate("/write")}>
          write
        </Button>
      )}
      {isAuthenticated() || (
        <Button bg="red.300" onClick={() => navigate("/signup")}>
          signup
        </Button>
      )}
      {isAdmin() && (
        <Button bg="red.400" onClick={() => navigate("/member/list")}>
          회원목록
        </Button>
      )}
      {isAuthenticated() && (
        <Button
          bg="blue.100"
          onClick={() => navigate("/member?" + urlParams.toString())}
        >
          회원 정보
        </Button>
      )}
      {isAuthenticated() || (
        <Button bg="red.500" onClick={() => navigate("/login")}>
          로그인
        </Button>
      )}
      {isAuthenticated() && (
        <Button bg="red.600" onClick={handleLogout}>
          로그아웃
        </Button>
      )}
    </Flex>
  );
}
