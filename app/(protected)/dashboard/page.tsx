import { auth } from "@/lib/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY, PROJECTS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";
import SignoutBtn from "@/components/SignoutBtn";
import DeleteProjectButton from "@/components/DeleteProjectButton";

async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You must be logged in to view this page.
          </p>
        </div>
      </div>
    );
  }

  // Check if user has an author profile
  const authorProfile = await client.fetch(AUTHOR_BY_ID_QUERY, {
    id: session.user.id,
  });

  // Fetch user's projects only if they have an author profile
  const userProjects = authorProfile ? await client.fetch(PROJECTS_BY_AUTHOR_QUERY, {
    id: session.user.id,
  }) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {!authorProfile && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Author Profile Not Found
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Your author profile hasn't been created. Please go <Link href="/create">create a project</Link>.
                </p>
              </div>
            </div>
          </div>
        )}
        
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
                    className="rounded-full object-cover border-4 border-blue-200 dark:border-blue-800"
                  />
                </div>

                {/* User Details */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {session.user.name || "Anonymous User"}
                </h2>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {session.user.email}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {userProjects?.length || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Projects
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                        {userProjects?.reduce((total: number, project: { views: number }) => total + (project.views || 0), 0) || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Total Views
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    href="/create"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                  >
                    Create Project
                  </Link>
                  <Link
                    href="/projects"
                    className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                  >
                    View All Projects
                  </Link>
                  <Link
                    href="/"
                    className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                  >
                    Go Home
                  </Link>
                  {/* Sign Out Button */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <SignoutBtn 
                      variant="outline" 
                      size="md" 
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - User Projects */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  My Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your projects and track their performance
                </p>
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    My Projects
                  </h2>
                  <Link
                    href="/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    + New Project
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {userProjects && userProjects.length > 0 ? (
                  <div className="space-y-4">
                    {userProjects.map((project: { _id: string; image: string; title: string; name: string; description: string; category: string; _createdAt: string; views: number }) => (
                      <div
                        key={project._id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {/* Project Image */}
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={project.image || "/placeholder-project.png"}
                            alt={project.title || project.name}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>

                        {/* Project Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/projects/${project._id}`}
                            className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-200 block truncate"
                          >
                            {project.title || project.name}
                          </Link>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {project.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(project._createdAt)}
                            </span>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Project Stats and Actions */}
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{project.views || 0}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Link
                              href={`/edit/${project._id}`}
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                            >
                              Edit
                            </Link>
                            <DeleteProjectButton projectId={project._id} projectName={project.name} />
                          </div>
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
                      No projects yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Get started by creating your first project
                    </p>
                    <Link
                      href="/create"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
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
}

export default DashboardPage;