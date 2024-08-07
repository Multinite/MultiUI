import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ClientLayout from "./ClientLayout";
import { cn, MultiUIProvider } from "@multinite_official/multiui";
import { theme_prefix } from "../../multiui.config.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MultiUI Docs",
  description: "The MultiUI documentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "overflow-hidden bg-background text-foreground ring-focus transition-[background-color] ease-in-out duration-300"
        )}
      >
        <Analytics />
        <ClientLayout>
          <MultiUIProvider
            config={{
              theme_prefix,
            }}
            // blurOnThemeChange
          >
            {children}
          </MultiUIProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
