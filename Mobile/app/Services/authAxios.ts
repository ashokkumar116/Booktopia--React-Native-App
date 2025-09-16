import axios from "axios";
import useAuthStore from "../lib/zustand";

const authAxios = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials:true
})

authAxios.interceptors.request.use((config):any=>{

    const token = useAuthStore.getState().token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error)=>{
    return Promise.reject(error);
}
    
)

export default authAxios;