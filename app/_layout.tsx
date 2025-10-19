import { Stack } from "expo-router";
import "@/global.css"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "Home"}}/>
      <Stack.Screen name="demo" options={{title: "Demo", presentation: 'modal'}}/>
      <Stack.Screen name="(test)" options={{title: "Test"}}/>
    </Stack>
  );
}
