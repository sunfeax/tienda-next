import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";

const interFont = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interFont.variable} antialiased`}
      >
        <ThemeProvider
          attribute={'class'}
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          themes={["light", "dark", "berry-sunset-light", "berry-sunset-dark"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
