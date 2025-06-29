import { auth } from "@/auth";
import React from "react";
import Image from "next/image";

async function page() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          You must be logged in to view this page.
        </h1>
      </div>
    );
  }
  console.log("Session:", session);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">
        Welcome to the Dashboard, {session.user?.email || session.user?.name}!
      </h1>
      {session.user?.image ? (
        <>
          <p className="mt-4">Your profile picture:</p>
          <Image
            src={session.user?.image || "/default-avatar.png"}
            alt="User Avatar"
            width={100}
            height={100}
          />
        </>
      ) : (
        <p className="mt-4">
          {session.user?.name?.slice(0, 10) || "No name available."}
        </p>
      )}
    </div>
  );
}

export default page;
