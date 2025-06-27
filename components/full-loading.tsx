import { ActivityIndicator, View, Text } from 'react-native';

export default function FullLoading() {
  return (
    <View className="items-center justify-center bg-primary min-h-full">
      <Text className='text-white font-bold text-4xl mb-5'>Hunter App</Text>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}
