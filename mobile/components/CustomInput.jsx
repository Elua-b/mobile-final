import React from 'react';
import { Text, TextInput, View } from 'react-native';

const CustomInput = ({ label, containerStyles="", inputStyles="", ...props }) => {
    return (
        <View className={`${containerStyles}`}>
            <Text className='text-lg font-medium text-white pb-1'>{label}</Text>
            <TextInput
                className={`border py-2 px-2 text-white rounded-md border-white focus:border-white ${inputStyles}`}
                autoCapitalize='none'
                {...props}

            />
        </View>
    )
}

export default CustomInput