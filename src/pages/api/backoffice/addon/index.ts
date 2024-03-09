import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).json({ message: "OK GET addon" });
  } else if (method === "POST") {
    return res.status(200).json({ message: "OK POST addon" });
  } else if (method === "PUT") {
    return res.status(200).json({ message: "OK PUT addon" });
  } else if (method === "DELETE") {
    return res.status(200).json({ message: "OK DELETE addon" });
  }
  res.status(405).json({ message: "Not Found" });
}
