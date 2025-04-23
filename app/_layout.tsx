import { SplashScreen, Stack } from "expo-router";
import {useFonts} from "expo-font";
import "./globals.css"
import { useEffect } from "react";
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import {tokenCache} from "@clerk/clerk-expo/token-cache"

export default function RootLayout() {
  const [Loaded] = useFonts({"Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),});

  useEffect(()=>{
    if (Loaded) SplashScreen.hideAsync();
  },[Loaded])

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  return <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
  <ClerkLoaded>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  </ClerkLoaded>
</ClerkProvider>
}
