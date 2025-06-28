import { Text, Pressable, View } from 'react-native';

interface BottonProps {
  text: string;
  onPress?: () => void;
  className?: string;
  outline?: keyof typeof outlineMapping;
  disable?: boolean;
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
  disable = false,
}: BottonProps) {
  return (
    <Pressable onPress={onPress} disabled={disable}>
      {({ pressed }) => {
        const isDisabled = disable;
        const outlineStyle = outlineMapping[outline];
        const bgClass = isDisabled
          ? 'bg-gray-300'
          : pressed
            ? outlineStyle.bgHover
            : outlineStyle.bg;
        const textClass = isDisabled ? 'text-gray-900' : outlineStyle.text;
        const opacityClass = isDisabled ? 'opacity-50' : '';
        return (
          <View
            className={`flex items-center justify-center rounded-md p-4 shadow-sm ${bgClass} ${opacityClass} ${className ?? ''}`}>
            <Text className={textClass}>{text}</Text>
          </View>
        );
      }}
    </Pressable>
  );
}
