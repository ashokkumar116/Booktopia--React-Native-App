import {View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, Alert, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import {Ionicons} from "@expo/vector-icons";
import {Image} from "expo-image";
import {Link, useRouter} from "expo-router";
import useAuthStore from '../lib/zustand';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();


    const {loading,login,errorMessage,user,token}:AuthStoreProps = useAuthStore();

    const handleLogin = async()=>{
        const res = await login({email,password});
        if(res){
            router.push('/(tabs)');
        }
        else{
            console.log("Error Logging in",errorMessage);
            Alert.alert("Error Logging in",errorMessage);
        }
    }


    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="items-center mt-10 gap-4">
                <Text
                    className="text-4xl uppercase text-indigo-800 font-[Poppins-Black]"
                >
                    Login
                </Text>
                <Image
                    source={require('../../assets/images/login.svg')}
                    className="h-60 w-60 "
                    contentFit="cover"
                />
            </View>
            <View className="bg-white rounded-md shadow-sm p-5 m-5 gap-4">
                <View className="flex-row items-center border-2 border-indigo-600 px-2 rounded-md justify-center">
                    <Ionicons name='mail' size={24} className=" text-indigo-600"/>
                    <TextInput
                        placeholder="example@domain.com"
                        className="flex-1 border-none outline-none p-3 rounded-md text-indigo-600"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>
                <View
                    className="flex-row items-center border-2 border-indigo-600 px-2 rounded-md justify-center">
                    <Ionicons
                        name='lock-closed'
                        size={24}
                        className="text-indigo-600"
                    />
                    <TextInput
                        placeholder="Password"
                        className="flex-1 border-none outline-none p-3 rounded-md text-indigo-600"
                        secureTextEntry={showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        keyboardType="default"
                    />
                    <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        onPress={() => setShowPassword(!showPassword)}
                        className="text-indigo-600"
                        size={24}
                    />
                </View>
                <View>
                    {loading ? (
                        <TouchableOpacity
                            disabled={loading}
                            className="justify-center items-center rounded-md bg-indigo-600 px-2 py-4 flex-row gap-2"
                        >
                            <ActivityIndicator size={20} color="white" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                        className="justify-center items-center rounded-md bg-indigo-600 px-2 py-4 flex-row gap-2"
                        onPress={handleLogin}
                    >
                        <Ionicons
                            name='enter'
                            size={24}
                            className="text-white"
                        />
                        <Text className="text-white">Login</Text>
                    </TouchableOpacity>
                    )}
                </View>
                <View
                    className="flex-row gap-1 justify-center"
                >
                    <Text>
                        Don&apos;t have an account?
                    </Text>
                    <Link
                        href="/register"
                        className="text-indigo-800"
                    >
                        Register Here
                    </Link>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
export default Login


