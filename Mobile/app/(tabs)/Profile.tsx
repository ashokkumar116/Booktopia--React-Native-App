import { View, Text, TouchableOpacity } from 'react-native'
import React, { use } from 'react'
import useAuthStore from '../lib/zustand'
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {

  const {user,token,logout} = useAuthStore();

  const formatJoinDate = (dateString:string)=>{
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US',{
      year:'numeric',
      month:'long',
      day:'numeric'
    });
  }

  return (
    <View>
      <Text className='text-center font-bold text-3xl mt-5 font-[Poppins-Black] text-green-600'>Profile</Text>
      <View className='bg-white m-5 p-5 rounded-md justify-center shadow-sm flex-row items-center gap-5'>
        <Image 
          source={{uri:user?.profileImage}} 
          className="h-20 w-20 rounded-full border-2 border-green-600" 
          contentFit="cover" 
          />
        <View className='gap-2'>
          <Text className='text-xl font-bold text-green-700 uppercase'>{user?.username}</Text>
          <Text className='text-gray-800 italic' >{user?.email}</Text>
          <Text className='text-gray-800/70 italic' >Member since {formatJoinDate(user?.createdAt ?? "")}</Text>
        </View>
      </View>
      <View>
          <TouchableOpacity
            onPress={logout}
            className='bg-red-600 px-4 py-3 rounded-md text-white mx-5 items-center flex-row justify-center gap-2'
          >
            <Ionicons name="log-out" size={16} color="white" />
            <Text className='text-white text-[16px]'>Logout</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default Profile