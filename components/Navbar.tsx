import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/lib/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ModeToggle from "@/components/ModeToggle";
import { handleAvatarImage } from "@/lib/utils/generateAvatar";
import SignoutBtn from "@/components/SignoutBtn";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white dark:bg-gray-900 shadow-sm font-work-sans border-b border-gray-200 dark:border-gray-700">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.svg" alt="logo" width={36} height={30} />
          <span className="text-xl font-bold text-primary-blue">TechLogs</span>
        </Link>

        {/* Navigation and Actions */}
        <div className="flex items-center gap-5 text-black dark:text-white">
          {/* Theme Toggle */}
          <ModeToggle />

          {session && session?.user ? (
            <>
              <Link
                href="/create"
                className="hover:bg-blue-100 dark:hover:bg-gray-800 px-3 py-2 rounded transition"
              >
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <SignoutBtn
                className="hover:bg-red-100 dark:hover:bg-gray-800 px-3 py-2 rounded transition"
              />

              <Link href={"/dashboard"}>
                <Avatar className="size-10">
                  <AvatarImage src={handleAvatarImage(session?.user ?? undefined)} alt={session?.user?.name || ""} />
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-600 dark:bg-sky-700 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 dark:hover:bg-sky-800 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
