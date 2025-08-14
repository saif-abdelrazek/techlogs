import "@/app/globals.css";
import React from "react";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";
import { auth } from "@/lib/auth";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  // Show the loader while checking the session
  if (session === undefined) {
    return <Loader />;
  }

  let redirectTo; 
  try {
    if (session && session.user) {
      redirectTo = "/dashboard";
    }
  } finally {
    if (redirectTo) {
      redirect(redirectTo);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 dark:border-gray-800/80 backdrop-blur-xl bg-white/80 dark:bg-primary-black/80 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-primary-black/60"></header>
      {/* Main Content Area */}
      <main className="flex-1 font-work-sans">
        <div className="relative">
          {/* Content with proper spacing and responsive design */}
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
