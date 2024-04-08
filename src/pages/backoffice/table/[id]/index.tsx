import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

const TableDetails = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const { tables } = useAppSelector((store) => store.table);
  const table = tables.find((item) => item.id === id);

  return (
    <BackofficeLayout>
      <Box>{id}</Box>
    </BackofficeLayout>
  );
};

export default TableDetails;
