import { Slot } from "expo-router";
import { View } from "react-native";

import './global.css';

export default function Layout() {
  return (
    <View className="bg-[#f5f5f5] min-h-screen">
      <Slot />
    </View>
  );
}