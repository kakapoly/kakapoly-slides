import axios from "@/libs/axios";
import { useAuthStore } from "@/stores/auth";

interface LocalCredentials {
  email: string;
  password: string;
}

export async function logIn(credentials: LocalCredentials) {
  const { data } = await axios.post<{ accessToken: string }>(
    "/auth/log-in",
    credentials
  );
  return data;
}

export async function signUp(credentials: LocalCredentials) {
  const { data } = await axios.post<{}>("/auth/sign-up", credentials);
  return data;
}
