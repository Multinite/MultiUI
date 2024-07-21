"use client";
import { createContext } from "react";

type MultiUIProviderProps = {};

const MultiUIContext = createContext<MultiUIProviderProps>({});

function MultiUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <MultiUIContext.Provider value={{}}>{children}</MultiUIContext.Provider>
  );
}

export default MultiUIProvider;