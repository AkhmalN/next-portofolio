import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface UseAuthReturn {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [token, setTokenState] = useState<string | null>(null);
  const router = useRouter();
  // Periksa token saat komponen dimount
  useEffect(() => {
    const storedToken = Cookies.get("access_token");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  // Simpan token ke localStorage
  const setToken = (newToken: string) => {
    Cookies.set("access_token", newToken);
    setTokenState(newToken);
  };

  // Logout - hapus token
  const logout = () => {
    Cookies.remove("access_token");
    setTokenState(null);
    router.push("/");
  };

  return {
    token,
    setToken,
    logout,
    isAuthenticated: !!token,
  };
};
