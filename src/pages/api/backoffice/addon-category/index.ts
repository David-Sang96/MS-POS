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
    const isValid = name && isRequired !== undefined && menuIds.length !== 0;
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
    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { addonCategoryId: addonCategory.id },
    });
    return res.status(201).json({ addonCategory, menuAddonCategories });
  } else if (method === "PUT") {
    return res.status(200).json({ message: "OK PUT addon-category" });
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
  res.status(405).json({ message: "Not Found" });
}
