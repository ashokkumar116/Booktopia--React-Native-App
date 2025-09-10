import {View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {Image} from "expo-image";
import {Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
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
                        />
                    </View>
                    <View className="flex-row items-center border-2 border-indigo-600 px-2 rounded-md justify-center">
                        <Ionicons name='mail' size={24} className=" text-indigo-600"/>
                        <TextInput
                            placeholder="example@domain.com"
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
                        />
                        <Ionicons
                            name={showPassword ? 'eye' : 'eye-off'}
                            onPress={() => setShowPassword(!showPassword)}
                            className="text-indigo-600"
                            size={24}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            className="justify-center items-center rounded-md bg-indigo-600 px-2 py-4 flex-row gap-2"
                        >
                            <Ionicons
                                name='enter'
                                size={24}
                                className="text-white"
                            />
                            <Text className="text-white">Register</Text>
                        </TouchableOpacity>
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
export default Register
