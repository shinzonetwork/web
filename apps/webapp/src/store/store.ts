import { Role } from '@/types/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type StoreState = {
  registered: boolean;
  userRole: Role;
  profileCompleted: boolean;
}

type StoreAction = {
    isRegistered: (registered: boolean) => void;
    setUserRole: (role: Role) => void;
    isProfileCompleted: (profileCompleted: boolean) => void;
}

type Store = StoreState & StoreAction;

const useShinzoStore = create<Store>()(
  persist(
    (set) => ({
      registered: false,
      userRole: null,
      profileCompleted: false,
      isRegistered: (registered) => set({ registered }),
      setUserRole: (userRole) => set({ userRole }),
      isProfileCompleted: (profileCompleted) => set({ profileCompleted }),
    }),
    {
      name: 'shinzo-store', // key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useShinzoStore;
