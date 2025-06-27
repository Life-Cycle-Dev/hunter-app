import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useHelperContext } from './providers/helper-provider';

interface navigationType {
  icon: string;
  size: number;
  text: string;
  route: string;
}

// https://oblador.github.io/react-native-vector-icons use Feather only
export default function NavigationBar() {
  const { navigationText, router } = useHelperContext()();

  const navigations: navigationType[] = [
    {
      icon: 'home',
      size: 22,
      text: 'Home',
      route: '/',
    },
    {
      icon: 'user',
      size: 24,
      text: 'Account',
      route: '/auth/login',
    },
  ];

  return (
    <SafeAreaView
      edges={['bottom']}
      className="absolute bottom-0 left-0 right-0 w-full items-center bg-white pt-4 shadow-sm">
      <View className="flex flex-row justify-between gap-x-8">
        {navigations.map((navigation, index) => {
          if (navigationText === navigation.text) {
            return (
              <View key={index} className="flex items-center justify-center">
                <Icon
                  name={navigation.icon}
                  size={navigation.size}
                  color={navigationText === navigation.text ? '#1f329d' : '#111827'}
                />
                <Text
                  className={`text-sm font-semibold ${navigationText === navigation.text ? 'text-[#1f329d]' : 'text-gray-900'}`}>
                  {navigation.text}
                </Text>
              </View>
            );
          }

          return (
            <TouchableOpacity key={index} onPress={() => router.push(navigation.route)}>
              <View className="flex items-center justify-center">
                <Icon
                  name={navigation.icon}
                  size={navigation.size}
                  color={navigationText === navigation.text ? '#1f329d' : '#111827'}
                />
                <Text
                  className={`text-sm font-semibold ${navigationText === navigation.text ? 'text-[#1f329d]' : 'text-gray-900'}`}>
                  {navigation.text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
