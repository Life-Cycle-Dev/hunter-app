/* eslint-disable react-hooks/exhaustive-deps */
import { useHelperContext } from 'components/providers/helper-provider';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { getAllKeys, getItem, setItem, removeItem } from 'utils/storage';
import Icon from 'react-native-vector-icons/Feather';
import * as Clipboard from 'expo-clipboard';
import { appConfig } from '../../utils/config';

const StorageTab = () => {
  const [keys, setKeys] = useState<{ name: string; value: any }[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const storageKeys = await getAllKeys();
    const keyStore = await Promise.all(
      storageKeys.map(async (item) => {
        const keyValue = await getItem(item);
        return {
          name: item,
          value: keyValue,
        };
      })
    );
    setKeys(keyStore);
  };

  const handleValueChange = async (name: string, newValue: string) => {
    await setItem(name, newValue);
    setKeys((prev) => prev.map((kv) => (kv.name === name ? { ...kv, value: newValue } : kv)));
  };

  const handleDeleteKey = async (name: string) => {
    await removeItem(name);
    setKeys((prev) => prev.filter((kv) => kv.name !== name));
  };

  return (
    <ScrollView className="min-h-screen px-4">
      {keys.length === 0 && (
        <Text className="text-center text-gray-400">No storage keys found.</Text>
      )}
      {keys.map((kv) => (
        <View key={kv.name} className="mb-4">
          <Text className="mb-1 font-bold">{kv.name}</Text>
          <View className="flex-row items-center">
            <TextInput
              value={kv.value ?? ''}
              onChangeText={(text) => handleValueChange(kv.name, text)}
              className="flex-1 rounded-md border border-gray-300 bg-white p-2"
            />
            <TouchableOpacity
              onPress={async () => {
                await Clipboard.setStringAsync(kv.value ?? '');
              }}
              className="ml-2 p-2">
              <Icon name="copy" size={20} color="#1f329d" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteKey(kv.name)} className="ml-2 p-2">
              <Icon name="trash-2" size={20} color="#e11d48" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const RequestTab = ({ logs }: { logs: any[] }) => (
  <ScrollView className="min-h-screen px-4 pb-20">
    {logs.length === 0 && <Text className="text-center text-gray-400">No request logs found.</Text>}
    {logs.map((log, idx) => (
      <View key={idx} className="mb-4 rounded-lg border border-gray-100 bg-[#fafbff] p-3">
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="font-bold">
            {log.method} {log.path}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              let curl = `curl -X ${log.method.toUpperCase()} '${appConfig.backendPath}${log.path}'`;
              if (log.header) {
                Object.entries(log.header).forEach(([key, value]) => {
                  if (typeof value === 'string') {
                    curl += ` -H '${key}: ${value.replace(/'/g, "'\''")}'`;
                  }
                });
              }
              if (log.payload && Object.keys(log.payload).length > 0) {
                const data = JSON.stringify(log.payload).replace(/'/g, "'\''");
                curl += ` --data '${data}'`;
              }
              await Clipboard.setStringAsync(curl);
            }}
            className="ml-2 px-2 py-1">
            <Icon name="copy" size={16} color="#1f329d" />
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-gray-700">Status: {log.status}</Text>
        <Text className="text-sm text-gray-700">Time: {new Date(log.time).toLocaleString()}</Text>
        <Text className="mt-1 text-xs font-semibold text-gray-700">Header:</Text>
        <View className="mb-1 max-h-24 rounded bg-white p-2">
          <Text
            className="text-xs text-gray-500"
            selectable
            numberOfLines={5}
            style={{ flexWrap: 'wrap' }}>
            {JSON.stringify(log.header, null, 2)}
          </Text>
        </View>
        <Text className="text-xs font-semibold text-gray-700">Payload:</Text>
        <View className="mb-1 max-h-24 rounded bg-white p-2">
          <Text
            className="text-xs text-gray-500"
            selectable
            numberOfLines={5}
            style={{ flexWrap: 'wrap' }}>
            {JSON.stringify(log.payload, null, 2)}
          </Text>
        </View>
        <Text className="text-xs font-semibold text-gray-700">Response:</Text>
        <View className="max-h-32 rounded bg-white p-2">
          <Text
            className="text-xs text-gray-500"
            selectable
            numberOfLines={5}
            style={{ flexWrap: 'wrap' }}>
            {JSON.stringify(log.response, null, 2)}
          </Text>
        </View>
      </View>
    ))}
  </ScrollView>
);

export default function Index() {
  const { setNavigationText, setShowTopbar, requestLogs, router } = useHelperContext()();
  const [tab, setTab] = useState<'request' | 'storage'>('request');

  useEffect(() => {
    setNavigationText('Debug');
    setShowTopbar(false);
  }, []);

  return (
    <SafeAreaView>
      <View className="mt-2 flex-row items-center px-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-2 p-2">
          <Icon name="arrow-left" size={24} color="#1f329d" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Hunter Debug</Text>
      </View>
      <View className="mb-4 flex-row self-center">
        <TouchableOpacity
          onPress={() => setTab('request')}
          className={`border-b-2 px-6 py-2 ${tab === 'request' ? 'border-primary' : 'border-transparent'} mr-4`}>
          <Text className={`font-bold ${tab === 'request' ? 'text-primary' : 'text-gray-400'}`}>
            Request
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('storage')}
          className={`border-b-2 px-6 py-2 ${tab === 'storage' ? 'border-primary' : 'border-transparent'}`}>
          <Text className={`font-bold ${tab === 'storage' ? 'text-primary' : 'text-gray-400'}`}>
            Storage
          </Text>
        </TouchableOpacity>
      </View>
      {tab === 'request' && <RequestTab logs={requestLogs} />}
      {tab === 'storage' && <StorageTab />}
    </SafeAreaView>
  );
}
