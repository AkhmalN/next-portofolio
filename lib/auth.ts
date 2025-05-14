import { NextRequest, NextResponse, userAgent } from "next/server";
import { dbConnection } from "./mongodb";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export async function generateToken(
  userId: string,
  username: string
): Promise<string> {
  console.log("gerate token receive user id" + userId);
  console.log("gerate token receive usrname" + username);
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function authenticate(
  req: Request
): Promise<{ authenticated: boolean; userId?: string }> {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  // console.log("auth token : " + token);
  if (!token) {
    return { authenticated: false };
  }
  const decoded = verifyToken(token);
  // console.log("Decoded..." + decoded);
  if (!decoded) {
    return { authenticated: false };
  }
  return { authenticated: true, userId: decoded.userId };
}

export function withAuth<TContext = any>(
  handler: (req: NextRequest, context: TContext) => Promise<Response>
) {
  return async function (req: NextRequest, context: TContext) {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { authenticated, userId } = await authenticate(req);
    if (!authenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const reqWithAuth: NextRequest = Object.assign(req, {
      userId,
    } as NextRequest & { userId: string });

    return handler(reqWithAuth, context);
  };
}
