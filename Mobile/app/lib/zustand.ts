import { create } from "zustand";
import axios from "@/app/Services/axios";

import asyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create<AuthStoreProps>((set) => ({
    user: null,
    loading: false,
    token: null,
    errorMessage: null,
    register: async ({ username, email, password }: RegisterProps) => {
        try {
            set({ loading: true });
            const res = await axios.post("/auth/register", {
                username,
                email,
                password,
            });
            if (res.status === 200) {
                return true;
            }
        } catch (error) {
            set({ loading: false });
            set({ user: null });
            // @ts-ignore
            set({ errorMessage: error?.response?.data?.message });
            console.log("Error Registering User", error);
            return false;
        } finally {
            set({ loading: false });
        }
    },
    login: async ({ email, password }: LoginProps) => {
        try {
            set({ loading: true });
            const res = await axios.post("/auth/login", { email, password });
            if (res.status === 200) {
                set({ user: res.data.user });
                set({ token: res.data.token });
                asyncStorage.setItem("token", res.data.token);
                asyncStorage.setItem("user", JSON.stringify(res.data.user));
                return true;
            }
        } catch (error) {
            set({ loading: false });
            set({ user: null });
            // @ts-ignore
            set({ errorMessage: error?.response?.data?.message });
            return false;
        } finally {
            set({ loading: false });
        }
    },
    checkAuth: async () => {
        try {
            set({ loading: true });
            const token = await asyncStorage.getItem("token");
            const userJson = await asyncStorage.getItem("user");
            const user = userJson ? JSON.parse(userJson) : null;
            if (token && user) {
                set({ token:token});
                set({ user:user});
            }
        } catch (error) {
            console.log("Error Checking Auth", error);
        }
        finally {
            set({ loading: false });
        }
    },
    logout:async()=>{
        await asyncStorage.removeItem("token");
        await asyncStorage.removeItem("user");
        set({user:null});
        set({token:null});
    }
}));

export default useAuthStore;
