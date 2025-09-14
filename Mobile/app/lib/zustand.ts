import {create} from "zustand";
import axios from "@/app/axios";



const useAuthStore = create<AuthStoreProps>((set)=>({
    user:null,
    loading:false,
    token:null,
    errorMessage:null,
    register:async ({username,email,password}:RegisterProps)=>{
        try {
            set({loading:true});
            const res = await axios.post('/auth/register',{name:username,email,password});
            if(res.status === 200){
                return true;
            }
        }catch(error){
            set({loading:false});
            set({user:null});
            // @ts-ignore
            set({errorMessage:error?.response?.data?.message});
            console.log("Error Registering User",error);
            return false;
        }finally{
            set({loading:false});
        }
    },
    login:({email,password}:RegisterProps)=>{

    }
}))


export default useAuthStore;
