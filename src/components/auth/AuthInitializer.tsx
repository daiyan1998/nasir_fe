import { useEffect, useState } from "react";
import axios from "axios";
import { setAccessToken } from "@/api/client";
import { endpoints } from "@/api/endPoints";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data } = await axios.post(
          `${API_BASE_URL}${endpoints.refreshToken}`,
          {},
          { withCredentials: true }
        );
        setAccessToken(data.accessToken);
      } catch (error) {
        // If refresh fails, we just proceed as guest (or let ProtectedRoute handle redirect)
        // console.log("Failed to refresh token on startup", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthInitializer;
