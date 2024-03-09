import { Box, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box>
      <Typography variant="h1">Landing Site</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Link href={"/backoffice"}>BackOffice</Link>
        <Link href={"/order"}>Order</Link>
      </Box>
    </Box>
  );
}
