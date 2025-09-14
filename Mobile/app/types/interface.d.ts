interface RegisterProps{
    username:string,
    email:string,
    password:string,
}

interface LoginProps{
    email:string,
    password:string,
}

interface User{
    username:string,
    email:string,
    profileImage:string,
}

interface RegisterResponse{
    token:string,
    user:User | null,
}

interface AuthStoreProps{
    user:User | null,
    loading: boolean,
    register:(data:RegisterProps)=>Promise<boolean | undefined>,
    token:string | null,
    errorMessage:any,
    login:(data:LoginProps)=>Promise<boolean | undefined>,
}