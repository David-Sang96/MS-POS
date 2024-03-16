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
    const { name, isAvailable } = req.body;
    const isValid = name;
    if (!isValid) return res.status(400).send("Bad Request");
    const menuCategory = await prisma.menuCategory.create({
      data: { name, isAvailable },
    });
    return res.status(201).json({ menuCategory });
  } else if (method === "PUT") {
    return res.status(200).json({ message: "OK PUT menu-category" });
  } else if (method === "DELETE") {
    return res.status(200).json({ message: "OK DELETE menu-category" });
  }
  res.status(405).json({ message: "Not Found" });
}
