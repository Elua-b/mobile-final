import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ title, handlePress, variant = "primary", containerStyles="", titleStyles="", isLoading=false }) => {
    return (
        <TouchableOpacity
            disabled={isLoading}
            onPress={handlePress}
            className={`${variant === 'primary' ? "bg-slate-900" : "bg-slate-900 border border-slate-400"} w-full px-2 rounded-md flex flex-row justify-center text-center items-center py-2 ${containerStyles}`}
        >
            <Text
                className={`${variant === "primary" ? "text-white" : "text-white"} text-lg font-semibold ${titleStyles}`}
            >{title}</Text>
            {
                isLoading &&
                <ActivityIndicator
                    size={"small"}
                    animating={isLoading}
                    color={variant === "primary" ? "white" : "blue"}

                />
            }
        </TouchableOpacity>
    )
}

export default CustomButton