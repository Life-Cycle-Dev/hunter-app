import Constants from 'expo-constants';

export const appConfig = {
  backendPath: Constants.expoConfig?.extra?.backendPath || 'http://localhost:9000',
};
