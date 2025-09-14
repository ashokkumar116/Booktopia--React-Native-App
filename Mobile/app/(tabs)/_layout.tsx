import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import useAuthStore from '../lib/zustand';

const TabLayout = () => {

    const {logout}:AuthStoreProps = useAuthStore();


    return (
        <View>
            <Text>TabLayout</Text>
            <TouchableOpacity
                onPress={logout}
            >
                Logout
            </TouchableOpacity>
        </View>
    )
}
export default TabLayout
