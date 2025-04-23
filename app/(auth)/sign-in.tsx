import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import OAuth from '@/components/OAuth'

const signUp = () => {
  
  const [form,setForm]=useState({email:"",password:""})

  const onSignInPress=async ()=>{};

  return (
    <ScrollView className="flex-1 bg-white ">
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]'/>
          <Text className='text-2xl text-black font-semibold absolute bottom-5 left-5'>Welcome Back</Text>
        </View>

        <View className='p-5'>
          
          <InputField 
            label="Email" 
            placeholder="Enter your Email ID" 
            icon={icons.email} 
            value={form.email} 
            onChangeText={(value:string)=>setForm({...form,email:value})}
          />

          <InputField 
            label="Password" 
            placeholder="Enter your Password" 
            icon={icons.lock} 
            secureTextEntry={true} 
            value={form.password} 
            onChangeText={(value:string)=>setForm({...form,password:value})}
          />
        
        </View>

        <View className='p-5'>
          <CustomButton title='Log in' onPress={onSignInPress} className='mt-6'/>
          <OAuth googleText='Log in with Google'/>
        </View>
      
         

        <Link href={"/sign-up"} className='text-lg text-center text-general-200'>
          <Text> Don't have an account yet?</Text>
          <Text className='text-primary-500'> Create an account</Text>
        </Link>
      </View>
    </ScrollView>
  )
}

export default signUp