import { Text, Pressable, View } from 'react-native';

interface BottonProps {
  text: string;
  onPress?: () => void;
  className?: string;
  outline?: keyof typeof outlineMapping;
}

const outlineMapping = {
  defualt: {
    bg: 'bg-primary',
    bgHover: 'bg-primary_hover',
    text: 'text-white',
  },
  secondary: {
    bg: 'bg-white',
    bgHover: 'bg-white/90',
    text: 'text-black',
  },
};

export default function Botton({
  text,
  className,
  onPress = () => {},
  outline = 'defualt',
}: BottonProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          className={`flex items-center justify-center rounded-md p-4 shadow-sm ${pressed ? outlineMapping[outline].bgHover : outlineMapping[outline].bg} ${className ?? ''}`}>
          <Text className={outlineMapping[outline].text}>{text}</Text>
        </View>
      )}
    </Pressable>
  );
}
