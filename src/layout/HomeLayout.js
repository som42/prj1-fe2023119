import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../component/NavBar";

export function HomeLayout() {
  // 전체 화면의 틀
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
}
