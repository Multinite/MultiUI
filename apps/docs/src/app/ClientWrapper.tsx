"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "@multinite_official/multiui";

function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: `hsl(${theme.primary.DEFAULT})`,
          colorText: `hsl(${theme.foreground.DEFAULT})`,
          colorBackground: `hsl(${theme.background.DEFAULT})`,
          borderRadius: theme.borderRadius.md,
          colorDanger: `hsl(${theme.danger.DEFAULT})`,
          colorSuccess: `hsl(${theme.success.DEFAULT})`,
          colorTextOnPrimaryBackground: `hsl(${theme.foreground.DEFAULT})`,
        },
      }}
    >
      {children as any}
    </ClerkProvider>
  );
}

export default ClientWrapper;
