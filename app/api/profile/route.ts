import { verifyToken, withAuth } from "@/lib/auth";
import { dbConnection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @openapi
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data returned
 *       401:
 *         description: Unauthorized
 */

// for admin pages
export const GET = withAuth(async (req: Request, res) => {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userDecoded = verifyToken(token);

  const { db } = await dbConnection();
  const userProfile = await db
    .collection("profiles")
    .findOne({ user_id: userDecoded.userId });

  try {
    return Response.json(
      { message: "Profile data returned", data: userProfile },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
});
