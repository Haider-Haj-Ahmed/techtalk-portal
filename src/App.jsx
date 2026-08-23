import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePusher } from './hooks/usePusher';
import AppLayout from './components/layout/AppLayout';
import FeedPage from './pages/FeedPage';
import ExplorePage from './pages/ExplorePage';
import ArticlePage from './pages/ArticlePage';
import NotificationsPage from './pages/NotificationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OtpPage from './pages/OtpPage';
import useAuthStore from './store/authStore';

const qc = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PusherInit() {
  usePusher();
  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'post/:slug', element: <ArticlePage type="post" /> },
      { path: 'blog/:slug', element: <ArticlePage type="blog" /> },
      {
        path: 'notifications',
        element: <ProtectedRoute><NotificationsPage /></ProtectedRoute>,
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/verify-otp', element: <OtpPage /> },
]);

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <PusherInit />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
