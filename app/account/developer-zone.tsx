import { Text, View, Switch } from 'react-native';
import { useEffect } from 'react';
import { useHelperContext } from 'components/providers/helper-provider';
import { setItem } from 'utils/storage';

export default function DeveloperZone() {
  const { setShowTopbar, setNavigationText, setIsDebugMode, isDebugMode } = useHelperContext()();

  const toggleSwitch = () => {
    if (isDebugMode) {
      setItem('debug', 'false');
      setIsDebugMode(false);
    } else {
      setItem('debug', 'true');
      setIsDebugMode(true);
    }
  };

  useEffect(() => {
    setNavigationText('');
    setShowTopbar(true);
  });

  return (
    <View>
      <View className="mt-4 flex-row items-center p-5">
        <Switch value={isDebugMode} onValueChange={toggleSwitch} />
        <Text className="ml-4 font-bold">Debug Mode</Text>
      </View>
    </View>
  );
}
