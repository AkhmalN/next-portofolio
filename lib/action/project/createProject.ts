"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import client from "@/lib/axios";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  const tags_string = formData.get("tags") as string | null;
  const demo_url = formData.get("demo_url") as string | null;
  const github_url = formData.get("github_url") as string | null;
  const category = formData.get("category") as string;
  const show_demo = formData.get("show_demo") === "true";
  const show_github = formData.get("show_github") === "true";

  const tags = tags_string ? tags_string.split(",") : [];

  let imageUrl: string | undefined;

  if (!imageFile) {
    console.error("Tidak ada file gambar yang dipilih.");
    return { error: "Gambar wajib diunggah." };
  }

  if (imageFile) {
    try {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream((error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as UploadApiResponse);
              }
            })
            .end(buffer);
        }
      );

      if (uploadResult?.secure_url) {
        imageUrl = uploadResult.secure_url;
        console.log("Gambar berhasil di unggah ke cloudinary", imageUrl);
      } else {
        console.error("Gagal mengunggah gambar ke Cloudinary.");
        return { error: "Gagal mengunggah gambar." };
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengunggah ke Cloudinary:", error);
      return { error: "Terjadi kesalahan saat mengunggah gambar." };
    }
  }

  try {
    const apiUrl = "/api/projects";
    const response = await client.post(apiUrl, {
      title,
      description,
      imageUrl,
      tags,
      demo_url,
      github_url,
      category,
      show_demo,
      show_github,
    });
    revalidatePath("/project");
    revalidateTag("projects");
    return { success: true, message: "Success create project" };
  } catch (error: any) {
    return { message: error.message || "Terjadi kesalahan server." };
  }
}
