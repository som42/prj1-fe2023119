import React, { createContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/HomeLayout";
import { BoardList } from "./page/board/BoardList";
import { BoardWrite } from "./page/board/BoardWrite";
import { BoardView } from "./page/board/BoardView";
import { BoardEdit } from "./page/board/BoardEdit";
import { MemberSignup } from "./page/member/MemberSignup";
import { MemberList } from "./page/member/MemberList";
import { MemberView } from "./page/member/MemberView";
import { MemberEdit } from "./page/member/MemberEdit";
import { MemberLogin } from "./page/member/MemberLogin";
import axios from "axios";

const routes = createBrowserRouter(
  // 전체 화면의 틀
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      {/*페이지가 변경될때 보이는 컴포넌트 */}
      <Route index element={<BoardList />} />
      <Route path="write" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="edit/:id" element={<BoardEdit />}></Route>
      <Route path="signup" element={<MemberSignup />} />
      <Route path="member/list" element={<MemberList />} />
      <Route path="member" element={<MemberView />} />
      <Route path="member/edit" element={<MemberEdit />} />
      <Route path="login" element={<MemberLogin />} />
    </Route>,
  ),
);

export const LoginContext = createContext(null);

function App(props) {
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

  return (
    <LoginContext.Provider
      value={{ login, fetchLogin, isAuthenticated, hasAccess }}
    >
      <RouterProvider router={routes} />;
    </LoginContext.Provider>
  );
}

export default App;
