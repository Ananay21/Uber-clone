import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '@/constants'

const OAuth = ({googleText}:{googleText:"Sign up with Google"|"Log in with Google"}) => {
  
  const handleGoogleSignIn=async ()=>{

  };

  return (
    <View>
        <View className='flex flex-row justify-center items-center mt-5 gap-x-3'>
            <View className='flex-1 h-[1px] bg-general-100'/>
            <Text className='text-lg'>Or</Text>
            <View className='flex-1 h-[1px] bg-general-100'/>    
        </View>

        <CustomButton 
            title={googleText} 
            bgVariant='outline' 
            textVariant='primary' 
            className='mt-5 shadow-none w-full'
            IconLeft={()=><Image source={icons.google} resizeMode='contain' className='w-5 h-5 mx-2'/>}
            onPress={handleGoogleSignIn}
        />
    </View>
  )
}

export default OAuth