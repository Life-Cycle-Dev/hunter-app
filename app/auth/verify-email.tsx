import Botton from 'components/botton';
import { useHelperContext } from 'components/providers/helper-provider';
import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { getItem } from 'utils/storage';

export default function VerifyEmail() {
  const { backendClient } = useHelperContext()();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);
  const [ref, setRef] = useState('');
  const [email, setEmail] = useState('');

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    backendClient.verifyEmail({
      email: await getItem('VERIFY_EMAIL'),
      code: otpString,
      ref: await getItem('VERIFY_REF'),
    });
  };

  useEffect(() => {
    fetchRef();
  }, []);

  const fetchRef = async () => {
    setRef(await getItem('VERIFY_REF'));
    setEmail(await getItem('VERIFY_EMAIL'));
  };

  return (
    <SafeAreaView>
      <ScrollView className="min-h-screen px-10 pt-16">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <Text className="text-2xl font-bold">Verify your email</Text>
          <Text className="mt-3 text-base leading-6 text-gray-600">
            We&apos;ve sent a 6-digit verification code to {email}
          </Text>

          <View className="mt-10 flex-row justify-between">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                className="h-12 w-12 rounded-lg bg-white text-center text-xl font-bold text-gray-800"
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
                selectionColor="#3B82F6"
              />
            ))}
          </View>

          <Text className="mb-10 mt-3 text-gray-600">ref: {ref}</Text>

          <Botton
            text="Verify Email"
            disable={otp.join('').length !== 6}
            onPress={handleVerifyOtp}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
