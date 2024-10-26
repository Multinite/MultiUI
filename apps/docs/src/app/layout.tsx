import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  cn,
  Theme,
  DisableDarkModeExtensions,
  disableDarkModeMeta,
  BoxSelection,
} from "@multinite_official/multiui";
import type { ReactNode } from "react";
import { default_theme } from "./test/themes";
import ClientWrapper from "./ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MultiUI Docs",
  description: "The MultiUI documentation.",
  ...disableDarkModeMeta,
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
        <DisableDarkModeExtensions>
          {process.env.NODE_ENV === "production" && <Analytics />}
            <Theme
              $theme={default_theme}
              $themeId="default"
              $enableBoxSelection={true}
              $persistOnLocalstorage
              $updateDocumentColorScheme
              className="w-screen h-screen bg-background text-foreground"
            >
              <BoxSelection
                $boxSelectionId="default"
                className="w-screen h-screen"
              >
                <ClientWrapper>{children as any}</ClientWrapper>
              </BoxSelection>
            </Theme>
        </DisableDarkModeExtensions>
      </body>
    </html>
  );
}
