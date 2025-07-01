/* eslint-disable react-hooks/exhaustive-deps */
import { useHelperContext } from 'components/providers/helper-provider';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { setNavigationText, setShowTopbar, router, userData, backendClient } = useHelperContext()();

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
      <TouchableOpacity>
        {userData?.id !== '' && (
          <Text className="mt-10 text-center text-xl text-red-600" onPress={onSignOut}>
            Sign Out
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
