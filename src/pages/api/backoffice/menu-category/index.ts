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
    const { name, isAvailable, companyId } = req.body;
    const isValid = name && isAvailable !== undefined && companyId;
    if (!isValid) return res.status(400).send("Bad Request");
    const menuCategory = await prisma.menuCategory.create({
      data: { name, isAvailable, companyId },
    });
    return res.status(201).json({ menuCategory });
  } else if (method === "PUT") {
    const { id, ...payload } = req.body;
    const existedMenuCategory = await prisma.menuCategory.findFirst({
      where: { id },
    });
    if (!existedMenuCategory) return res.status(400).send("Bad Request");
    // const isValid = name && isAvailable !== undefined;
    // if (!isValid) return res.status(400).send("Bad Request");
    const updatedMenuCategory = await prisma.menuCategory.update({
      data: payload,
      where: { id },
    });
    return res.status(200).json({ updatedMenuCategory });
  } else if (method === "DELETE") {
    return res.status(200).json({ message: "OK DELETE menu-category" });
  }
  res.status(405).json({ message: "Not Found" });
}
