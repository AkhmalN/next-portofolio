import { verifyToken, withAuth } from "@/lib/auth";
import { dbConnection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// for client pages
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const { db } = await dbConnection();

    const user_profile = await db
      .collection("profiles")
      .findOne({ _id: new ObjectId(id) });
    return NextResponse.json({ data: user_profile }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};

/**
 * @openapi
 * /api/profile:
 *   put:
 *     summary: Update user profile
 *     description: Updates a user's profile with text fields and an optional image file using multipart/form-data.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               role:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               full_name:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               born_location:
 *                 type: string
 *               address:
 *                 type: string
 *               linkedin:
 *                 type: string
 *               github:
 *                 type: string
 *               skills:
 *                 type: string
 *                 description: JSON stringified array of skills (e.g., '["JavaScript", "TypeScript"]')
 *               user_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *       400:
 *         description: Invalid form data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

export const PUT = withAuth(
  async (req: Request, { params }: { params: { id: string } }) => {
    try {
      const { id } = params;
      const data = await req.formData();
      const imageUrl = data.get("image") as File | null;
      const role = data.get("role")?.toString() || "";
      const username = data.get("username")?.toString() || "";
      const email = data.get("email")?.toString() || "";
      const full_name = data.get("full_name")?.toString() || "";
      const birthday = data.get("birthday")?.toString() || "";
      const born_location = data.get("born_location")?.toString() || "";
      const address = data.get("address")?.toString() || "";
      const linkedin = data.get("linkedin")?.toString() || "";
      const github = data.get("github")?.toString() || "";
      const skillsRaw = data.get("skills")?.toString() || "[]";

      let skills: string[];
      try {
        skills = JSON.parse(skillsRaw);
        if (!Array.isArray(skills)) throw new Error();
      } catch {
        throw new Error("Invalid skills format");
      }

      const { db } = await dbConnection();
      const existingProfile = await db
        .collection("profiles")
        .findOne({ _id: new ObjectId(id) });

      if (!existingProfile) {
        return Response.json({ message: "Profile not found" }, { status: 404 });
      }

      const updatedProfile = {
        imageUrl,
        role,
        username,
        email,
        full_name,
        birthday,
        born_location,
        address,
        linkedin,
        github,
        skills,
      };

      const result = await db
        .collection("profiles")
        .updateOne({ _id: new ObjectId(id) }, { $set: updatedProfile });

      revalidatePath(`/profile`);
      revalidateTag("profile");

      return Response.json(
        { message: "Profile updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      return Response.json(
        { message: "Internal server error", error },
        { status: 500 }
      );
    }
  }
);
