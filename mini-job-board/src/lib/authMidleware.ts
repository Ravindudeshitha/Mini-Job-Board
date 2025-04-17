import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret";

export function authMiddleware(handler: Function) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        const cookies = parse(req.headers.cookie || "");
        const token = cookies.token;
  
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }
  
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
  
        return handler(req, res);
      } catch (err) {
        return res.status(401).json({ message: "Unauthorized", error: err });
      }
    };
  }