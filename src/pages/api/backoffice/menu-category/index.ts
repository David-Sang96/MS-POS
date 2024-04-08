import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).json({ message: "OK GET menu-category" });
  } else if (method === "POST") {
    const { name, companyId } = req.body;
    const isValid = name && companyId;
    if (!isValid) return res.status(400).send("Bad Request");
    const menuCategory = await prisma.menuCategory.create({
      data: { name, companyId },
    });
    return res.status(201).json({ menuCategory });
  } else if (method === "PUT") {
    const { id, locationId, isAvailable, companyId, ...payload } = req.body;
    const existedMenuCategory = await prisma.menuCategory.findFirst({
      where: { id },
    });
    if (!existedMenuCategory) return res.status(400).send("Bad Request");
    const updatedMenuCategory = await prisma.menuCategory.update({
      data: payload,
      where: { id },
    });

    if (locationId && isAvailable !== undefined) {
      const isExisted = await prisma.disabledLocationMenuCategory.findFirst({
        where: { locationId, menuCategoryId: id },
      });
      if (isAvailable === false && !isExisted) {
        await prisma.disabledLocationMenuCategory.create({
          data: { menuCategoryId: id, locationId },
        });
      }
      if (isAvailable === true && isExisted) {
        await prisma.disabledLocationMenuCategory.delete({
          where: { id: isExisted?.id },
        });
      }
    }
    // const menuCategories = await prisma.menuCategory.findMany({
    //   where: { companyId },
    // });
    // const menuCategoryIds = menuCategories.map((item) => item.id);
    const locations = await prisma.location.findMany({ where: { companyId } });
    const locationIds = locations.map((item) => item.id);
    const disabledLocationMenuCategories =
      await prisma.disabledLocationMenuCategory.findMany({
        where: { locationId: { in: locationIds } },
      });
    return res
      .status(200)
      .json({ updatedMenuCategory, disabledLocationMenuCategories });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isExisted = await prisma.menuCategory.findFirst({
      where: { id },
    });
    if (!isExisted) return res.status(400).send("Bad Request");
    await prisma.menuCategory.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("Deleted");
  }
  res.status(405).json({ message: "Not Found" });
}
