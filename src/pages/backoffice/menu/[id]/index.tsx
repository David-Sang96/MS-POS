import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const MenuDetails = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const { menus } = useAppSelector((store) => store.menu);
  const menu = menus.find((item) => item.id === id);

  if (!menu) {
    return (
      <BackofficeLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Typography>Menu Not Found</Typography>
          <Button
            onClick={() => {
              router.push("/backoffice/menu-category");
            }}
            variant="contained"
            sx={{
              color: "#EEEEEE",
              bgcolor: "#222831",
              "&:hover": { bgcolor: "#240A34" },
              mt: 1,
            }}
          >
            Back
          </Button>
        </Box>
      </BackofficeLayout>
    );
  }

  return (
    <BackofficeLayout>
      <Box>
        <Typography>{menu.name}</Typography>
      </Box>
    </BackofficeLayout>
  );
};

export default MenuDetails;
