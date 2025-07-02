/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Router, useRouter } from 'expo-router';
import { View } from 'react-native';
import FullLoading from 'components/full-loading';
import { BackendClient } from 'utils/request';
import { UserInfo } from 'utils/types/user';
import { isErrorResponse, RequestLogsType } from 'utils/types/response';

interface HelperContextType {
  setNavigationText: (text: string) => void;
  navigationText: string;
  router: Router;
  showTopbar: boolean;
  setShowTopbar: (value: boolean) => void;
  setFullLoading: (value: boolean) => void;
  backendClient: BackendClient;
  userData: UserInfo | null;
  requestLogs: RequestLogsType[];
}

const HelperContext = createContext<() => HelperContextType>(() => {
  return {
    setNavigationText: () => {},
    navigationText: '',
    router: {} as Router,
    showTopbar: true,
    setShowTopbar: () => {},
    setFullLoading: () => {},
    backendClient: new BackendClient(() => {}, useRouter(), () => {}, () => {}),
    userData: null,
    requestLogs: [],
  };
});

export function HelperProvider({ children }: { children: ReactNode }) {
  const [navigationText, setNavigationText] = useState<string>('');
  const [showTopbar, setShowTopbar] = useState<boolean>(true);
  const [fullLoading, setFullLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [requestLogs, setRequestLogs] = useState<RequestLogsType[]>([]);
  const router = useRouter();

  const useHelper = useCallback(
    () => ({
      navigationText,
      setNavigationText,
      router,
      showTopbar,
      setShowTopbar,
      setFullLoading,
      backendClient: new BackendClient(setFullLoading, router, setUserData, setRequestLogs),
      userData,
      requestLogs
    }),
    [navigationText, setNavigationText, router, showTopbar, setShowTopbar, setFullLoading, userData, requestLogs]
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const backendClient = new BackendClient(setFullLoading, router, setUserData, setRequestLogs);
      const response = await backendClient.getUserInfo();
      if (!isErrorResponse(response)) {
        setUserData(response);
      }
    };
    fetchUserData();
  }, []);

  return (
    <HelperContext.Provider value={useHelper}>
      {fullLoading && <FullLoading />}
      <View style={{ display: fullLoading ? 'none' : 'contents' }}>{children}</View>
    </HelperContext.Provider>
  );
}

export const useHelperContext = () => useContext(HelperContext);
