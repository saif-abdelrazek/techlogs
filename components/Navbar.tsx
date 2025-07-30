import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/lib/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModeToggle from "@/components/ModeToggle";
import { getAvatarFallback } from "@/lib/utils/generateAvatar";

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
                href="/projects/create"
                className="hover:bg-blue-100 dark:hover:bg-gray-800 px-3 py-2 rounded transition"
              >
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="hover:bg-blue-100 dark:hover:bg-gray-800 px-3 py-2 rounded transition flex items-center"
                >
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.user?.id || ""}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>
                    {getAvatarFallback(session?.user?.name ?? undefined)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-4 py-2 rounded-md font-medium hover:bg-blue-100 dark:hover:bg-gray-800 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
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
