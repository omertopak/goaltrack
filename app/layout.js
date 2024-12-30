import "./globals.css";
import Sidebar from "./(components)/Sidebar";
import { Providers } from "./providers";
export const metadata = {
  title: "Goal Rock",
  description: "Generated by Omer",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
        <Providers>
      <body className="h-screen max-h-screen w-screen flex flex-row">
        <Sidebar/>
        {children}
      </body>
        </Providers>
    </html>
  );
}
