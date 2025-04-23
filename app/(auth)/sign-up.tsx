import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import { Link, useRouter } from 'expo-router'
import OAuth from '@/components/OAuth'
import { useSignUp } from '@clerk/clerk-expo'
import {ReactNativeModal} from "react-native-modal"

const signUp = () => {
  const router=useRouter()
  const {isLoaded,signUp,setActive}=useSignUp();

  const [form,setForm]=useState({name:"",email:"",password:""})
  const [verification,setVerification]=useState({state:"default",error:'',code:''})
  const [errorState,updateErrorState]=useState({err:false,message:""});

  const onSignUpPress=async ()=>{
    if(!isLoaded) return;

    try {
      await signUp.create(
        {
          emailAddress:form.email,
          password:form.password
        }
      );

      await signUp.prepareEmailAddressVerification({strategy:'email_code'});

      setVerification({...verification,state:"pending"})
    } catch (error) {
      updateErrorState({err:true,message:error.errors[0].longMessage});
    }
  };

  const onVerifyPress=async ()=>{
    if(!isLoaded) return;

    try{
      const signUpAttempt=await signUp.attemptEmailAddressVerification({code:verification.code})

      if(signUpAttempt.status==='complete'){
        // TODO: create a db user
        await setActive({session:signUpAttempt.createdSessionId});
        setVerification({...verification,state:"success"});
      }
      else{
        setVerification({...verification,state:"failed",error:"Verification failed"})
        console.error(JSON.stringify(signUpAttempt,null,2));
      }
    }catch(err){
      setVerification({...verification,error:err.errors[0].longMessage,state:"failed"})
      console.error(JSON.stringify(err,null,2));
    }
  }

  return (
    <ScrollView className="flex-1 bg-white ">
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]'/>
          <Text className='text-2xl text-black font-semibold absolute bottom-5 left-5'>Create Your Account</Text>
        </View>

        <View className='p-5'>
          <InputField label="Name" placeholder="Enter your Name" icon={icons.person} value={form.name} onChangeText={(value:string)=>setForm({...form,name:value})}/>
          <InputField label="Email" placeholder="Enter your Email ID" icon={icons.email} value={form.email} onChangeText={(value:string)=>setForm({...form,email:value})}/>
          <InputField label="Password" placeholder="Enter your Password" icon={icons.lock} secureTextEntry={true} value={form.password} onChangeText={(value:string)=>setForm({...form,password:value})}/>
          {errorState.err && <Text className='font-light text-danger-500'>{errorState.message}</Text>}
        </View>

        <View className='p-5'>
          <CustomButton title='Sign up' onPress={onSignUpPress} className='mt-6'/>
          <OAuth googleText='Sign up with Google'/>
        </View>   

        <Link href={"/sign-in"} className='text-lg text-center text-general-200'>
          <Text> Already have an account ?</Text>
          <Text className='text-primary-500'> Log in</Text>
        </Link>

        <ReactNativeModal isVisible={verification.state==="pending"} onModalHide={()=>setVerification({...verification,state:"success"})}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className='text-2xl font-extrabold mb-2'>Verification</Text>
            <Text className='text-base text-gray-400 mt-2 text-center mb-5'>We have sent a verification code to {form.email}, please enter the code below</Text>
            <InputField label='Code' icon={icons.lock} value={verification.code} placeholder='1-2-3-4-5-6' keyboardType='numeric' onChangeText={(code)=>setVerification({...verification,code})}/>
            {verification.error && (
              <Text className='text-red-500 text-sm mt-1'>
                {verification.error}
              </Text>
            )}
            <CustomButton title='Verify email' onPress={onVerifyPress} className='mt-5' bgVariant='success'/>
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state==="success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={images.check} className='w-[110px] h-[110px] mx-auto my-5'/>
            <Text className='text-3xl font-bold text-center'>Verified!</Text>
            <Text className='text-base text-gray-400 mt-2 text-center mb-3'>You have successfully verified your account</Text>
            <CustomButton title='Browse Home' onPress={()=>router.replace("/(root)/(tabs)/home")}/>
          </View>
        </ReactNativeModal>

      </View>
    </ScrollView>
  )
}

export default signUp