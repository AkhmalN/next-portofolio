import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/lib/mongodb";
import { withAuth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * @openapi
 * /api/experiences:
 *   get:
 *     summary: Get list of all experiences
 *     responses:
 *       200:
 *         description: A list of experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c5e9f1c4ae72f9c7e5b45"
 *                   company:
 *                     type: string
 *                     example: PT Teknologi Nusantara
 *                   role:
 *                     type: string
 *                     example: Frontend Developer
 *                   description:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Developed UI components", "Collaborated with backend team"]
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: 2022-01-01
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     nullable: true
 *                     example: 2023-01-01
 *                   current:
 *                     type: boolean
 *                     example: false
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["React", "TypeScript", "Tailwind CSS"]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Failed to fetch experiences
 */

export const GET = async (req: NextRequest) => {
  try {
    const { db } = await dbConnection();
    const experiences = await db
      .collection("experiences")
      .find({})
      .sort({ current: -1, startDate: -1 })
      .toArray();

    return NextResponse.json(
      {
        status: "Success get experiences data",
        data: experiences,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
};

/**
 * @openapi
 * /api/experiences:
 *   post:
 *     summary: Create a new experience entry
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - role
 *               - description
 *               - startDate
 *             properties:
 *               company:
 *                 type: string
 *                 example: PT Teknologi Nusantara
 *               role:
 *                 type: string
 *                 example: Frontend Developer
 *               description:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Developed UI components", "Collaborated with backend team"]
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2022-01-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 example: 2023-01-01
 *               current:
 *                 type: boolean
 *                 example: false
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["React", "TypeScript", "Tailwind CSS"]
 *     responses:
 *       200:
 *         description: Successfully created a new experience
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c5e9f1c4ae72f9c7e5b45"
 *                 company:
 *                   type: string
 *                 role:
 *                   type: string
 *                 description:
 *                   type: array
 *                   items:
 *                     type: string
 *                 startDate:
 *                   type: string
 *                   format: date
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   nullable: true
 *                 current:
 *                   type: boolean
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

export const POST = withAuth(async (req: NextRequest) => {
  try {
    const { rows } = await req.json();
    if (
      !rows.company ||
      !rows.role ||
      !rows.description ||
      !rows.startDate ||
      !rows.endDate
    ) {
      return NextResponse.json(
        { error: "Company, role, descriptions, skills and date are required" },
        { status: 400 }
      );
    }

    const { db } = await dbConnection();

    const experience = {
      ...rows,
      startDate: new Date(rows.startDate),
      endDate: rows.endDate ? new Date(rows.endDate) : null,
      current: rows.current || false,
      createdAt: new Date(),
    };

    const result = await db.collection("experiences").insertOne(experience);

    revalidateTag("experiences");
    revalidatePath("/experiences");

    return NextResponse.json(
      { message: "Success create experience" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
});
