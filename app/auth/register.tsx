import Botton from 'components/botton';
import Input from 'components/input';
import { useHelperContext } from 'components/providers/helper-provider';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { isValidEmail, isValidPassword } from 'utils/validate';

export default function Register() {
  const { setNavigationText, router } = useHelperContext()();

  useEffect(() => {
    setNavigationText('Account');
  }, [setNavigationText]);

  return (
    <View className="mt-16 px-10">
      <Text className="text-2xl font-bold">Create your account</Text>

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

      <Text className="mt-8 font-bold text-gray-500">Confirm password</Text>
      <Input
        placeholder="confirm password"
        className="mt-2"
        type="PASSWORD"
        validate={(value) =>
          isValidPassword(value) ? '' : 'Password must be at least 8 characters'
        }
      />

      <Botton text="Sign up" className="mt-8" />

      <View className="mt-10 flex flex-row items-center justify-center">
        <Text>Have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text className="ml-1 text-primary">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
