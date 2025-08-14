import "@/app/globals.css";
import React from "react";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (session === undefined) {
    return <Loader />;
  }

  let redirectTo ; 
  try {
    if (!session || !session.user) {
      redirectTo = "/login";
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
      <div className="flex justify-end p-4">
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
          className="flex items-center space-x-4"
        >
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign Out
          </button>
        </form>
      </div>

      <main className="flex-1 font-work-sans">
        <div className="relative">
          {/* Content with proper spacing and responsive design */}
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
