import CustomButton from '../components/CustomButton'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding = () => {
    // const { user,logout } = useAuth();
    const router = useRouter();
    return (
        <SafeAreaView
            className='bg-slate-900'
        >
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <View className='h-full items-center justify-center px-6 font-rubik'>
                    <Image
                        source={require("../assets/images/logo.jpg")}
                        resizeMode='contain'
                        className='w-[240px] h-[240px]'
                    />
                    <Text className='text-2xl text-white font-bold font-rubik'>Explore to our app</Text>
               
                 
                  
                        <View className='w-full mt-6'>
                            <Pressable
                                
                                onPress={() => router.push("/home")}
                                className="bg-white flex justify-center items-center p-5 rounded-md"
                            >
                           <Text className="text-slate-900 text-xl">View Posts
                            </Text>     
                                </Pressable>
                        
                        </View>
                            
                        
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Onboarding