'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '../../lib/stores/authStore';

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, token } = useAuthStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde authentication durumunu kontrol et
    setIsLoaded(true);

    // Public route'ları tanımla
    const publicRoutes = ['/', '/register'];
    console.log(isAuthenticated, token);
    // Eğer authenticated değilse ve public route değilse login'e yönlendir
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push('/');
    }
  }, [isAuthenticated, pathname]);


  // Henüz yüklenmemişse null döndür
  if (!isLoaded) return null;

  return children;
}