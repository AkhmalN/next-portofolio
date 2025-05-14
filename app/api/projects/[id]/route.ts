import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { dbConnection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath, revalidateTag } from "next/cache";
import { cloudinaryUploader, deleteImage } from "@/lib/uploader";

/**
 * @openapi
 * /api/projects/{id}:
 *   get:
 *     summary: Get project detail by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the project to retrieve
 *         schema:
 *           type: string
 *           example: 605c5e9f1c4ae72f9c7e5b45
 *     responses:
 *       200:
 *         description: Project found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success get project detail
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 605c5e9f1c4ae72f9c7e5b45
 *                     title:
 *                       type: string
 *                       example: Testing project
 *                     description:
 *                       type: string
 *                       example: Testing description project
 *                     category:
 *                       type: string
 *                       example: Web Development
 *                     imageUrl:
 *                       type: string
 *                       nullable: true
 *                       example: https://dummyimage.com/600x400/000/fff
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["React", "TypeScript"]
 *                     demoUrl:
 *                       type: string
 *                       example: https://demo.example.com
 *                     githubUrl:
 *                       type: string
 *                       example: https://github.com/example/project
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Project not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

export const GET = withAuth(
  async (req: Request, { params }: { params: { id: string } }) => {
    try {
      const { id } = params;
      const { db } = await dbConnection();
      const project = await db.collection("projects").findOne({
        _id: new ObjectId(id),
      });

      if (!project) {
        return NextResponse.json(
          { message: "project not found", data: null },
          { status: 404 }
        );
      }

      return NextResponse.json({ data: project }, { status: 200 });
    } catch (error: any) {
      console.error("Error fetching project:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);
/**
 * @openapi
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     description: Update the details of an existing project by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the project to update
 *         schema:
 *           type: string
 *           example: 605c5e9f1c4ae72f9c7e5b45
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Project Title
 *               description:
 *                 type: string
 *                 example: Updated project description
 *               category:
 *                 type: string
 *                 example: Web Development
 *               tags:
 *                 type: string
 *                 description: JSON string array of tags
 *                 example: ["React", "TypeScript"]
 *               demo_url:
 *                 type: string
 *                 example: https://demo.example.com
 *               github_url:
 *                 type: string
 *                 example: https://github.com/example/project
 *               show_demo:
 *                 type: string
 *                 enum: ["true", "false"]
 *                 example: "true"
 *               show_github:
 *                 type: string
 *                 enum: ["true", "false"]
 *                 example: "false"
 *               image:
 *                 type: string
 *                 format: binary
 *                 nullable: true
 *               imageUrl:
 *                 type: string
 *                 nullable: true
 *                 example: https://existing-image.example.com
 *     responses:
 *       200:
 *         description: Successfully updated the project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success update project
 *       400:
 *         description: Invalid input or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are required
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: project not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server error
 */

export const PUT = withAuth(
  async (req: Request, { params }: { params: { id: string } }) => {
    try {
      const { id } = params;
      const formData = await req.formData();
      const body: Record<string, any> = {};
      formData.forEach((value, key) => {
        body[key] = value;
      });

      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
      }
      if (!body.title || !body.description || !body.category || !body.tags) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }

      const { db } = await dbConnection();
      let cloudinaryImg: string = "";
      if (body.image) {
        const imageUpload = await cloudinaryUploader(body.image);
        console.log("result image upload", imageUpload);
        cloudinaryImg += imageUpload;
      }

      const result = await db.collection("projects").findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            title: body.title,
            description: body.description,
            demo_url: body.demo_url,
            github_url: body.github_url,
            category: body.category,
            tags: JSON.parse(body.tags),
            show_demo: body.show_demo === "true",
            show_github: body.show_github === "true",
            imageUrl: body.imageUrl ? body.imageUrl : cloudinaryImg,
          },
        }
      );

      revalidateTag("projects");
      revalidateTag("project");
      revalidatePath("/project");
      return NextResponse.json(
        { message: "Success update project" },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message, message: "Internal Server error" },
        { status: 500 }
      );
    }
  }
);

/**
 * @openapi
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete an project by ID
 *     description: Delete a specific project from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Successfully deleted the project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success delete project
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
 *         description: project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: project not found
 *       500:
 *         description: Failed to delete project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete project
 */

export const DELETE = withAuth(
  async (req: Request, { params }: { params: { id: string } }) => {
    try {
      const { imageUrl } = await req.json();
      const { id } = params;
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
      }

      const { db } = await dbConnection();
      await deleteImage(imageUrl);
      const result = await db
        .collection("projects")
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return NextResponse.json(
          { message: "project not found" },
          { status: 404 }
        );
      }

      revalidateTag("projects");
      revalidatePath("/project");
      return NextResponse.json(
        { message: "Success delete project" },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error deleting project:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
);
