import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEY } from "../api";
import { authApi } from "../api/authApi";
import { logout } from "../utils/helper";
const useAuthStore = create(
  persist(
    (set) => ({
      user: {},
      error: null,
      isLogin: false,
      roleCode: null,
      roleName: null,
      userGenealogy: [],
      currentIdGenealogy: null,
      listRole: [],
      isCreateGene: false,
      setUser: (user = {}) => {
        set({
          user,
        });
      },
      logOutAction: (flag = true) => {
        logout(flag);
        set({
          user: {},
          roleCode: null,
          roleName: null,
          userGenealogy: [],
          currentIdGenealogy: null,
          isLogin: false,
          listRole: [],
          isCreateGene: "",
        });
      },
      selectGeneAction: (currentId, currentRole) => {
        const list = useAuthStore.getState().listRole;
        const current = list.find((i) => i.IdGenealogy == currentId);
        set({
          currentIdGenealogy: currentId,
          roleCode: current?.RoleCode,
        });
      },
      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.login({
            email,
            password,
          });
          localStorage.setItem(LOCAL_STORAGE_KEY.token,res?.data.token)


          await useAuthStore.getState().getInfoUser();
          return res?.data

        } catch (error) {
          set({ isLogin:false });
          throw error;
        }
      },
      setIsLogin:() => {
        set({isLogin:true });
      },

      getInfoUser: async () => {
        try {
          const res = await authApi.getInfoUser();
          if (res.data.role !== "admin" && res.data.role !== "staff" && res.data.role !== "teacher") {
            throw new Error("Sai email hoặc mật khẩu");
          }

          set({
            user: res?.data,
          });
          return res?.data
        } catch (error) {
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
