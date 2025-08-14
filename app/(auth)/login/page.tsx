import Link from "next/link";
import GHSignIn from "@/components/github-sign-in";
import GoogleSignIn from "@/components/google-sign-in";

export default async function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>
        <Link href="/" className="inline-flex items-center space-x-2 mb-6">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-primary-blue"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium text-primary-blue hover:underline">
              Return to Home
            </span>
          </div>
        </Link>

        {/* Sign In Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8">
          {/* Social Sign In Options */}
          <div className="space-y-4 mb-6">
            <GoogleSignIn />
            <GHSignIn />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="text-primary-blue hover:text-blue-700 transition-colors duration-200"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary-blue hover:text-blue-700 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
