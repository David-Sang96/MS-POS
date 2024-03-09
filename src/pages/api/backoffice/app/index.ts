import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).json({ message: "OK GET app" });
  } else if (method === "POST") {
    return res.status(200).json({ message: "OK POST app" });
  } else if (method === "PUT") {
    return res.status(200).json({ message: "OK PUT app" });
  } else if (method === "DELETE") {
    return res.status(200).json({ message: "OK DELETE app" });
  }
  res.status(405).json({ message: "Not Found" });
}
