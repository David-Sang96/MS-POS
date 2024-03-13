import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import SnackBarBox from "./SnackBarBox";

interface Props {
  children?: ReactNode;
}

const BackofficeLayout = ({ children }: Props) => {
  const { data } = useSession();

  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar />
      <Box sx={{ display: "flex", height: "92%" }}>
        {data && <SideBar />}
        <Box sx={{ width: "100%", p: 2 }}> {children}</Box>
      </Box>
      <SnackBarBox />
    </Box>
  );
};

export default BackofficeLayout;
