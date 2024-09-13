import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (

    <Stack>
      <Stack.Screen name='index' options={{headerShown: false, statusBarColor:"#f5f5f5"}}/>
      <Stack.Screen name='(auth)' options={{headerShown: false, statusBarColor:"#f5f5f5"}}/>
      <Stack.Screen name='(tabs)' options={{headerShown: false, statusBarColor:"#f5f5f5"}}/>
      <Stack.Screen name='search/[query]' options={{headerShown: false, statusBarColor:"#f5f5f5"}}/>
    </Stack>

    
  )
}

export default RootLayout