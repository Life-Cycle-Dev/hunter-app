/* eslint-disable react-hooks/exhaustive-deps */
import Botton from 'components/botton';
import Input from 'components/input';
import { useHelperContext } from 'components/providers/helper-provider';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { isValidEmail, isValidPassword } from 'utils/validate';

type RegisterData = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function Register() {
  const { setNavigationText, router, setShowTopbar, backendClient, userData } =
    useHelperContext()();
  const [data, setData] = useState<RegisterData>({});

  useEffect(() => {
    setNavigationText('');
    setShowTopbar(false);
  }, []);

  useEffect(() => {
    if (userData?.id !== '') {
      router.push('/');
    }
  }, [userData]);

  const onSetData = (key: any, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    await backendClient.signUp({
      name: data.name ?? '',
      email: data.email ?? '',
      password: data.password ?? '',
    });
  };

  const setDisable = (): boolean => {
    return !(
      !!data.email &&
      isValidEmail(data.email) &&
      !!data.password &&
      isValidPassword(data.password) &&
      data.password === data.confirmPassword &&
      !!data.name
    );
  };

  return (
    <SafeAreaView>
      <ScrollView className="min-h-screen px-10 pt-16">
        <Text className="text-2xl font-bold">Create your account</Text>

        <Text className="mt-14 font-bold text-gray-500">Name*</Text>
        <Input
          placeholder="name"
          type="TEXT"
          className="mt-2"
          validate={(value) => (value ? '' : 'Name is require')}
          onChange={(text) => onSetData('name', text)}
        />

        <Text className="mt-8 font-bold text-gray-500">Email*</Text>
        <Input
          placeholder="email"
          type="TEXT"
          className="mt-2"
          validate={(value) => (isValidEmail(value) ? '' : 'Invalid email address')}
          onChange={(text) => onSetData('email', text)}
        />

        <Text className="mt-8 font-bold text-gray-500">Password*</Text>
        <Input
          placeholder="password"
          className="mt-2"
          type="PASSWORD"
          validate={(value) =>
            isValidPassword(value) ? '' : 'Password must be at least 8 characters'
          }
          onChange={(text) => onSetData('password', text)}
        />

        <Text className="mt-8 font-bold text-gray-500">Confirm password*</Text>
        <Input
          placeholder="confirm password"
          className="mt-2"
          type="PASSWORD"
          validate={(value) => {
            if (!value) return 'Confirm password is required';
            if (data.password && value !== data.password) return 'Passwords do not match';
            return '';
          }}
          onChange={(text) => onSetData('confirmPassword', text)}
        />

        <Botton text="Sign up" className="mt-8" onPress={onSubmit} disable={setDisable()} />

        <View className="mt-10 flex flex-row items-center justify-center">
          <Text>Have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text className="ml-1 text-primary">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
