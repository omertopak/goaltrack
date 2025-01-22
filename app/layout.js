// app/layout.js (Client Component)
"use client"; // Bu bileşeni Client Component yapıyor

import "./globals.css";
import Sidebar from "./(components)/Sidebar";
import { Providers } from "./providers";
import { usePathname } from 'next/navigation'; // usePathname kullanımı

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noSidebarPages = ['/', '/register']; // Sidebar'ı gizlemek istediğiniz sayfalar
  const showSidebar = !noSidebarPages.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen max-h-screen w-screen flex flex-row">
        <Providers>
          {showSidebar && <Sidebar />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
