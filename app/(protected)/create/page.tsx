import ProjectForm from "@/components/ProjectForm";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - User Info (matching dashboard) */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center">
                {/* User Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={session?.user?.image || "/default-avatar.png"}
                    alt={session?.user?.name || "User Avatar"}
                    fill
                    className="rounded-full object-cover border-4 border-primary-blue/20"
                  />
                </div>

                {/* User Details */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {session?.user?.name || "Anonymous User"}
                </h2>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {session?.user?.email}
                </p>

                {/* Navigation */}
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                  >
                    ← Back to Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                  >
                    Edit Profile
                  </Link>
                </div>

                {/* Tips Section */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 Project Tips
                  </h3>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1 text-left">
                    <li>• Use a clear, descriptive title</li>
                    <li>• Add high-quality images</li>
                    <li>• Include live demo links</li>
                    <li>• Write engaging descriptions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Project Form */}
          <div className="lg:col-span-3">
            {/* Header Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-primary-blue to-blue-600 rounded-xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
                <p className="text-blue-100">
                  Share your amazing project with the community and get valuable feedback
                </p>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Project Details
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Fill in the information below to showcase your project
                </p>
              </div>

              <div className="p-6">
                <ProjectForm />
              </div>
            </div>

            {/* Additional Help Section */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Need Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Best Practices</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Learn how to create compelling project descriptions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Support</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get help with project submission</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;