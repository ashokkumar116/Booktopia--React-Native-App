import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator, Alert
} from 'react-native'
import React, {useState} from 'react'
import {Image} from "expo-image";
import {Ionicons} from "@expo/vector-icons";
import {Link, useRouter} from "expo-router";
import useAuthStore from "@/app/lib/zustand";

const Register = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const {loading, register, errorMessage}: AuthStoreProps = useAuthStore();

    const router = useRouter();
    console.log(errorMessage)

    const handleRegister = async () => {
        const response: boolean | undefined = await register({username, email: email, password: password});
        if (response) {
            console.log("User registered");
            router.push("/");
        } else {
            Alert.alert("Error Registering User",errorMessage);
        }
    }


    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                showsHorizontalScrollIndicator={false}
            >
                <View className="items-center mt-10 gap-4">
                    <Text
                        className="text-4xl uppercase text-indigo-800 font-[Poppins-Black]"
                    >
                        Register
                    </Text>
                    <Text
                        className="text-indigo-600 font-[Poppins-Medium] justify-center w-[70%] text-center"
                    >
                        Welcome to Booktopia — where books find you
                    </Text>
                    <Image
                        source={require('../../assets/images/register.svg')}
                        className="h-60 w-60 "
                        contentFit="cover"
                    />
                </View>
                <View className="bg-white rounded-md shadow-sm p-5 m-5 gap-4">
                    <View className="flex-row items-center border-2 border-indigo-600 px-2 rounded-md justify-center">
                        <Ionicons name='person' size={24} className=" text-indigo-600"/>
                        <TextInput
                            placeholder="Full Name"
                            className="flex-1 border-none outline-none p-3 rounded-md text-indigo-600"
                            value={username}
                            onChangeText={(text: string) => setUsername(text)}
                        />
                    </View>
                    <View className="flex-row items-center border-2 border-indigo-600 px-2 rounded-md justify-center">
                        <Ionicons name='mail' size={24} className=" text-indigo-600"/>
                        <TextInput
                            placeholder="example@domain.com"
                            value={email}
                            onChangeText={(text: string) => setEmail(text)}
                            className="flex-1 border-none outline-none p-3 rounded-md text-indigo-600"
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
                            onChangeText={(text: string) => setPassword(text)}
                        />
                        <Ionicons
                            name={showPassword ? 'eye' : 'eye-off'}
                            onPress={() => setShowPassword(!showPassword)}
                            className="text-indigo-600"
                            size={24}
                        />
                    </View>
                    <View>
                        {
                            loading ?
                                <TouchableOpacity
                                    className="justify-center items-center rounded-md bg-indigo-600 px-2 py-4 flex-row gap-2"
                                    disabled={loading}
                                >
                                    <ActivityIndicator
                                        size={20}
                                        color="white"
                                    />
                                </TouchableOpacity>
                                : <TouchableOpacity
                                    className="justify-center items-center rounded-md bg-indigo-600 px-2 py-4 flex-row gap-2"
                                    onPress={handleRegister}
                                >
                                    <Ionicons
                                        name='enter'
                                        size={24}
                                        className="text-white"
                                    />
                                    <Text className="text-white">Register</Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <View
                        className="flex-row gap-1 justify-center"
                    >
                        <Text>
                            Already have an account?
                        </Text>
                        <Link
                            href="/"
                            className="text-indigo-800"
                        >
                            Login
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default Register;
