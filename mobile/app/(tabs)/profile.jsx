import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';

import React from 'react';
import { Image, SafeAreaView, Text, View,Button } from 'react-native';

export default function Profile() {


    return (
        <SafeAreaView className=' h-full bg-slate-900 flex justify-center items-center'>
            <View className='px-6'>
                <Image source={require('../../assets/images/profile1.jpg')}
                    style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 20 }}
                />
                <Text className='text-center text-white text-2xl font-semibold mt-5'>User</Text>
                <Text className='text-center text-base text-gray-500'>
                  Email@gmail.com
                </Text>
             <View>
             <CustomButton
                    title='Logout'
                    handlePress={() =>router.push('/')}
                    containerStyles='mt-8 border-red-500'
                    variant='outline'
                    titleStyles='text-red-500'
                />
                
             </View>
            </View>
        </SafeAreaView>
    )
}