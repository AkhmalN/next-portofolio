import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/lib/mongodb";
import { withAuth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

/**
 * @openapi
 * /api/experiences/{id}:
 *   get:
 *     summary: Get detail experience by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The experience ID
 *     responses:
 *       200:
 *         description: Detail of the experience
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
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
 *       404:
 *         description: Experience not found
 *       500:
 *         description: Failed to fetch experience
 */
export const GET = withAuth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const { id } = params;
      const { db } = await dbConnection();
      const experience = await db.collection("experiences").findOne({
        _id: new ObjectId(id),
      });

      if (!experience) {
        return NextResponse.json(
          { message: "Experience not found", data: null },
          { status: 404 }
        );
      }

      return NextResponse.json({ data: experience }, { status: 200 });
    } catch (error: any) {
      console.error("Error fetching experience:", error);
      return NextResponse.json(
        { error: "Failed to fetch experience" },
        { status: 500 }
      );
    }
  }
);

/**
 * @openapi
 * /api/experiences/{id}:
 *   delete:
 *     summary: Delete an experience by ID
 *     description: Delete a specific experience from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The experience ID
 *     responses:
 *       200:
 *         description: Successfully deleted the experience
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success delete experience
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid ID
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Experience not found
 *       500:
 *         description: Failed to delete experience
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete experience
 */

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const { db } = await dbConnection();
    const result = await db
      .collection("experiences")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Experience not found" },
        { status: 404 }
      );
    }
    revalidateTag("experiences");
    revalidateTag("experience");
    revalidatePath("/experiences");
    return NextResponse.json(
      { message: "Success delete experience" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting experience:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

/**
 * @openapi
 * /api/experiences/{id}:
 *   put:
 *     summary: Update an experience by ID
 *     description: Update the experience document with new data based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The experience ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               role:
 *                 type: string
 *               description:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successfully updated the experience
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success update experience
 *       400:
 *         description: Invalid ID format or invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid ID or input data
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Experience not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to update experience
 */

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    // Validasi ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    // Ambil data dari body request
    const { company, role, description, startDate, endDate, skills } =
      await req.json();

    // Validasi body
    if (!company || !role) {
      return NextResponse.json(
        { message: "Company and role are required" },
        { status: 400 }
      );
    }

    const { db } = await dbConnection();
    const result = await db.collection("experiences").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          company,
          role,
          description,
          startDate,
          endDate,
          skills,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Experience not found" },
        { status: 404 }
      );
    }

    revalidateTag("experience");
    revalidatePath("/experiences");
    return NextResponse.json(
      { message: "Success update experience" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating experience:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
