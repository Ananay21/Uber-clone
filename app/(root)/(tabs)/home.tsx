import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView className='bg-black w-full h-full flex items-center justify-center'>
      <Text className='text-white text-3xl font-Jakarta'>Home</Text>
    </SafeAreaView>
  )
}

export default Home