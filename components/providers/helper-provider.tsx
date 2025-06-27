import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Router, useRouter } from 'expo-router';

interface HelperContextType {
  setNavigationText: (text: string) => void;
  navigationText: string;
  router: Router;
  showTopbar: boolean;
  setShowTopbar: (value: boolean) => void;
}

const HelperContext = createContext<() => HelperContextType>(() => {
  return {
    setNavigationText: () => {},
    navigationText: '',
    router: {} as Router,
    showTopbar: true,
    setShowTopbar: () => {},
  };
});

export function HelperProvider({ children }: { children: ReactNode }) {
  const [navigationText, setNavigationText] = useState<string>('');
  const [showTopbar, setShowTopbar] = useState<boolean>(true);
  const router = useRouter();

  const useHelper = useCallback(
    () => ({
      navigationText,
      setNavigationText,
      router,
      showTopbar,
      setShowTopbar,
    }),
    [navigationText, setNavigationText, router, showTopbar, setShowTopbar]
  );

  return <HelperContext.Provider value={useHelper}>{children}</HelperContext.Provider>;
}

export const useHelperContext = () => useContext(HelperContext);
