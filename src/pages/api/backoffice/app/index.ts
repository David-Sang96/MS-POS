import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const session = await getSession({ req });
    if (session) {
      const { user } = session;
      if (!user) return res.status(401).send("Unauthorized.");
      const name = user.name as string;
      const email = user.email as string;
      const existedUser = await prisma.user.findFirst({ where: { email } });
      if (existedUser) {
        //get latest data for this user
        const companyId = existedUser.companyId;
        const company = await prisma.company.findFirst({
          where: { id: companyId },
        });
        const locations = await prisma.location.findMany({
          where: { companyId, isArchived: false },
          orderBy: [{ id: "asc" }],
        });
        const menuCategories = await prisma.menuCategory.findMany({
          where: { companyId, isArchived: false },
          orderBy: [{ id: "asc" }],
        });
        const menuCategoryIds = menuCategories.map((item) => item.id);
        const disableLocationMenuCategories =
          await prisma.disabledLocationMenuCategory.findMany({
            where: { menuCategoryId: { in: menuCategoryIds } },
          });
        const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
          where: { menuCategoryId: { in: menuCategoryIds } },
        });
        const menuIds = menuCategoryMenus.map((item) => item.menuId);
        const disableLocationMenus = await prisma.disabledLocationMenu.findMany(
          { where: { menuId: { in: menuIds } } }
        );
        const menus = await prisma.menu.findMany({
          where: { id: { in: menuIds }, isArchived: false },
          orderBy: [{ id: "asc" }],
        });
        const menuAddonCategories = await prisma.menuAddonCategory.findMany({
          where: { menuId: { in: menuIds } },
        });
        const addonCategoryIds = menuAddonCategories.map(
          (item) => item.addonCategoryId
        );
        const addonCategories = await prisma.addonCategory.findMany({
          where: { id: { in: addonCategoryIds }, isArchived: false },
          orderBy: [{ id: "asc" }],
        });
        const addons = await prisma.addon.findMany({
          where: {
            addonCategoryId: { in: addonCategoryIds },
            isArchived: false,
          },
          orderBy: [{ id: "asc" }],
        });
        const locationIds = locations.map((item) => item.id);
        const tables = await prisma.table.findMany({
          where: { locationId: { in: locationIds }, isArchived: false },
          orderBy: [{ id: "asc" }],
        });
        return res.status(200).json({
          company,
          locations,
          menuCategories,
          disableLocationMenuCategories,
          menuCategoryMenus,
          menus,
          disableLocationMenus,
          menuAddonCategories,
          addonCategories,
          addons,
          tables,
        });
      } else {
        //add new user to user model
        const newCompany = await prisma.company.create({
          data: {
            name: "default company",
            street: "default street",
            township: "default township",
            city: "default city",
          },
        });
        await prisma.user.create({
          data: { name, email, companyId: newCompany.id },
        });
        const location = await prisma.location.create({
          data: {
            name: "default location",
            street: "default street",
            township: "default township",
            city: "default city",
            companyId: newCompany.id,
          },
        });
        const table = await prisma.table.create({
          data: {
            name: "default table",
            locationId: location.id,
            assetUrl: "",
          },
        });
        const menuCategory = await prisma.menuCategory.create({
          data: {
            name: "default menuCategory",
            companyId: newCompany.id,
          },
        });
        const menu = await prisma.menu.create({
          data: {
            name: "default menu",
            price: 1000,
            description: "default description",
            assetUrl: "",
          },
        });
        const menuCategoryMenu = await prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId: menuCategory.id },
        });
        const addonCategory = await prisma.addonCategory.create({
          data: { name: "default addonCategory" },
        });
        const menuAddonCategory = await prisma.menuAddonCategory.create({
          data: { menuId: menu.id, addonCategoryId: addonCategory.id },
        });
        const addonArr = [
          { name: "default addon 1", addonCategoryId: addonCategory.id },
          { name: "default addon 2", addonCategoryId: addonCategory.id },
          { name: "default addon 3", addonCategoryId: addonCategory.id },
        ];
        const addon = await prisma.$transaction(
          addonArr.map((item) => prisma.addon.create({ data: item }))
        );
        return res.status(201).json({
          newCompany,
          menuCategories: [menuCategory],
          disableLocationMenuCategories: [],
          menus: [menu],
          disableLocationMenus: [],
          menuCategoryMenus: [menuCategoryMenu],
          addonCategories: [addonCategory],
          menuAddonCategories: [menuAddonCategory],
          addons: addon,
          locations: [location],
          tables: [table],
        });
      }
    }
  } else if (method === "POST") {
    return res.status(200).json({ message: "OK POST app" });
  } else if (method === "PUT") {
    return res.status(200).json({ message: "OK PUT app" });
  } else if (method === "DELETE") {
    return res.status(200).json({ message: "OK DELETE app" });
  }
  res.status(405).json({ message: "Invalid Method" });
}
