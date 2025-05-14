import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { dbConnection } from "@/lib/mongodb";
import { withAuth } from "@/lib/auth";
import { cloudinaryUploader } from "@/lib/uploader";

interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  demo_url: string;
  github_url: string;
  category: string;
  show_demo: boolean;
  show_github: boolean;
}
/**
 * @openapi
 * /api/projects:
 *   get:
 *     summary: Get list of all projects
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success get projects data
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "605c5e9f1c4ae72f9c7e5b45"
 *                       title:
 *                         type: string
 *                         example: Testing project
 *                       description:
 *                         type: string
 *                         example: Testing description project
 *                       category:
 *                         type: string
 *                         example: Web Development
 *                       imageUrl:
 *                         type: string
 *                         nullable: true
 *                         example: https://dummyimage.com/600x400/000/fff
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["React", "TypeScript", "Tailwind CSS"]
 *                       demoUrl:
 *                         type: string
 *                         example: https://demo.example.com
 *                       githubUrl:
 *                         type: string
 *                         example: https://github.com/example/project
 *       500:
 *         description: Failed to fetch projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch projects
 */

export const GET = async (req: NextRequest) => {
  try {
    const { db } = await dbConnection();
    const projects = await db
      .collection("projects")
      .find({})
      .sort({ current: -1, startDate: -1 })
      .toArray();

    return NextResponse.json(
      {
        status: "Success get projects data",
        data: projects,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
};

/**
 * @openapi
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Portfolio Website
 *               description:
 *                 type: string
 *                 example: A personal portfolio site built using Next.js and Tailwind CSS.
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/image.png
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Next.js", "Tailwind", "React"]
 *               demoUrl:
 *                 type: string
 *                 example: https://portfolio.example.com
 *               githubUrl:
 *                 type: string
 *                 example: https://github.com/username/portfolio
 *               category:
 *                 type: string
 *                 example: Web Development
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Project created successfully
 *                 projectId:
 *                   type: string
 *                   example: 662f7e6e5e1a5c3e8c123abc
 *       400:
 *         description: Title, description, and category are required
 *       500:
 *         description: Failed to create project
 */

export const POST = withAuth(async (req: NextRequest) => {
  try {
    const data = await req.formData();
    const image: File | null = data.get("image") as unknown as File;
    const title: string = data.get("title") as string;
    const description: string = data.get("description") as string;
    const tagsString: string | null = data.get("tags") as string | null;
    const tags: string[] = tagsString ? JSON.parse(tagsString) : [];
    const demo_url: string = data.get("demo_url") as string;
    const github_url: string = data.get("github_url") as string;
    const category: string = data.get("category") as string;
    const show_demoString: string | null = data.get("show_demo") as
      | string
      | null;
    const show_demo: boolean = show_demoString === "true";
    const show_githubString: string | null = data.get("show_github") as
      | string
      | null;
    const show_github: boolean = show_githubString === "true";

    // Validasi field-field wajib
    if (
      !title ||
      !description ||
      !category ||
      !image ||
      !tags ||
      tags.length === 0
    ) {
      return NextResponse.json(
        { error: "Form tidak lengkap, pastikan semua field wajib diisi." },
        { status: 400 }
      );
    }

    // Validasi URL jika ditampilkan
    if (show_demo && !demo_url) {
      return NextResponse.json(
        { error: "Demo URL wajib diisi jika ingin ditampilkan." },
        { status: 400 }
      );
    }
    if (show_github && !github_url) {
      return NextResponse.json(
        { error: "GitHub URL wajib diisi jika ingin ditampilkan." },
        { status: 400 }
      );
    }

    const { db } = await dbConnection();

    const imageUrl: string | undefined = (await cloudinaryUploader(
      image
    )) as string;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Gagal mengunggah gambar ke Cloudinary." },
        { status: 500 }
      );
    }

    const newProject: Project = {
      title,
      description,
      imageUrl,
      tags,
      demo_url,
      github_url,
      category,
      show_demo,
      show_github,
    };

    const result = await db.collection("projects").insertOne(newProject);

    revalidateTag("projects");
    revalidatePath("/project");

    return NextResponse.json(
      { message: "Project created successfully", projectId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project", message: error },
      { status: 500 }
    );
  }
});
