import { Role } from "@/types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type StoreState = {
  profileCompleted: boolean;
  registered: boolean;
  signedWithWallet: boolean;
  userRole: Role;
};

type StoreAction = {
  isProfileCompleted: (profileCompleted: boolean) => void;
  isRegistered: (registered: boolean) => void;
  isSignedWithWallet: (signedWithWallet: boolean) => void;
  setUserRole: (role: Role) => void;
};

type Store = StoreState & StoreAction;

const useShinzoStore = create<Store>()(
  persist(
    (set) => ({
      profileCompleted: false,
      registered: false,
      userRole: null,
      signedWithWallet: false,
      isProfileCompleted: (profileCompleted) => set({ profileCompleted }),
      isRegistered: (registered) => set({ registered }),
      isSignedWithWallet: (signedWithWallet) => set({ signedWithWallet }),
      setUserRole: (userRole) => set({ userRole }),
    }),
    {
      name: "shinzo-store", // key in localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useShinzoStore;
