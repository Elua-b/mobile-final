import CustomButton from '../components/CustomButton'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding = () => {
    const { user,logout } = useAuth();
    const router = useRouter();
    return (
        <SafeAreaView
            className='bg-blue-500'
        >
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <View className='h-full items-center justify-center px-6 font-rubik'>
                    <Image
                        source={require("../assets/images/welcome1.png")}
                        resizeMode='contain'
                        className='w-[240px] h-[240px]'
                    />
                    <Text className='text-2xl font-bold font-rubik'>Explore to our app</Text>
                    {user?
                        <Text className='text-center text-lg text-gray-500 py-4 '>
                        Already logged in as <Text className=' font-semibold text-blue-500'>{user?.name}</Text>
                    </Text>:
                    <Text className='text-center text-lg text-gray-500 py-4 '>
                         Create an account to get started
                    </Text>
                    }
                    {
                        user ?
                        <View className='w-full mt-6'>
                            <CustomButton
                                title='Go to Home'
                                handlePress={() => router.push("/home")}
                                containerStyles='mb-3'
                            />
                            <CustomButton
                                title='Logout'
                                handlePress={logout}
                                variant='outline'
                                containerStyles='mt-3 border-red-500'
                                titleStyles=' text-red-500'
                            />
                        </View>
                            :
                            <View className='w-full mt-6'>
                                <CustomButton
                                    title='Login'
                                    handlePress={() => router.push("/login")}
                                />
                                <CustomButton
                                    title='Create Account'
                                    handlePress={() => router.push("/signup")}
                                    variant='outline'
                                    containerStyles='mt-5'
                                />
                            </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Onboarding