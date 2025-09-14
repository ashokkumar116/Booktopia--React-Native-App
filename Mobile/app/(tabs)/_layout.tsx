import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useAuthStore from "../lib/zustand";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({ title, icon, focused }: any) => {
    if (focused) {
        return (
            <View className="flex-1 bg-green-600 p-5 flex-row justify-center items-center rounded-lg gap-2 mt-3">
                <Ionicons className="text-white" name={icon} size={15} />
                <Text className="text-white">{title}</Text>
            </View>
        );
    }
    return (
        <View className="flex-1 p-5 flex-row justify-center items-center rounded-lg gap-2 mt-3">
            <Ionicons name={icon} size={15} />
            <Text>{title}</Text>
        </View>
    );
};

const TabLayout = () => {
    const { user, token, logout }: AuthStoreProps = useAuthStore();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarItemStyle:{
                    height:"100%",
                    width:"100%",
                    justifyContent:'center',
                    alignItems:"center",
                    padding:3
                },

                tabBarStyle: {
                    backgroundColor: "white",
                    padding:3,
                    height:60,
                    justifyContent:"center",

                },
                
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            title="Home"
                            icon="home-outline"
                            focused={focused}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="AddBook"
                options={{
                    title: "Add",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            title="Add"
                            icon="add-outline"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            title="Profile"
                            icon="person-outline"
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};
export default TabLayout;
