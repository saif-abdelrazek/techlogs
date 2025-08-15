import ProjectForm from "@/components/ProjectForm";
import { auth } from "@/lib/auth";
import { client } from "@/sanity/lib/client";
import { PROJECT_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import DeleteProjectButton from "@/components/DeleteProjectButton";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Fetch the project
  const project = await client.fetch(PROJECT_BY_ID_QUERY, { id });
  
  if (!project) {
    notFound();
  }

  // Check if user owns this project - FIXED: Use _id instead of id
  if (project.author._id !== session.user.id) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You can only edit your own projects.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
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
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {session.user.email}
                </p>

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
                    href={`/projects/${project.slug?.current || project._id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                  >
                    View Project
                  </Link>
                </div>

                {/* Edit Tips */}
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">
                    ✏️ Edit Tips
                  </h3>
                  <ul className="text-xs text-red-700 dark:text-red-300 space-y-1 text-left">
                    <li>• Update project information</li>
                    <li>• Keep descriptions current</li>
                    <li>• Update demo links if changed</li>
                    <li>• Add new features or updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Edit Form */}
          <div className="lg:col-span-3">
            {/* Header Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
                <p className="text-blue-100">
                  Update your project information and keep it fresh for the community
                </p>
                <div className="mt-4 flex items-center space-x-2 text-sm">
                  <span className="bg-white/20 px-2 py-1 rounded-full">
                    {project.name}
                  </span>
                  <span className="text-blue-200">•</span>
                  <span>Created {new Date(project._createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Project Details
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Update the information below to modify your project
                    </p>
                  </div>
                  
                  {/* Delete Button */}
                  <DeleteProjectButton projectId={project._id} projectName={project.name} />
                </div>
              </div>

              <div className="p-6">
                <ProjectForm initialData={project} isEditing={true} />
              </div>
            </div>

            {/* Current Project Preview */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Current Project Preview
              </h3>
              <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {project.image && (
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {project.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span>Views: {project.views || 0}</span>
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