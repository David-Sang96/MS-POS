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
    return res.status(200).json({ message: "OK POST addon" });
  } else if (method === "PUT") {
    return res.status(200).json({ message: "OK PUT addon" });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const existedAddon = await prisma.addon.findFirst({ where: { id } });
    if (!existedAddon) return res.status(400).send("Bad Request");
    await prisma.addon.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).send("Deleted");
  }
  res.status(405).json({ message: "Not Found" });
}
