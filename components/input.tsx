import { TextInput, View, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useState } from 'react';

interface InputProps {
  placeholder?: string;
  className?: string;
  type: 'PASSWORD' | 'TEXT';
  validate?: (value: string) => string;
}

export default function Input({ placeholder, className, type, validate }: InputProps) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const isPassword = type === 'PASSWORD';

  const handleBlur = () => {
    if (validate) {
      setError(validate(value));
    }
  };

  const handleChangeText = (text: string) => {
    setValue(text);
    if (validate) {
      setError(validate(value));
    }
  };

  return (
    <View className={className ?? ''}>
      <View className="relative justify-center">
        <TextInput
          placeholder={placeholder ?? ''}
          className={`rounded-md border bg-white p-4 pr-12 ${error ? 'border-red-500' : 'border-gray-200'}`}
          secureTextEntry={isPassword && !show}
          value={value}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
        />
        {isPassword && (
          <Pressable
            onPressIn={() => setShow((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2">
            <Icon name={show ? 'eye' : 'eye-off'} size={20} color="#888" />
          </Pressable>
        )}
      </View>
      {error !== '' && <Text className="ml-1 mt-1 text-xs text-red-500">{error}</Text>}
    </View>
  );
}
