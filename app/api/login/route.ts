/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Login user
 *     description: Login menggunakan username dan password, lalu mengembalikan JWT token jika berhasil.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Form tidak lengkap
 *       401:
 *         description: Kredensial tidak valid
 *       500:
 *         description: Kesalahan server
 */

import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/lib/mongodb";
import { verifyPassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // get user form send (username, password)
    const { username, password } = await req.json();
    console.log(username);

    // validate, form as required so cannot be null value
    if (!username || !password) {
      return NextResponse.json(
        { message: "username & password are required" },
        { status: 400 }
      );
    }

    // connect to db
    const { db } = await dbConnection();

    // findUser base on form receive
    const user = await db.collection("users").findOne({ username });

    // if user not find return invalid
    if (!user) {
      return NextResponse.json(
        { message: "User not exist, please register first!" },
        { status: 401 }
      );
    }

    // if find verifyPassword
    const isValidUser = await verifyPassword(password, user.password);

    // if not verify return invalid
    if (!isValidUser) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // generate token from userId and username
    const token = await generateToken(user._id.toString(), user.username);

    // return token
    return NextResponse.json({ access_token: token }, { status: 200 });
  } catch (error: any) {
    // Periksa apakah error.message valid JSON
    const errorMessage =
      typeof error.message === "string" ? error.message : "Unknown error";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
