import { useHelperContext } from 'components/providers/helper-provider';
import { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function Index() {
  const { setNavigationText } = useHelperContext()();

  useEffect(() => {
    setNavigationText('Home');
  }, [setNavigationText]);

  return (
    <SafeAreaView>
      <Text>index</Text>
    </SafeAreaView>
  );
}
