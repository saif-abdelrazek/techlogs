import "@/app/globals.css";
import React from "react";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";
import { auth } from "@/lib/auth";

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

      <main className="flex-1 font-work-sans">
        <div className="relative">
          {/* Content with proper spacing and responsive design */}
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
