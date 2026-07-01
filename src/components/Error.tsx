import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ErrorProps {
  message: string;
  onRedirect?: () => void;
}

export default function Error({ message, onRedirect }: ErrorProps) {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
    <View className="px-5 pt-2">
      {onRedirect && (
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-md bg-white"
          >
            <Ionicons name="chevron-back" size={22} color="#374151" />
          </Pressable>
        )}
        </View>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-md text-gray-400">
            {message}
          </Text>
        </View>
        </SafeAreaView>
  );
}