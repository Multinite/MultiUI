"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import logo from "../../public/assets/logo_64.webp";

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
  return (
    <div className="w-screen h-32 py-10 grid grid-cols-[10%_80%_10%]">
      <div className="pl-10">
        <Image src={logo} alt="MultiUI Logo" width={64} height={64} />
      </div>
      <div className="flex items-center justify-center">
        <header className="w-[50vw] h-full rounded-full border border-default bg-foreground/50 bg-primary"></header>
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
