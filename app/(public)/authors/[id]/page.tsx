import { auth } from "@/lib/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY, PROJECTS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";
import { ProjectCardType } from "@/types/projectTypes";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  const userProjects = await client.fetch(PROJECTS_BY_AUTHOR_QUERY, { id });

  const totalViews = userProjects?.reduce((total: number, project: { views: number }) => total + (project.views || 0), 0) || 0;
  const isOwnProfile = session?.user?.id === id;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-blue transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
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
                    src={user.image || "/logo-icon.svg"}
                    alt={user.name || "User Avatar"}
                    fill
                    className="rounded-full object-cover border-4 border-primary-blue/20"
                  />
                </div>

                {/* User Details */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.name || "Anonymous User"}
                </h2>
                
                {user.email && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {user.email}
                  </p>
                )}

                {user.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {user.bio}
                  </p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-blue">
                      {userProjects?.length || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Projects
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {totalViews}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Total Views
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="space-y-2">
                  {/* Action Buttons - Only show for own profile */}
                  {isOwnProfile && (
                    <>
                      <Link
                        href="/create"
                        className="w-full bg-primary-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                      >
                        Create Project
                      </Link>
                      <Link
                        href="/dashboard"
                        className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                      >
                        Dashboard
                      </Link>
                    </>
                  )}

                  {/* Visitor Actions */}
                  {!isOwnProfile && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 py-2 text-center">
                      Viewing {user.name}&apos;s profile
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - User Projects */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isOwnProfile ? "My Profile" : `${user.name}&apos;s Profile`}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isOwnProfile ? "Manage your projects and track their performance" : `View all projects by ${user.name}`}
              </p>
            </div>

            {/* Projects Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isOwnProfile ? "My Projects" : `${user.name}'s Projects`}
                  </h2>
                  {isOwnProfile && (
                    <Link
                      href="/create"
                      className="bg-primary-blue hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      + New Project
                    </Link>
                  )}
                </div>
              </div>

              <div className="p-6">
                {userProjects && userProjects.length > 0 ? (
                  <div className="space-y-4">
                    {userProjects.map((project: ProjectCardType) => (
                      <div
                        key={project._id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {/* Project Image */}
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={project.image || "/placeholder-project.png"}
                            alt={project.name || "Project"}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>

                        {/* Project Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/projects/${project.slug?.current || project._id}`}
                            className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-blue transition-colors duration-200 block truncate"
                          >
                            {project.name}
                          </Link>
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
                          </div>
                        </div>

                        {/* Project Stats & Actions */}
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{project.views || 0}</span>
                          </div>

                          {/* External Links */}
                          <div className="flex items-center space-x-2">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-blue hover:text-blue-700 transition-colors duration-200"
                              title="Live Demo"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                            {project.repository && (
                              <a
                                href={project.repository}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                                title="View Code"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            )}
                          </div>

                          {/* Edit Link - Only for own profile */}
                          {isOwnProfile && (
                            <Link
                              href={`/projects/${project._id}/edit`}
                              className="text-primary-blue hover:text-blue-700 transition-colors duration-200"
                            >
                              Edit
                            </Link>
                          )}
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
                      {isOwnProfile ? "No projects yet" : "No projects published"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {isOwnProfile ? 
                        "Get started by creating your first project" : 
                        `${user.name} hasn't published any projects yet`
                      }
                    </p>
                    {isOwnProfile && (
                      <Link
                        href="/create"
                        className="inline-block bg-primary-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Create Your First Project
                      </Link>
                    )}
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

// ProjectsSkeleton component removed as it's not used

export default Page;