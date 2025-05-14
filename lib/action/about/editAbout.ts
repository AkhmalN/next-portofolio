"use server";

import client from "@/lib/axios";
import { revalidateTag } from "next/cache";

export const editAbout = async (formData: FormData, id: string) => {
  try {
    const text = formData.get("text") as string;
    const response = await client.put(`/api/about/${id}`, { text });
    console.log(response.data);
    revalidateTag("about");
    return { success: true, message: "Success update about information" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
