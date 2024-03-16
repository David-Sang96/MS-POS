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
    console.log(req.body);
    const { name, price } = req.body;
    const isValid = name && price !== undefined;
    if (!isValid) return res.status(400).send("Bad Request");
    const menu = await prisma.menu.create({ data: { name, price } });
    return res.status(201).json({ menu });
  } else if (method === "PUT") {
    return res.status(200).json({ message: "OK PUT menu" });
  } else if (method === "DELETE") {
    return res.status(200).json({ message: "OK DELETE menu" });
  }
  res.status(405).json({ message: "Not Found" });
}
