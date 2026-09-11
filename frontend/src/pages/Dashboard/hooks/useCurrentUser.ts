import { useEffect, useState } from "react";

import { API_URL } from "../../../services/api";

import type { CurrentUser } from "../../../types/user";

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    async function loadCurrentUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(`${API_URL}/usuarios/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar usuário");
        }

        const data = await response.json();

        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    }

    void loadCurrentUser();
  }, []);

  return {
    user
  };
}