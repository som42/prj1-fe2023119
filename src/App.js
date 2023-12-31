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
import LogInProvider from "./component/LogInProvider";

const routes = createBrowserRouter(
  createRoutesFromElements(
    // 전체 화면의 틀(navbar 를 가지고 있다) 큰틀이라서 layout 이라는 폴더안에
    <Route path="/" element={<HomeLayout />}>
      {/*게시물에 목록을 보여주는 localhost:3000 페이지가 변경 되는 폴더들은 page 폴더안에 */}
      {/* "/" 여기로 가면 boardList 가 보인다.*/}
      <Route index element={<BoardList />} />
      {/*게시물을 쓰는 컴포넌트 localhost:3000/Write*/}
      <Route path="write" element={<BoardWrite />} />
      {/* 게시물 보는 곳으로 가기 */}
      <Route path="board/:id" element={<BoardView />} />
      {/*게시물 수정 화면*/}
      <Route path="edit/:id" element={<BoardEdit />}></Route>
      <Route path="signup" element={<MemberSignup />} />
      <Route path="member/list" element={<MemberList />} />
      <Route path="member" element={<MemberView />} />
      <Route path="member/edit" element={<MemberEdit />} />
      <Route path="login" element={<MemberLogin />} />
    </Route>,
  ),
);

function App(props) {
  return (
    <LogInProvider>
      <RouterProvider router={routes} />
    </LogInProvider>
  );
}

export default App;
