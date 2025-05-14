"use server";

import client from "@/lib/axios";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteExperience(formData: FormData) {
  try {
    const id = formData.get("id");
    console.log(id);

    const response = await client.delete(`/api/experiences/${id}`);
    const result = response.data;
    revalidateTag("experiences");
    revalidatePath("/experiences");
    return { success: true, message: result.message };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: "Failed to delete experience",
      error: error.message,
    };
  }
}
