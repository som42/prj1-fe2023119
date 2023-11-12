  import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/HomeLayout";
import { BoardList } from "./page/BoardList";
import { BoardWrite } from "./page/BoardWrite";
import { BoardView } from "./page/BoardView";

const routes = createBrowserRouter(
  // 전체 화면의 틀
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      {/*페이지가 변경될때 보이는 컴포넌트 */}
      <Route index element={<BoardList />} />
      <Route path="write" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
    </Route>,
  ),
);

function App(props) {
  return <RouterProvider router={routes} />;
}

export default App;
