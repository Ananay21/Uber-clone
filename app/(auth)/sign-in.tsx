import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import { useSignIn } from '@clerk/clerk-expo'
import CustomButton from '@/components/CustomButton'
import { Link,useRouter} from 'expo-router'
import OAuth from '@/components/OAuth'

const signIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()  
  const [form,setForm]=useState({email:"",password:""})

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

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

export default signIn