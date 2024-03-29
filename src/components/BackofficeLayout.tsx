/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import SnackBarBox from "./SnackBarBox";

interface Props {
  children?: ReactNode;
}

const BackofficeLayout = ({ children }: Props) => {
  const { data } = useSession();
  const dispatch = useAppDispatch();
  const { init } = useAppSelector((store) => store.app);

  useEffect(() => {
    if (!init) {
      dispatch(appData());
    }
  }, [init]);

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
