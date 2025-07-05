import './global.css';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import NavigationBar from 'components/navigation';
import { HelperProvider } from 'components/providers/helper-provider';
import Topbar from 'components/topbar';
import Toast from 'react-native-toast-message';
import DebugBtn from 'components/debug-btn';

export default function Layout() {
  return (
    <HelperProvider>
      <View className="relative flex-1 bg-[#f5f5f5]">
        <DebugBtn />
        <Topbar />
        <Slot />
        <NavigationBar />
      </View>
      <Toast />
    </HelperProvider>
  );
}
