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
    const { id, menuCategoryIds, ...payload } = req.body;
    const exitedMenu = await prisma.menu.findFirst({ where: { id } });
    if (!exitedMenu) return res.status(400).send("Bad Request");
    return res.status(200).json({ message: "OK PUT menu" });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const exitedMenu = await prisma.menu.findFirst({ where: { id } });
    if (!exitedMenu) return res.status(400).send("Bad Request");
    await prisma.menu.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).send("Delete");
  }
  res.status(405).json({ message: "Not Found" });
}
