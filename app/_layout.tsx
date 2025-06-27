import './global.css';
import { Slot } from 'expo-router';
import { SafeAreaView, View } from 'react-native';
import NavigationBar from 'components/navigation';
import { HelperProvider } from 'components/providers/helper-provider';

export default function Layout() {
  return (
    <HelperProvider>
      <View className="relative flex-1 bg-[#f5f5f5]">
        <SafeAreaView className="flex-1">
          <Slot />
          <NavigationBar />
        </SafeAreaView>
      </View>
    </HelperProvider>
  );
}
