'use client';
import  useAuthStore  from '../../lib/stores/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PROTECTED_ROUTES = ['/calendar', '/chain'];
const AUTH_ROUTES = ['/', '/register'];

export function AuthProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, token} = useAuthStore();

  useEffect(() => {
    const handleRouteProtection = async () => {
     

      if (!isAuthenticated && PROTECTED_ROUTES.includes(pathname)) {
        router.push('/');
        return;
      }

      if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
        router.push('/calendar');
      }
    };

    handleRouteProtection();
  }, [pathname, isAuthenticated, token]);

  return children;
}