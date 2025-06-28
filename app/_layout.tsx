import './global.css';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import NavigationBar from 'components/navigation';
import { HelperProvider } from 'components/providers/helper-provider';
import Topbar from 'components/topbar';
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default function Layout() {
  return (
    <AlertNotificationRoot>
      <HelperProvider>
        <View className="relative flex-1 bg-[#f5f5f5]">
          <Topbar />
          <Slot />
          <NavigationBar />
        </View>
      </HelperProvider>
    </AlertNotificationRoot>
  );
}
