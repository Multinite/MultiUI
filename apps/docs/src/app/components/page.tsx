"use client";
import { Highlight } from "prism-react-renderer";
import Markdown from "markdown-to-jsx";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { getComponent } from "./actions/getComponent";
import Image from "next/image";
import useSWR from "swr";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { cn } from "@multinite_official/multiui";
import { Component } from "../../db/schema/component";

function Page() {
  const [packages, $packages] = useState<Component[]>([]);
  const [selectedPackage, $selectedPackage] = useState<Component | null>(null);

  useEffect(() => {
    getComponent().then((res) => {
      console.log(res);
      if (res.success) {
        $packages(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  return (
    <div className="flex w-screen h-screen overflow-auto">
      <div
        className={cn(
          "h-screen p-16 flex flex-wrap content-start justify-center gap-10"
        )}
        style={{
          width: selectedPackage ? "500px" : "100vw",
        }}
      >
        {packages.map((pkg) => {
          return (
            <PackageCard
              pkg={pkg}
              key={pkg.id}
              $selectedPackage={$selectedPackage}
            />
          );
        })}
      </div>
      <AnimatePresence>
        {selectedPackage ? (
          <PackageDisplay
            pkg={selectedPackage}
            $selectedPackage={$selectedPackage}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default Page;
const fetcher = (url: string) => fetch(url).then((res) => res.text());

function PackageDisplay({
  pkg,
  $selectedPackage,
}: {
  pkg: Component;
  $selectedPackage: Dispatch<SetStateAction<Component | null>>;
}) {
  const { data, error, isLoading } = useSWR(
    `https://raw.githubusercontent.com/${pkg.github_repo_owner}/${pkg.github_repo_name}/main/README.md`,
    fetcher
  );

  return (
    <motion.div
      className="w-full h-full sticky overflow-x-hidden top-0 border-l-2 border-zinc-900/80 p-10 bg-black grid grid-cols-[65%_35%] gap-5 overflow-y-auto"
      initial={{ translateX: "100%" }}
      animate={{ translateX: 0 }}
      exit={{ translateX: "100%" }}
      key="pacakge-display"
    >
      {/* left column */}
      <div className="w-full h-full">
        <div slot="header" className="flex w-full gap-5">
          <button
            className="w-fit h-10 rounded-lg bg-transparent outline-none border-none px-4 hover:bg-[rgba(255,255,255,0.2)] transition-all duration-150 ease-in-out flex gap-2 justify-center items-center"
            aria-label="Back"
            onClick={() => $selectedPackage(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-4 fill-current"
            >
              <path d="M7.4 273.4C2.7 268.8 0 262.6 0 256s2.7-12.8 7.4-17.4l176-168c9.6-9.2 24.8-8.8 33.9 .8s8.8 24.8-.8 33.9L83.9 232 424 232c13.3 0 24 10.7 24 24s-10.7 24-24 24L83.9 280 216.6 406.6c9.6 9.2 9.9 24.3 .8 33.9s-24.3 9.9-33.9 .8l-176-168z" />
            </svg>
            Back
          </button>
        </div>
        <h1 className="mt-10 text-4xl font-bold">{pkg.name}</h1>
        <p className="mt-2 text-zinc-500">{pkg.description}</p>
        <div className="w-full mt-10 mb-5 h-fit">
          <Image
            src={pkg.thumbnail_url}
            alt={pkg.name}
            width={350}
            height={140}
            quality={100}
            className="w-full h-full rounded-lg "
          />
        </div>

        {isLoading ? (
          "loading"
        ) : (
          <Markdown
            options={{
              wrapper: "article",
              overrides: {
                code: SyntaxHighlightedCode,
              },
            }}
          >
            {data as string}
          </Markdown>
        )}
        <div className="w-0 h-56"></div>
      </div>
      {/* right column */}
      <div className="sticky top-0 w-full h-full">
        <div className="w-0 h-10 mb-36"></div>
        <div className="w-full h-fit flex flex-col gap-0.5">
          {[
            {
              name: "Repository",
              value: pkg.github_repo_name,
              url: pkg.github_url,
              type: "link",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  className="w-4 fill-current"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              ),
            },
            {
              name: "Likes",
              value: pkg.likes,
              action: () => {},
              type: "button",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 fill-current"
                >
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
                </svg>
              ),
            },
            {
              name: "Dislikes",
              value: pkg.dislikes,
              action: () => {},
              type: "button",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 rotate-180 fill-current"
                >
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
                </svg>
              ),
            },
            {
              name: "Downloads",
              value: pkg.downloads,
              action: () => {},
              type: "button",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="size-3.5 min-w-3.5 fill-current"
                >
                  <path d="M32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480zM214.6 342.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 242.7 160 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 178.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128z" />
                </svg>
              ),
            },
            {
              name: "Created At",
              value: new Intl.DateTimeFormat("en-US").format(
                new Date(pkg.createdAt)
              ),
              action: () => {},
              type: "button",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-4 fill-current"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
              ),
            },
          ].map((item, index) => {
            return item.type === "link" ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                key={index}
                className="w-fit h-10 rounded-lg bg-transparent outline-none border-none px-4 hover:bg-[rgba(255,255,255,0.2)] transition-all duration-150 ease-in-out flex gap-2 justify-center items-center"
              >
                {item.icon}
                <span className="">{item.name}:</span>{" "}
                <span className="font-bold">{item.value}</span>
              </a>
            ) : (
              <button
                key={index}
                aria-label={item.name}
                onClick={item.action}
                className="w-fit h-10 rounded-lg bg-transparent outline-none border-none px-4 hover:bg-[rgba(255,255,255,0.2)] transition-all duration-150 ease-in-out flex gap-2 justify-center items-center"
              >
                {item.icon}
                <span className="">{item.name}:</span>{" "}
                <span className="font-bold">{item.value}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function PackageCard({
  pkg,
  $selectedPackage,
}: {
  pkg: Component;
  $selectedPackage: Dispatch<SetStateAction<Component | null>>;
}) {
  const percentage_of_likes = Math.round(
    (pkg.likes / (pkg.likes + pkg.dislikes)) * 100
  );
  return (
    <motion.div
      className="group w-[350px] h-[255px] bg-black rounded-lg border-2 border-zinc-900/80 hover:scale-110 transition-all duration-150 cursor-pointer select-none"
      key={pkg.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, type: "just" }}
    >
      <div
        className="w-full h-full"
        role="button"
        aria-label={`${pkg.name} package`}
        onClick={() => {
          $selectedPackage(pkg);
        }}
      >
        <div className="w-full h-[140px] opacity-80 group-hover:opacity-100 transition-opacity duration-150 ease-in-out">
          <Image
            src={`${pkg.thumbnail_url}`}
            alt={`${pkg.name} thumbnail`}
            width={350}
            height={140}
            className="object-cover w-full h-full rounded-lg rounded-b-none"
            draggable={false}
          />
        </div>
        <div className="w-full h-[calc(250px_-_140px)] px-4 mt-2">
          <h1 className="text-lg font-bold group-hover:underline">
            {pkg.name}
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5">{pkg.description}</p>
          <div className="flex items-end w-full h-10 pb-3 mt-2">
            <div className="flex gap-1.5 min-w-[100px] w-fit text-zinc-600 justify-start items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="size-3.5 min-w-3.5 fill-current"
              >
                <path d="M32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480zM214.6 342.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 242.7 160 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 178.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128z" />
              </svg>
              <span className="text-[12px] w-fit text-nowrap">
                {pkg.downloads} Downloads
              </span>
            </div>
            <div className="flex items-center justify-end w-full text-zinc-600">
              <div className="w-fit h-fit flex gap-1.5 text-zinc-600 justify-center items-center relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="size-3.5 fill-current"
                >
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
                </svg>
                <span className="text-[12px]">{pkg.likes}</span>
                <div className="w-2"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="size-3.5 fill-current rotate-180"
                >
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
                </svg>
                <span className="text-[12px]">{pkg.dislikes}</span>
                <div className="absolute -bottom-2 w-[calc(100%_+_5px)] h-1 grid grid-cols-4 gap-0.5">
                  <div
                    className={cn(
                      "w-full h-full rounded-sm ",
                      percentage_of_likes === 0
                        ? "bg-zinc-800"
                        : percentage_of_likes > 0
                          ? "bg-zinc-600"
                          : "bg-zinc-800"
                    )}
                  ></div>
                  <div
                    className={cn(
                      "w-full h-full rounded-sm ",
                      percentage_of_likes === 0
                        ? "bg-zinc-800"
                        : percentage_of_likes > 25
                          ? "bg-zinc-600"
                          : "bg-zinc-800"
                    )}
                  ></div>
                  <div
                    className={cn(
                      "w-full h-full rounded-sm ",
                      percentage_of_likes === 0
                        ? "bg-zinc-800"
                        : percentage_of_likes > 50
                          ? "bg-zinc-600"
                          : "bg-zinc-800"
                    )}
                  ></div>
                  <div
                    className={cn(
                      "w-full h-full rounded-sm ",
                      percentage_of_likes === 0
                        ? "bg-zinc-800"
                        : percentage_of_likes > 75
                          ? "bg-zinc-600"
                          : "bg-zinc-800"
                    )}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SyntaxHighlightedCode(props: any) {
  console.log(props);
  return (
    <Highlight
      language={props.className.replace("lang-", "")}
      code={props.children}
      // theme={themes.duotoneDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={cn(
            "p-3 rounded-md my-3 font-mono overflow-x-auto",
            props.className
          )}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
