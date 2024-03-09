import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).json({ message: "OK GET location" });
  } else if (method === "POST") {
    return res.status(200).json({ message: "OK POST location" });
  } else if (method === "PUT") {
    return res.status(200).json({ message: "OK PUT location" });
  } else if (method === "DELETE") {
    return res.status(200).json({ message: "OK DELETE location" });
  }
  res.status(405).json({ message: "Not Found" });
}
