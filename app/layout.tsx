import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: "nextAuth project",
  description: "Learn nextAuth once and for all",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
      <Toaster position="top-right"/>
        {children}
      </body>
    </html>
  );
}
