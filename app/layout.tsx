import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

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
          <Toaster
            position="top-center"
            richColors
            closeButton
            expand
            duration={5000}
            offset={16}
            toastOptions={{
              className: "border border-slate-200 bg-white text-slate-900 shadow-lg",
              descriptionClassName: "text-slate-600",
              classNames: {
                success: "border-emerald-500/40",
                error: "border-red-500/40",
                warning: "border-amber-500/40",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
