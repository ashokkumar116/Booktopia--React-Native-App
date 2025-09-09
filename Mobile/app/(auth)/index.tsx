import {View, Text, KeyboardAvoidingView} from 'react-native'
import React from 'react'

const Login = () => {
    return (
        <KeyboardAvoidingView className="flex-1">
            <View className="flex-1 items-center mt-10">
                <Text className="text-3xl font-bold font-Poppins-Black" >Login</Text>
            </View>
        </KeyboardAvoidingView>
    )
}
export default Login


