"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import client from "@/lib/axios";
import { redirect } from "next/navigation";

// export async function createExperience(formData: Omit<Experience, "_id">) {
//   try {
//     const response = await fetch("/api/experiences", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ formData }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error || "Post failed");
//     }
//     return { success: true, message: "Successfully created new experience" };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "Failed to create new experience",
//       error: error.message,
//     };
//   }
// }

export async function createExperience(formData: FormData) {
  try {
    const token = cookies().get("access_token")?.value;
    console.log("from action" + token);
    const role = formData.get("role");
    const company = formData.get("company");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const descriptionString = formData.get("description");
    const skillsString = formData.get("skillsArray");
    console.log({ role, company, startDate, endDate });
    const skills = skillsString ? (skillsString as string).split(",") : [];
    const description = descriptionString
      ? (descriptionString as string).split(",")
      : [];

    const rows = {
      role,
      company,
      startDate,
      endDate,
      description,
      skills,
    };

    const response = await client.post(
      "/api/experiences",
      { rows },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidateTag("experiences");
    revalidatePath("/experiences");
    return { success: true, message: "Successfully created new experience" };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "Failed to create new experience",
      error: error.response?.data?.error || error.message || "Unknown error",
    };
  }
}
