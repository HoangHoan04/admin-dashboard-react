import { useEffect, useState } from 'react';
import useLoadingStore from '@/store/loadingStore';

export const usePageLoader = (message?: string, delay: number = 600) => {
  const showLoading = useLoadingStore((state) => state.showLoading);
  const hideLoading = useLoadingStore((state) => state.hideLoading);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    showLoading(message);
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
      hideLoading();
    }, delay);

    return () => {
      clearTimeout(timer);
      hideLoading();
    };
  }, [message, delay, showLoading, hideLoading]);

  return isLoaded;
};

export default usePageLoader;
