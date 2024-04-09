import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).json({ message: "OK GET addon" });
  } else if (method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    const isValid = name && price !== undefined && addonCategoryId;
    if (!isValid) return res.status(400).send("Bad Request");
    const addon = await prisma.addon.create({
      data: { name, price, addonCategoryId },
    });

    return res.status(201).json({ addon });
  } else if (method === "PUT") {
    const { name, price, addonCategoryId, id } = req.body;
    const isValid = name && price !== undefined && addonCategoryId;
    if (!isValid) return res.status(400).send("Bad Request");
    const isExisted = await prisma.addon.findFirst({ where: { id } });
    if (!isExisted) return res.status(400).send("Bad Request");
    const addon = await prisma.addon.update({
      data: { name, price, addonCategoryId },
      where: { id },
    });
    return res.status(200).json({ addon });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const existedAddon = await prisma.addon.findFirst({ where: { id } });
    if (!existedAddon) return res.status(400).send("Bad Request");
    await prisma.addon.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).send("Deleted");
  }
  res.status(405).json({ message: "Invalid Method" });
}
