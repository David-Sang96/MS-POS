import { Box } from "@mui/material";
import { ReactNode } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import SnackBarBox from "./SnackBarBox";

interface Props {
  children?: ReactNode;
}

const BackofficeLayout = ({ children }: Props) => {
  return (
    <Box>
      <NavBar />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box sx={{ bgcolor: "#EEEEEE", width: "100%", p: 2 }}> {children}</Box>
      </Box>
      <SnackBarBox />
    </Box>
  );
};

export default BackofficeLayout;
