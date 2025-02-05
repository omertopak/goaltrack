"use client";

import "./globals.css";
import Sidebar from "./(components)/Sidebar";
import { Providers } from "./providers";
import { usePathname } from 'next/navigation';
import { AuthProvider } from "./(components)/AuthProvider";


export default function RootLayout({ children }) {
  
  const pathname = usePathname();

  const noSidebarPages = ['/', '/register']; 
  const showSidebar = !noSidebarPages.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen max-h-screen w-screen flex flex-row">
        <AuthProvider>
        <Providers>
          {showSidebar && <Sidebar />}
          {children}
        </Providers>
        </AuthProvider>
      
      </body>
    </html>
  );
}

