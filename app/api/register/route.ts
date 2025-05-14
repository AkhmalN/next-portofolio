import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register user
 *     description: Mendaftarkan user baru menggunakan username, email, dan password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Form tidak lengkap
 *       409:
 *         description: Username atau email sudah digunakan
 *       500:
 *         description: Kesalahan server
 */

export async function POST(req: NextRequest) {
  try {
    // receive username, email password from user input
    const { username, email, password } = await req.json();
    // check input. username, email , password are required
    if (!username || !email || !password) {
      return NextResponse.json({
        message: "Form harus diisi lengkap",
        status: 400,
      });
    }
    // db connect
    const { db, client } = await dbConnection();
    // checking user exist in db
    const existingUser = await db
      .collection("users")
      .findOne({ $or: [{ username }, { email }] });
    // if exist return exist
    if (existingUser) {
      return NextResponse.json({
        message: "username dan email sudah digunakan!",
        status: 409,
      });
    }
    // if not exist,
    // first, hashPassword
    const hashedPassword = await hashPassword(password);
    // second, create user in db
    const createUser = await db.collection("users").insertOne({
      username: username,
      email: email,
      password: hashedPassword,
      createdAt: new Date(),
    });
    // return create user response
    return NextResponse.json({
      message: "Berhasil registrasi",
      status: 201,
    });
  } catch (error) {
    console.error("Internal server error", error);
    return NextResponse.json({
      message: "Internal server error",
      error: "Registration failed",
      status: 500,
    });
  }
}
