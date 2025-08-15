import { auth } from "@/lib/auth";
import { client } from "@/sanity/lib/client";
import { PROJECTS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils/formatDate";

const Page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Fetch user's projects
  const userProjects = await client.fetch(PROJECTS_BY_AUTHOR_QUERY, {
    id: session.user.id,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-blue transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - User Info */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center">
                {/* User Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={session.user.image || "/default-avatar.png"}
                    alt={session.user.name || "User Avatar"}
                    fill
                    className="rounded-full object-cover border-4 border-primary-blue/20"
                  />
                </div>

                {/* User Details */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {session.user.name || "Anonymous User"}
                </h2>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {session.user.email}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-blue">
                      {userProjects?.length || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Projects to Edit
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="w-full flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Home</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/create"
                    className="w-full bg-primary-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                  >
                    Create New Project
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Projects List */}
          <div className="lg:col-span-3">
            {/* Header Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Edit Projects</h1>
                <p className="text-purple-100">
                  Select a project below to edit its details and keep your portfolio up to date
                </p>
              </div>
            </div>

            {/* Projects List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Projects
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Click on any project to start editing
                </p>
              </div>

              <div className="p-6">
                {userProjects && userProjects.length > 0 ? (
                  <div className="space-y-4">
                    {userProjects.map((project: { _id: string; image: string; title: string; name: string; description: string; category: string; _createdAt: string; views: number }) => (
                      <div
                        key={project._id}
                        className="group flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary-blue dark:hover:border-primary-blue transition-all duration-200"
                      >
                        {/* Project Image */}
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={project.image || "/placeholder-project.png"}
                            alt={project.name}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>

                        {/* Project Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-blue transition-colors duration-200 truncate">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {project.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(project._createdAt)}
                            </span>
                            <span className="text-xs bg-primary-blue/10 text-primary-blue px-2 py-1 rounded-full">
                              {project.category}
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>{project.views || 0}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/projects/${project._id}`}
                            className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                            title="View Project"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <Link
                            href={`/edit/${project._id}`}
                            className="bg-primary-blue hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Edit</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No projects to edit
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Create your first project to start editing
                    </p>
                    <Link
                      href="/create"
                      className="inline-block bg-primary-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Create Your First Project
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;