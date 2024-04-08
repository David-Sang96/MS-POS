import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).json({ message: "OK GET menu" });
  } else if (method === "POST") {
    const { name, price, menuCategoryIds } = req.body;
    const isValid = name && price !== undefined && menuCategoryIds.length !== 0;
    if (!isValid) return res.status(400).send("Bad Request");
    const menu = await prisma.menu.create({ data: { name, price } });
    const menuCategoryMenus = await prisma.$transaction(
      menuCategoryIds.map((menuCategoryId: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId },
        })
      )
    );
    return res.status(201).json({ menu, menuCategoryMenus });
  } else if (method === "PUT") {
    const { id, isAvailable, locationId, name, price, menuCategoryIds } =
      req.body;
    const exitedMenu = await prisma.menu.findFirst({ where: { id } });
    if (!exitedMenu) return res.status(400).send("Bad Request");
    const menu = await prisma.menu.update({
      data: { name, price },
      where: { id },
    });

    if (locationId && isAvailable !== undefined) {
      const isExisted = await prisma.disabledLocationMenu.findFirst({
        where: { menuId: id, locationId },
      });
      if (isAvailable === false && !isExisted) {
        await prisma.disabledLocationMenu.create({
          data: { menuId: id, locationId },
        });
      }
      if (isAvailable === true && isExisted) {
        await prisma.disabledLocationMenu.delete({
          where: { id: isExisted.id },
        });
      }
    }

    if (menuCategoryIds) {
      const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuId: id },
      });
      //Remove from dataBase
      const toRemove = menuCategoryMenus.filter(
        (item) => !menuCategoryIds.includes(item.menuCategoryId)
      );
      if (toRemove.length) {
        await prisma.$transaction(
          toRemove.map((item) =>
            prisma.menuCategoryMenu.delete({ where: { id: item.id } })
          )
        );
      }
      //Add to dataBase
      const toAdd = menuCategoryIds.filter(
        (menuCategoryId: number) =>
          !menuCategoryMenus.find(
            (item) => item.menuCategoryId === menuCategoryId
          )
      );

      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((menuCategoryId: number) =>
            prisma.menuCategoryMenu.create({
              data: { menuId: id, menuCategoryId },
            })
          )
        );
      }
    }

    const currentLocation = await prisma.location.findFirst({
      where: { id: locationId },
    });
    const locations = await prisma.location.findMany({
      where: { companyId: currentLocation?.companyId },
    });
    const locationIds = locations.map((item) => item.id);
    const disabledLocationMenus = await prisma.disabledLocationMenu.findMany({
      where: { locationId: { in: locationIds } },
    });
    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId: currentLocation?.companyId },
    });
    const menuCategoryId = menuCategories.map((item) => item.id);
    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryId } },
    });

    return res
      .status(200)
      .json({ menu, disabledLocationMenus, menuCategoryMenus });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const exitedMenu = await prisma.menu.findFirst({ where: { id } });
    if (!exitedMenu) return res.status(400).send("Bad Request");
    await prisma.menu.update({ data: { isArchived: true }, where: { id } });
    await prisma.menuCategoryMenu.deleteMany({ where: { menuId: id } });
    return res.status(200).send("Delete");
  }
  res.status(405).json({ message: "Not Found" });
}
