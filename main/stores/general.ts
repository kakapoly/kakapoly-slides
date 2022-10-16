import create from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";

interface GeneralStore {
  sidebarOpened: boolean;
  setSidebarOpened: (payload: boolean) => void;
  toggleSidebarOpened: () => void;
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      sidebarOpened: false,
      setSidebarOpened: (payload) => {
        set(
          produce((state) => {
            state.sidebarOpened = payload;
          })
        );
      },
      toggleSidebarOpened: () => {
        set(
          produce((state) => {
            state.sidebarOpened = !state.sidebarOpened;
          })
        );
      },
    }),
    {
      name: "general-store",
    }
  )
);
