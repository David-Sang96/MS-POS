/* eslint-disable react-hooks/exhaustive-deps */
import BackofficeLayout from "@/components/BackofficeLayout";
import { config } from "@/config";
import { useAppDispatch } from "@/store/hooks";
import { setMenuCategory } from "@/store/slices/menuCategorySlice";
import { setMenu } from "@/store/slices/menuSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const BackOfficeApp = () => {
  const { data } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAppData();
  }, []);

  const fetchAppData = async () => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/app`);
    const { menus, menuCategories } = await response.json();
    dispatch(setMenu(menus));
    dispatch(setMenuCategory(menuCategories));
  };
  return (
    <BackofficeLayout>
      <h1>BackOffice {data?.user?.email}</h1>
    </BackofficeLayout>
  );
};

export default BackOfficeApp;
