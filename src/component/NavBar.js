import { Button, Flex, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { LoginContext } from "./LogInProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorClosed, faHouseFire } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { faUserGear } from "@fortawesome/free-solid-svg-icons/faUserGear";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons/faDoorOpen";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const toast = useToast();

  const navigate = useNavigate();

  const urlParams = new URLSearchParams();

  const location = useLocation();

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
        <FontAwesomeIcon icon={faHouseFire} />
        home
      </Button>
      {isAuthenticated() && (
        <Button bg="red.200" onClick={() => navigate("/write")}>
          <FontAwesomeIcon icon={faPenToSquare} />
          write
        </Button>
      )}
      {isAuthenticated() || (
        <Button bg="red.300" onClick={() => navigate("/signup")}>
          <FontAwesomeIcon icon={faUserPlus} />
          signup
        </Button>
      )}
      {isAdmin() && (
        <Button bg="red.400" onClick={() => navigate("/member/list")}>
          <FontAwesomeIcon icon={faUsers} />
          회원목록
        </Button>
      )}
      {isAuthenticated() && (
        <Button
          bg="blue.100"
          onClick={() => navigate("/member?" + urlParams.toString())}
        >
          <FontAwesomeIcon icon={faUserGear} />
          회원 정보
        </Button>
      )}
      {isAuthenticated() || (
        <Button bg="red.500" onClick={() => navigate("/login")}>
          <FontAwesomeIcon icon={faDoorClosed} />
          로그인
        </Button>
      )}
      {isAuthenticated() && (
        <Button bg="red.600" onClick={handleLogout}>
          <FontAwesomeIcon icon={faDoorOpen} />
          로그아웃
        </Button>
      )}
    </Flex>
  );
}
