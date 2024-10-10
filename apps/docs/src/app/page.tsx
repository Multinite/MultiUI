"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useTheme } from "@multinite_official/multiui";
import { dark } from "@clerk/themes";

export default function Home() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

function Header() {
  const { theme } = useTheme();

  return (
    <div className="w-screen h-32 py-10 grid grid-cols-[10%_80%_10%]">
      <div className="pl-10"></div>
      <div className="flex items-center justify-center">
        <header className="w-[50vw] h-full rounded-full bg-red-500"></header>
      </div>
      <div className="flex items-center justify-center pr-10">
        <SignedIn>
          <UserButton showName />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}
function Body() {
  return <></>;
}

function Footer() {
  return <></>;
}
