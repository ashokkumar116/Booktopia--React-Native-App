import { View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import useAuthStore from "../lib/zustand";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import authAxios from "../Services/authAxios";

const Profile = () => {
    const { user, token, logout } = useAuthStore();

    const [books, setBooks] = useState<string[]>([]);

    const fetchBooks = async () => {
        const response = await authAxios.get("/books/getmybooks");
        setBooks(response.data.books);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const formatJoinDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const RenderItems = ({ item }: { item: string }): any => {
        return (
            <View className="flex-row items-center gap-3 my-3">
                <View>
                    <Image source={{ uri: item.image }} className="h-10 w-10" />
                </View>
                <View className="flex-1 gap-1">
                    <Text className="text-sm font-bold">{item.title}</Text>
                    {item.rating && (
                        <View className="flex-row items-center gap-1">
                            <Ionicons name="star" color="yellow" />
                            <Text className="text-xs">{item.rating}</Text>
                        </View>
                    )}
                    <Text className="text-xs text-gray-600 truncate">
                        {item.caption}
                    </Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <Ionicons name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className="flex-1 bg-gray-100"
        >
            <Text className="text-center font-bold text-3xl mt-5 font-[Poppins-Black] text-green-600">
                Profile
            </Text>
            <View className="bg-white m-5 p-5 rounded-md justify-center shadow-sm flex-row items-center gap-5">
                <Image
                    source={{ uri: user?.profileImage }}
                    className="h-20 w-20 rounded-full border-2 border-green-600"
                    contentFit="cover"
                />
                <View className="gap-2">
                    <Text className="text-xl font-bold text-green-700 uppercase">
                        {user?.username}
                    </Text>
                    <Text className="text-gray-800 italic">{user?.email}</Text>
                    <Text className="text-gray-800/70 italic">
                        Member since {formatJoinDate(user?.createdAt ?? "")}
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    onPress={logout}
                    className="bg-red-600 px-4 py-3 rounded-md text-white mx-5 items-center flex-row justify-center gap-2"
                >
                    <Ionicons name="log-out" size={16} color="white" />
                    <Text className="text-white text-[16px]">Logout</Text>
                </TouchableOpacity>
            </View>
            <View className="mx-5 p-5 ">
                <Text className="font-bold text-lg">
                    Your Book Recommendations
                </Text>
                <FlatList
                    className="bg-white mt-3 p-3 rounded-md shadow-sm"
                    data={books}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => <RenderItems item={item} />}
                />
            </View>
        </ScrollView>
    );
};

export default Profile;
