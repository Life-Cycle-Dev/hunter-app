import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Router, useRouter } from 'expo-router';
import { View } from 'react-native';
import FullLoading from 'components/full-loading';

interface HelperContextType {
  setNavigationText: (text: string) => void;
  navigationText: string;
  router: Router;
  showTopbar: boolean;
  setShowTopbar: (value: boolean) => void;
  setFullLoading: (value: boolean) => void;
}

const HelperContext = createContext<() => HelperContextType>(() => {
  return {
    setNavigationText: () => {},
    navigationText: '',
    router: {} as Router,
    showTopbar: true,
    setShowTopbar: () => {},
    setFullLoading: () => {},
  };
});

export function HelperProvider({ children }: { children: ReactNode }) {
  const [navigationText, setNavigationText] = useState<string>('');
  const [showTopbar, setShowTopbar] = useState<boolean>(true);
  const [fullLoading, setFullLoading] = useState<boolean>(true);
  const router = useRouter();

  const useHelper = useCallback(
    () => ({
      navigationText,
      setNavigationText,
      router,
      showTopbar,
      setShowTopbar,
      setFullLoading,
    }),
    [navigationText, setNavigationText, router, showTopbar, setShowTopbar, setFullLoading]
  );

  return (
    <HelperContext.Provider value={useHelper}>
      {fullLoading && <FullLoading />}
      <View style={{ display: fullLoading ? 'none' : 'contents' }}>{children}</View>
    </HelperContext.Provider>
  );
}

export const useHelperContext = () => useContext(HelperContext);
