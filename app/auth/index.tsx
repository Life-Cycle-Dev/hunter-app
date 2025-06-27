/* eslint-disable react-hooks/exhaustive-deps */
import { useHelperContext } from 'components/providers/helper-provider';
import { useEffect } from 'react';
import { Text } from 'react-native';

export default function Index() {
  const { setNavigationText, setShowTopbar } = useHelperContext()();

  useEffect(() => {
    setNavigationText('Account');
    setShowTopbar(true);
  }, []);

  return <Text>index</Text>;
}
