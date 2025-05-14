import { Experience } from "@/types";

export async function updateExperience(
  formData: Omit<Experience, "_id" | "description" | "skills">,
  description: string[],
  skills: string[],
  id: string | undefined
) {
  try {
    const body = {
      ...formData,
      description,
      skills,
    };

    const response = await fetch(`/api/experiences/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Put failed");
    }
    return { success: true, message: "Successfully update experience" };
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to update experience",
      error: error.message,
    };
  }
}
