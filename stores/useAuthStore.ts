import { UserLogin } from "@/@types/auth.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  data: UserLogin | undefined;
  changeData: (data: UserLogin | undefined) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      data: undefined,
      changeData: (value) => set(() => ({ data: value })),
    }),
    {
      name: "auth-store",
    },
  ),
);
