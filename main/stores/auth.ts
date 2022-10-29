import produce from "immer";
import create from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string | null) => {
        set(
          produce((state) => {
            state.token = token;
          })
        );
      },
    }),
    {
      name: "auth-store",
    }
  )
);
