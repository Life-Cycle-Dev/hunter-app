/* eslint-disable react-hooks/exhaustive-deps */
import { useHelperContext } from 'components/providers/helper-provider';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { setNavigationText, setShowTopbar, router, userData, backendClient } =
    useHelperContext()();

  useEffect(() => {
    setNavigationText('Account');
    setShowTopbar(true);
  }, []);

  const onSignOut = async () => {
    await backendClient.logout();
    router.push('/');
  };

  return (
    <View>
      {userData?.is_developer && (
        <TouchableOpacity
          className="bg-white p-5"
          onPress={() => router.push('/account/developer-zone')}>
          <Text className="text-md">developer zone</Text>
        </TouchableOpacity>
      )}
      {userData?.id !== '' && (
        <TouchableOpacity>
          <Text className="text-md mt-5 text-center text-red-600" onPress={onSignOut}>
            Sign Out
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
