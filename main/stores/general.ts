import create from "zustand";
import produce from "immer";

interface GeneralStore {
  sidebarOpened: boolean;
  setSidebarOpened: (payload: boolean) => void;
  toggleSidebarOpened: () => void;
}

export const useGeneralStore = create<GeneralStore>((set) => ({
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
}));
