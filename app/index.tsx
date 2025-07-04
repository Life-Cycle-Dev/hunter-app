/* eslint-disable react-hooks/exhaustive-deps */
import { useHelperContext } from 'components/providers/helper-provider';
import { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Index() {
  const { setNavigationText, setShowTopbar } = useHelperContext()();

  useEffect(() => {
    setNavigationText('Home');
    setShowTopbar(true);
  }, []);

  return (
    <ScrollView className="px-4">
      <View className="mt-8">
        <View className="flex-row items-center rounded-xl bg-primary/90 px-4 pb-8 shadow-sm">
          <Text className="px-2 py-4 text-2xl font-bold text-white">Hunter App</Text>
          <View className="rounded-md bg-white px-1">
            <Text className="text-sm font-semibold">Beta</Text>
          </View>
        </View>
        <View className="mt-[-20px] flex h-[90px] flex-row items-center justify-center gap-6 rounded-xl bg-white px-4 shadow-sm">
          <TouchableOpacity className="flex items-center justify-center gap-1">
            <View
              style={{
                display: 'flex',
                height: 40,
                width: 40,
                borderRadius: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="bg-primary/80">
              <FontAwesome name="folder" size={20} color="#ffffff" />
            </View>
            <Text>explore</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center gap-1">
            <View
              style={{
                display: 'flex',
                height: 40,
                width: 40,
                borderRadius: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="bg-primary/80">
              <FontAwesome5 name="money-bill-wave-alt" size={19} color="#ffffff" />
            </View>
            <Text>wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center gap-1">
            <View
              style={{
                display: 'flex',
                height: 40,
                width: 40,
                borderRadius: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="bg-primary/80">
              <FontAwesome name="star" size={20} color="#FFE99A" />
            </View>
            <Text>points</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center gap-1">
            <View
              style={{
                display: 'flex',
                height: 40,
                width: 40,
                borderRadius: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="bg-primary/80">
              <FontAwesome5 name="user-friends" size={18} color="#ffffff" />
            </View>
            <Text>friends</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
