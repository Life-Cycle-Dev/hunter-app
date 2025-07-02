import { ActivityIndicator, View, Text } from 'react-native';

export default function FullLoading() {
  return (
    <View className="min-h-full items-center justify-center bg-primary">
      <Text className="mb-5 text-4xl font-bold text-white">Hunter App</Text>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}
