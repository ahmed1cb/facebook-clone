import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
