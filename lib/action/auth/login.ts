import Cookies from "js-cookie";

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    const data = await response.json();
    Cookies.set("access_token", data?.access_token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    return { success: true, message: "Success login using credentials" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
