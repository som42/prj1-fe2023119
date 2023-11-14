import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LoginContext = createContext(null);
function LogInProvider({ children }) {
  const [login, setLogin] = useState("");

  useEffect(() => {
    //   로그인 했는지에 대한 정보를 가져오기
    fetchLogin();
  }, []);

  console.log(login);
  function fetchLogin() {
    axios.get("/api/member/login").then((response) => setLogin(response.data));
  }
  function isAuthenticated() {
    // "" 비어있지 않으면 로그인을 한 상태이다.
    return login !== "";
  }

  function hasAccess(userId) {
    return login.id === userId;
  }

  function isAdmin() {
    // 매니저 인지 아닌지?
    if (login.auth) {
      return login.auth.some((elem) => elem.name === "admin");
    }
    return false;
  }

  return (
    <LoginContext.Provider
      value={{ login, fetchLogin, isAuthenticated, hasAccess, isAdmin }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LogInProvider;
