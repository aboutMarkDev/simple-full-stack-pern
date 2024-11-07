import { create } from "zustand";

interface IUserState {
  username: string;
  setUsername: (newUsername: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (bool: boolean) => void;
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
  checkUserAuth: (currentUser: () => Promise<any>) => Promise<boolean>;
}

const useUserStore = create<IUserState>()((set) => ({
  username: "",
  setUsername: (newUsername) => set(() => ({ username: newUsername })),
  isAuthenticated: false,
  setIsAuthenticated: (bool) => set(() => ({ isAuthenticated: bool })),
  isLoading: false,
  setIsLoading: (bool) => set(() => ({ isLoading: bool })),
  checkUserAuth: async (currentUser) => {
    set({ isLoading: true }); // Start loading

    try {
      const getCurrentUser = await currentUser();

      if (getCurrentUser) {
        set({ isAuthenticated: true });
        set({ username: getCurrentUser.username });
        return true;
      }
      set({ isAuthenticated: false });
      return false;
    } catch (error) {
      console.error("Authentication check failed:", error);
      set({ isAuthenticated: false });
      return false;
    } finally {
      set({ isLoading: false }); // Stop loading
    }
  },
}));

export default useUserStore;
