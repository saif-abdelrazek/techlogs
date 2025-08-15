// Extend the global type to include isSpace
declare global {
  // eslint-disable-next-line no-var
  var isSpace: ((code: number) => boolean) | undefined;
}

// Solving the problem of global.isSpace not being defined in markdownit and next turbopack builds
if (typeof global !== "undefined" && typeof global.isSpace === "undefined") {
  global.isSpace = function(code: number) {
    return code === 0x20 || code === 0x09 || code === 0x0A || code === 0x0B || code === 0x0C || code === 0x0D;
  };
}

import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { PROJECT_BY_ID_QUERY, PLAYLIST_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { auth } from "@/lib/auth";
import markdownit from 'markdown-it'
import { Github } from "lucide-react";

// Configure markdown-it
const md = markdownit({
  html: true, 
  linkify: true, 
  typographer: true,
  breaks: true, 
})

export const experimental_ppr = true;

// FIXED: Correct TypeScript interface for Next.js 15
interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const session = await auth();

  const [project] = await Promise.all([
    client.fetch(PROJECT_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_ID_QUERY, { id: "editor-picks-new" }),
  ]);

  if (!project) return notFound();

  // Check if current user is the author - FIXED: Use _id instead of id
  const isAuthor = session?.user?.id === project.author?._id;

  // Properly render markdown content
  const renderedHTML = project?.pitch && project.pitch.trim() !== "" 
    ? md.render(project.pitch) 
    : null;

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155] transition-colors duration-300 pb-16">
      {/* Header Section */}
      <section className="w-full flex flex-col items-center justify-center bg-blue-50 dark:bg-[#1e293b] py-12 px-4 rounded-b-3xl shadow-md !min-h-[230px]">
        <p className="bg-blue-100 text-blue-900 dark:bg-sky-900 dark:text-sky-100 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow">
          {formatDate(project?._createdAt)}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-sky-100 mb-4 text-center drop-shadow">
          {project.name}
        </h1>
        <p className="text-lg md:text-xl text-blue-800 dark:text-sky-200 text-center max-w-3xl mb-2 font-medium">
          {project.description}
        </p>
      </section>

      {/* Main Content Section */}
      <section className="max-w-5xl mx-auto py-10 px-4 bg-white dark:bg-[#1e293b] rounded-3xl shadow-lg mt-10">
        {project.image && (
          <div className="w-full flex justify-center mb-8">
            <Image
              src={project.image}
              alt="Project thumbnail"
              width={900}
              height={400}
              className="w-full max-h-[400px] rounded-xl object-cover shadow"
              priority
            />
          </div>
        )}

        <div className="space-y-8 mt-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Author Section */}
            <div className="flex items-center justify-between w-full">
              <Link
                href={`/authors/${project.author?._id || project.author?.id}`}
                className="flex gap-3 items-center mb-3 hover:opacity-80 transition-opacity duration-200"
              >
                <Image
                  src={project.author?.image || "/logo-icon.svg"}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg border-2 border-blue-200 dark:border-sky-800"
                />
                <div>
                  <p className="text-lg font-semibold text-blue-900 dark:text-sky-100">
                    {project.author?.name}
                  </p>
                  <p className="text-sm text-blue-700 dark:text-sky-300">
                    Project Author
                  </p>
                </div>
              </Link>

              {/* Category Badge and Edit Button */}
              <div className="flex items-center space-x-3">
                <span className="inline-block bg-blue-100 text-blue-700 dark:bg-sky-900 dark:text-sky-200 px-4 py-2 rounded-full text-xs font-semibold shadow">
                  {project.category}
                </span>

                {/* Edit Button */}
                {isAuthor && (
                  <Link
                    href={`/edit/${project._id}`}
                    className="inline-flex items-center space-x-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium py-2 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    title="Edit this project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="hidden sm:inline">Edit</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Project Actions Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            {/* External Links */}
            <div className="flex items-center space-x-4">
              {/* Live Demo Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Live Demo</span>
                </a>
              )}

              {/* Repository Link */}
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </a>
              )}
            </div>

            {/* Admin Actions - Only for author */}
            {isAuthor && (
              <div className="flex items-center space-x-2">
                <Link
                  href={`/edit/${project._id}`}
                  className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Project</span>
                </Link>
              </div>
            )}
          </div>

          {/* Project Details/Pitch Section */}
          <div>
            <h3 className="text-2xl font-bold text-blue-900 dark:text-sky-100 mt-8 mb-4">
              Project Details
            </h3>
            
            {renderedHTML ? (
              <article
                className="prose prose-lg max-w-none dark:prose-invert
                  prose-headings:text-blue-900 dark:prose-headings:text-sky-100
                  prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-6
                  prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-3 prose-h2:mt-5  
                  prose-h3:text-xl prose-h3:font-medium prose-h3:mb-2 prose-h3:mt-4
                  prose-p:text-lg prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-blue-600 dark:prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-strong:text-blue-900 dark:prose-strong:text-sky-100 prose-strong:font-semibold
                  prose-em:italic prose-em:text-gray-600 dark:prose-em:text-gray-400
                  prose-code:text-sm prose-code:text-blue-800 dark:prose-code:text-sky-200 
                  prose-code:bg-blue-50 dark:prose-code:bg-sky-900/30 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono
                  prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:text-gray-100 
                  prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 dark:prose-blockquote:border-sky-500
                  prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-sky-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                  prose-blockquote:text-blue-800 dark:prose-blockquote:text-sky-200 prose-blockquote:italic prose-blockquote:font-medium
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ul:space-y-2
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-ol:space-y-2
                  prose-li:text-lg prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed
                  prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600 prose-table:rounded-lg prose-table:overflow-hidden
                  prose-thead:bg-gray-50 dark:prose-thead:bg-gray-700
                  prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 dark:prose-th:text-gray-100
                  prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:px-4 prose-td:py-3 prose-td:text-gray-700 dark:prose-td:text-gray-300
                  prose-hr:border-gray-300 dark:prose-hr:border-gray-600 prose-hr:my-8
                  prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto prose-img:max-w-full
                "
                dangerouslySetInnerHTML={{ __html: renderedHTML }} 
              />
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">No project details provided</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {isAuthor ? "Add some details about your project to help others understand what it does." : "The author hasn&apos;t added detailed information about this project yet."}
                </p>
                {isAuthor && (
                  <Link
                    href={`/edit/${project._id}`}
                    className="mt-3 inline-flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Add Project Details</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        <hr className="my-12 border-blue-200 dark:border-sky-800" />

        <Suspense fallback={<Skeleton className="w-full h-10 my-8" />}>
          <View id={project._id} />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;