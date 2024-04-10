import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).json({ message: "OK GET table" });
  } else if (method === "POST") {
    const { name, locationId, assetUrl } = req.body;
    const isValid = name && locationId && assetUrl !== undefined;
    if (!isValid) return res.status(400).send("Bad Request");
    const table = await prisma.table.create({
      data: { name, locationId, assetUrl },
    });
    return res.status(201).json({ table });
  } else if (method === "PUT") {
    const { id, name, locationId, assetUrl } = req.body;
    const isValid = name && locationId && assetUrl !== undefined && id;
    if (!isValid) return res.status(400).send("Bad Request");
    const isExisted = await prisma.table.findFirst({ where: { id } });
    if (!isExisted) return res.status(400).send("Bad Request");
    const table = await prisma.table.update({
      data: { name, locationId, assetUrl },
      where: { id },
    });
    return res.status(200).json({ table });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const exitedTable = await prisma.table.findFirst({ where: { id } });
    if (!exitedTable) return res.status(400).send("Bad Request");
    await prisma.table.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).send("Deleted");
  }
  res.status(405).json({ message: "Invalid Method" });
}
