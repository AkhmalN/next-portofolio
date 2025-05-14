"use server";

import client from "@/lib/axios";
import { revalidateTag, revalidatePath } from "next/cache";

export async function editProject(formData: FormData, id: string) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  const imageUrl = formData.get("imageUrl") as string;
  const tags_string = formData.get("tags") as string | null;
  const demo_url = formData.get("demo_url") as string | null;
  const github_url = formData.get("github_url") as string | null;
  const category = formData.get("category") as string;
  const show_demo = formData.get("show_demo") === "true";
  const show_github = formData.get("show_github") === "true";
  const tags = tags_string ? tags_string.split(",") : [];

  console.log("run server action ===>");
  console.log(imageFile);
  try {
    const response = await client.put(`/api/projects/${id}`, {
      title,
      description,
      tags_string,
      demo_url,
      github_url,
      category,
      show_demo,
      show_github,
      tags,
    });
    console.log("Response from server:", response.data.data);
  } catch (error) {
    console.error("Error during API call:", error);
  }
}
