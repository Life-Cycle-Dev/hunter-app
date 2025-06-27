import { Text, Pressable, View } from 'react-native';

interface BottonProps {
  text: string;
  className?: string;
}

export default function Botton({ text, className }: BottonProps) {
  return (
    <Pressable>
      {({ pressed }) => (
        <View
          className={`flex items-center justify-center rounded-md p-4 ${pressed ? 'bg-primary_hover' : 'bg-primary'} ${className ?? ''}`}>
          <Text className="text-white">{text}</Text>
        </View>
      )}
    </Pressable>
  );
}
