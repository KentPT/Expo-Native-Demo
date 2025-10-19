import { Text, View, Pressable, TouchableOpacity } from "react-native";
// expo router: Link or useRouter
import { Link, useRouter, Stack } from "expo-router";
import "@/global.css"

export default function Index() {
  const router = useRouter();
  return (
    <>
    <Stack.Screen
      options={{

        headerRight: () => (
          <Pressable onPress={() => router.push('./demo')}>
            <Text>Go to Demo!</Text>
          </Pressable>
        ),

        headerLeft: () => (
          <Pressable onPress={() => router.push('./test')}>
            <Text>Go to Test!</Text>
          </Pressable>
        )
      }}
    />
      <View className="flex-1 justify-center items-center">
      <Text className="text-red-500 p-3 border-l-rose-600">Edit app/index.tsx to edit this screen.</Text>
      <Text>Welcome to Expo App</Text>

      <Link
      href={'/test'} // link to different pages
      >
         <Text className="text-blue-400">Link to Test!</Text>
      </Link>

      <Link
      href={'/demo'} // link to different pages
      >
         <Text className="text-lime-400">Link to Demo Modal!</Text>
      </Link>

      <TouchableOpacity className="p-3 m-4 bg-lime-800" onPress={() => router.push('./task')}>
        <Text className="text-white">Task Supabase x React Native x Expo</Text>
      </TouchableOpacity>

    </View>
    </>
  );
}
