import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).json({ message: "OK GET addon-category" });
  } else if (method === "POST") {
    const { name, isRequired, menuIds } = req.body;
    const isValid = name && isRequired !== undefined && menuIds.length;
    if (!isValid) return res.status(400).send("Bad Request");
    const addonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });
    const menuAddonCategory = await prisma.$transaction(
      menuIds.map((menuId: number) =>
        prisma.menuAddonCategory.create({
          data: { menuId, addonCategoryId: addonCategory.id },
        })
      )
    );
    return res.status(201).json({ addonCategory, menuAddonCategory });
  } else if (method === "PUT") {
    const { id, name, isRequired, menuIds, locationId } = req.body;
    const isValid =
      name && isRequired !== undefined && menuIds.length !== 0 && locationId;
    if (!isValid) return res.status(400).send("Bad Request");
    const isExisted = await prisma.addonCategory.findFirst({ where: { id } });
    if (!isExisted) return res.status(400).send("Bad Request.");
    const addonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id },
    });
    if (menuIds) {
      const existingMenuAddonCategories =
        await prisma.menuAddonCategory.findMany({
          where: { addonCategoryId: id },
        });
      const toRemove = existingMenuAddonCategories.filter(
        (item) => !menuIds.includes(item.menuId)
      );
      if (toRemove.length) {
        await prisma.menuAddonCategory.deleteMany({
          where: { id: { in: toRemove.map((item) => item.id) } },
        });
      }
      const toAdd = menuIds.filter(
        (menuId: number) =>
          !existingMenuAddonCategories.find((item) => item.menuId === menuId)
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((menuId: number) =>
            prisma.menuAddonCategory.create({
              data: { menuId, addonCategoryId: id },
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
    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId: { in: locations.map((item) => item.id) } },
    });
    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategories.map((item) => item.id) } },
    });
    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: menuCategoryMenus.map((item) => item.menuId) } },
    });
    return res.status(200).json({ addonCategory, menuAddonCategories });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const existedAddonCategory = await prisma.addonCategory.findFirst({
      where: { id },
    });
    if (!existedAddonCategory) return res.status(400).send("Bad Request");
    await prisma.addonCategory.update({
      data: { isArchived: true },
      where: { id },
    });
    await prisma.menuAddonCategory.deleteMany({
      where: { addonCategoryId: id },
    });

    return res.status(200).send("Deleted");
  }
  res.status(405).json({ message: "Invalid Method" });
}
