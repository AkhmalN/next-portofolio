"use server";

import client from "@/lib/axios";
import { revalidateTag } from "next/cache";

export const createAbout = async (formData: FormData) => {
  try {
    const text = formData.get("text") as string;
    console.log(text);

    const response = await client.post("/api/about", { text });
    revalidateTag("about");
    return { success: true, message: "Success create new about" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
