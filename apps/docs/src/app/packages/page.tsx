"use client";
import { useEffect, useState } from "react";
import { getPackages } from "./actions/getPackages";
import { Packages } from "../../db/schema/packages";
import Image from "next/image";

function Page() {
  const [packages, $packages] = useState<Packages[]>([]);

  useEffect(() => {
    getPackages().then((res) => {
      if (res.success) {
        $packages(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen p-16 flex flex-wrap content-start justify-center gap-10">
      {packages.map((pkg) => {
        console.log(pkg);
        const percentage_of_likes = Math.round(
          (pkg.likes / (pkg.likes + pkg.dislikes)) * 100
        );
        return (
          <div
            key={pkg.id}
            className="group w-[350px] h-[255px] bg-black rounded-lg border-2 border-zinc-900/80 hover:scale-110 transition-all duration-150 cursor-pointer select-none"
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
              <h1 className="font-bold text-lg group-hover:underline">
                {pkg.name}
              </h1>
              <p className="text-sm text-zinc-500 mt-0.5">{pkg.description}</p>
              <div className="mt-2 h-10 w-full flex items-end pb-3">
                <div className="flex gap-1.5 min-w-[100px] w-fit text-zinc-600 justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="size-3.5 min-w-3.5 fill-current"
                  >
                    <path d="M32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480zM214.6 342.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 242.7 160 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 178.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128z" />
                  </svg>
                  <span className="text-[12px] w-fit text-nowrap">{pkg.downloads} Downloads</span>
                </div>
                <div className="w-full flex text-zinc-600 justify-end items-center">
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
                        className={
                          "w-full h-full rounded-sm " +
                          (percentage_of_likes === 0
                            ? "bg-zinc-800"
                            : percentage_of_likes > 0
                              ? "bg-zinc-600"
                              : "bg-zinc-800")
                        }
                      ></div>
                      <div
                        className={
                          "w-full h-full rounded-sm " +
                          (percentage_of_likes === 0
                            ? "bg-zinc-800"
                            : percentage_of_likes > 25
                              ? "bg-zinc-600"
                              : "bg-zinc-800")
                        }
                      ></div>
                      <div
                        className={
                          "w-full h-full rounded-sm " +
                          (percentage_of_likes === 0
                            ? "bg-zinc-800"
                            : percentage_of_likes > 50
                              ? "bg-zinc-600"
                              : "bg-zinc-800")
                        }
                      ></div>
                      <div
                        className={
                          "w-full h-full rounded-sm " +
                          (percentage_of_likes === 0
                            ? "bg-zinc-800"
                            : percentage_of_likes > 75
                              ? "bg-zinc-600"
                              : "bg-zinc-800")
                        }
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Page;
