import { Button, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function Alert() {
  return (
    <View>
      <Button
        title={'toast notification'}
        onPress={() =>
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Congrats! this is toast notification success',
          })
        }
      />
    </View>
  );
}
