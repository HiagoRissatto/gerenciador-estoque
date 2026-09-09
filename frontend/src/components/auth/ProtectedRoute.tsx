import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { API_URL } from "../../services/api";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children
}: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function validateToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/usuarios/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    }

    validateToken();
  }, []);

  if (isAuthenticated === null) {
    return <p>Carregando...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}