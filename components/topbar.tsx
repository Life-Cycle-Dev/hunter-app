import { Text, View, SafeAreaView } from 'react-native';
import Botton from './botton';
import { useHelperContext } from './providers/helper-provider';

export default function Topbar() {
  const { router, showTopbar, userData } = useHelperContext()();

  if (!showTopbar) {
    return;
  }

  return (
    <View className="justify-center bg-primary/90">
      <SafeAreaView className="justify-center ">
        <View className="px-8 py-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-white">
              Welcome {userData?.id !== '' ? 'Back ✌️' : ''}
            </Text>

            {userData?.id === '' && (
              <View className="flex flex-row gap-4">
                <Botton
                  text="Sign in"
                  onPress={() => router.push('/auth/login')}
                  outline="secondary"
                />
                <Botton text="Sign up" onPress={() => router.push('/auth/register')} />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
