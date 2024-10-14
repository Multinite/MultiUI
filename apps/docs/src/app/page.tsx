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
      <div className="flex items-center justify-center pl-10">
        <Image
          src={logo}
          alt="MultiUI Logo"
          width={64}
          height={64}
          className="w-8 h-8"
        />
      </div>
      <div className="flex items-center justify-center">
        <header className="w-[50vw] h-full rounded-full border border-default bg-foreground/[0.5] bg-primary/50 bg-primary w-[50.4px] "></header>
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
