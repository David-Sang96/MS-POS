/* eslint-disable react-hooks/exhaustive-deps */
import BackofficeLayout from "@/components/BackofficeLayout";
import { useSession } from "next-auth/react";

const BackOfficeApp = () => {
  const { data } = useSession();
  return (
    <BackofficeLayout>
      <h1>BackOffice {data?.user?.email}</h1>
    </BackofficeLayout>
  );
};

export default BackOfficeApp;
