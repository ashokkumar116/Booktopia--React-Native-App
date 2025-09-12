import {create} from "zustand";
import axios from "@/app/axios";



const useAuthStore = create<AuthStoreProps>((set)=>({
    user:null,
    loading:false,
    register:async ({username,email,password}:RegisterProps)=>{
        try {
            set({loading:true});
            const res = await axios.post('/auth/register',{name:username,email,password});
            if(res.status === 200){
                set({user:res.data});
                return true;
            }
        }catch(error){
            set({loading:false});
            set({user:null});
            console.log("Error Registering User",error);
        }finally{
            set({loading:false});
        }
    }
}))


export default useAuthStore;
