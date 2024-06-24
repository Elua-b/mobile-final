import CustomButton from '../../components/CustomButton';

import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

export default function Profile() {


    return (
        <SafeAreaView className=' h-full bg-slate-900'>
            <View className='px-6'>
                <Image source={require('../../assets/images/profile.png')}
                    style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 20 }}
                />
                <Text className='text-center text-white text-2xl font-semibold mt-5'>User</Text>
                <Text className='text-center text-base text-gray-500'>
                  Email@gmail.com
                </Text>
                <CustomButton
                    title='Logout'
                   
                    containerStyles='mt-8 border-red-500'
                    variant='outline'
                    titleStyles='text-red-500'
                />
            </View>
        </SafeAreaView>
    )
}