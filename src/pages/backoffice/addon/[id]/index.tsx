import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

const AddonDetails = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const { addons } = useAppSelector((store) => store.addon);
  const addon = addons.find((item) => item.id === id);

  return (
    <BackofficeLayout>
      <Box>{id}</Box>
    </BackofficeLayout>
  );
};

export default AddonDetails;
