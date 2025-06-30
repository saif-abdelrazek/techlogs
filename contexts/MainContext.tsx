"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useState, useContext, createContext } from "react";

const MainContext = createContext({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: (value: boolean) => {},
  setUser: (user: any) => {},
});

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
      <MainContext.Provider
        value={{
          isAuthenticated,
          user,
          setIsAuthenticated,
          setUser,
        }}
      >
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="techlogs-theme"
        >
          {children}
        </ThemeProvider>
      </MainContext.Provider>
    </SessionProvider>
  );
};
