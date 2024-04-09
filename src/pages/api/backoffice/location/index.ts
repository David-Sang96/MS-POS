import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).json({ message: "OK GET location" });
  } else if (method === "POST") {
    const { name, companyId, street, township, city } = req.body;
    const isValid = name && companyId && street && township && city;
    if (!isValid) return res.status(400).send("Bad Request");
    const location = await prisma.location.create({
      data: { name, companyId, street, township, city },
    });
    return res.status(200).json({ location });
  } else if (method === "PUT") {
    const { id, name, city, street, township } = req.body;
    const isValid = name && street && township && city;
    if (!isValid) return res.status(400).send("Bad Request");
    const existedLocation = await prisma.location.findFirst({ where: { id } });
    if (!existedLocation) return res.status(400).send("Bad Request");
    const updatedLocation = await prisma.location.update({
      data: { name, street, township, city },
      where: { id },
    });
    return res.status(201).json({ updatedLocation });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const existedLocation = await prisma.location.findFirst({ where: { id } });
    if (!existedLocation) return res.status(400).send("Bad Request");
    await prisma.location.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).send("Deleted");
  }
  res.status(405).json({ message: "Invalid Method" });
}
