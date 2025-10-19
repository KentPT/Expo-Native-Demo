import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    // <Stack>
    // </Stack>
    <Tabs>
      <Tabs.Screen name="test" options={{title: "Test", headerShown: false}}/>
      <Tabs.Screen name="demo2" options={{title: "Demo2", headerShown: false}}/>
    </Tabs>
  );
}
