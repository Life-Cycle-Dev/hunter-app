import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Router, useRouter } from 'expo-router';

interface HelperContextType {
  setNavigationText: (text: string) => void;
  navigationText: string;
  router: Router;
}

const HelperContext = createContext<() => HelperContextType>(() => {
  return {
    setNavigationText: () => {},
    navigationText: '',
    router: {} as Router,
  };
});

export function HelperProvider({ children }: { children: ReactNode }) {
  const [navigationText, setNavigationText] = useState<string>('');
  const router = useRouter();

  const useHelper = useCallback(
    () => ({
      navigationText,
      setNavigationText,
      router,
    }),
    [navigationText, setNavigationText, router]
  );

  return <HelperContext.Provider value={useHelper}>{children}</HelperContext.Provider>;
}

export const useHelperContext = () => useContext(HelperContext);
