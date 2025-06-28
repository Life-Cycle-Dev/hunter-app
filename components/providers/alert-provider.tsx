import { Button, View } from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function Alert() {
  return (
    <AlertNotificationRoot>
      <View>
        <Button
          title={'dialog box'}
          onPress={() =>
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: 'Congrats! this is dialog box success',
              button: 'close',
            })
          }
        />
        <Button
          title={'toast notification'}
          onPress={() =>
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: 'Congrats! this is toast notification success',
            })
          }
        />
      </View>
    </AlertNotificationRoot>
  );
}
