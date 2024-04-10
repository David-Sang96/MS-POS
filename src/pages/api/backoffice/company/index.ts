import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).json({ message: "OK GET table" });
  } else if (method === "PUT") {
    const { id, name, street, township, city } = req.body;
    const isValid = name && street && township && id && city;
    if (!isValid) return res.status(400).send("Bad Request");
    const isExisted = await prisma.company.findFirst({ where: { id } });
    if (!isExisted) return res.status(400).send("Bad Request");
    const company = await prisma.company.update({
      data: { name, street, township, city },
      where: { id },
    });
    return res.status(200).json({ company });
  }
  res.status(405).json({ message: "Invalid Method" });
}
