/* eslint-disable react-hooks/exhaustive-deps */
import Botton from 'components/botton';
import Input from 'components/input';
import { useHelperContext } from 'components/providers/helper-provider';
import { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { isValidEmail, isValidPassword } from 'utils/validate';

export default function Login() {
  const { setNavigationText, router, setShowTopbar } = useHelperContext()();

  useEffect(() => {
    setNavigationText('');
    setShowTopbar(false);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView className="pt-16 px-10 min-h-screen">
        <Text className="text-2xl font-bold">Login to your account</Text>

        <Text className="mt-14 font-bold text-gray-500">Email</Text>
        <Input
          placeholder="email"
          type="TEXT"
          className="mt-2"
          validate={(value) => (isValidEmail(value) ? '' : 'Invalid email address')}
        />

        <Text className="mt-8 font-bold text-gray-500">Password</Text>
        <Input
          placeholder="password"
          className="mt-2"
          type="PASSWORD"
          validate={(value) =>
            isValidPassword(value) ? '' : 'Password must be at least 8 characters'
          }
        />
        <TouchableOpacity>
          <Text className="mt-4 text-right text-primary">forgot password?</Text>
        </TouchableOpacity>
        <Botton text="Sign in" className="mt-8" />

        <View className="mt-10 flex flex-row items-center justify-center">
          <Text>Don&apos;t have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className="ml-1 text-primary">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
