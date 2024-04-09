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
    return res.status(200).json({ message: "OK POST table" });
  } else if (method === "PUT") {
    return res.status(200).json({ message: "OK PUT table" });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const exitedTable = await prisma.table.findFirst({ where: { id } });
    if (!exitedTable) return res.status(400).send("Bad Request");
    await prisma.table.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).send("Deleted");
  }
  res.status(405).json({ message: "Invalid Method" });
}
