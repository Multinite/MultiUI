import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn, Theme, ThemeProvider } from "@multinite_official/multiui";
import type { ReactNode } from "react";
import { default_theme } from "./test/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MultiUI Docs",
  description: "The MultiUI documentation.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "overflow-hidden bg-background text-foreground ring-focus transition-[background-color] ease-in-out duration-300"
        )}
      >
        {process.env.NODE_ENV === "production" && <Analytics />}
        <ThemeProvider>
          <Theme
            $theme={default_theme}
            $themeId="default"
            $enableBoxSelection={true}
            $defineThemeStylesInline={false}
            $persistOnLocalstorage
            $updateDocumentColorScheme
          >
            {children as any}
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
