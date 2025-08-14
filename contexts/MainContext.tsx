"use client";
import { SessionProvider } from "next-auth/react";
import { useState, useContext, createContext } from "react";
import { ThemeProvider } from "./providers/theme-provider";

const MainContext = createContext({});

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <MainContext.Provider
          value={{ isAuthenticated, user, setIsAuthenticated, setUser }}
        >
          {children}
        </MainContext.Provider>
      </ThemeProvider>
    </SessionProvider>
  );
};
export default MainProvider;
