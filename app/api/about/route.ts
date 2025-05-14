import { withAuth } from "@/lib/auth";
import { dbConnection } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * @openapi
 * /api/about:
 *   get:
 *     summary: Get about profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: About message returned
 *       401:
 *         description: Unauthorized
 */

export const GET = async () => {
  try {
    const { db } = await dbConnection();
    const about = await db.collection("about").find().toArray();

    return NextResponse.json(
      { message: "Success get data about", data: about },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching about info:", error);
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
};

/**
 * @openapi
 * /api/about:
 *   post:
 *     summary: Update about profile
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               about:
 *                 type: string
 *                 example: Ini adalah informasi tentang kami.
 *     responses:
 *       200:
 *         description: Successfully updated about information
 *       400:
 *         description: Bad request, missing 'about' field
 *       500:
 *         description: Internal server error
 */

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({
        error: "Form tidak boleh kosong!",
        status: 400,
      });
    }

    const { db } = await dbConnection();

    const updateResult = await db.collection("about").updateOne(
      {}, // empty filter to target the first document
      {
        $set: {
          text: text,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil memperbarui about",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("internal server error", error);
    return NextResponse.json({
      message: "Internal server error",
      error: "Update data failed",
      status: 500,
    });
  }
}
