import axios from "@/libs/axios";
import { useAuthStore } from "@/stores/auth";

export async function getCurrentUser() {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error("Token doesn't exist.");
  }

  const { data } = await axios.get<{
    id: string;
    email: string;
  }>("/users/current-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
