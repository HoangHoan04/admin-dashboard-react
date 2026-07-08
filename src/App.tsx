import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/index';
import ToastContainer from './components/common/ToastContainer';
import LoadingScreen from './components/common/LoadingScreen';
import { useEffect } from 'react';
import useDashboardStore from '@/store/dashboardStore';
import { loadLocale } from './locales/i18n';

export default function App() {
  const language = useDashboardStore((state) => state.settings.language);

  useEffect(() => {
    loadLocale(language);
  }, [language]);

  return (
    <Router>
      <AppRoutes />
      <ToastContainer />
      <LoadingScreen />
    </Router>
  );
}
