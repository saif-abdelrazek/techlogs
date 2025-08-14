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
import markdownit from 'markdown-it'

const md = markdownit()

export const experimental_ppr = true;

const Page = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;

  const [project, 
    // { select: editorPosts }
  ]   = await Promise.all([
    client.fetch(PROJECT_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_ID_QUERY, { id: "editor-picks-new" }),
  ]);

  if (!project) return notFound();

  const parsedContent = md.render(project?.pitch ? project?.pitch : "");

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
            <Link
              href={`/user/${project.author?.id}`}
              className="flex gap-3 items-center mb-3"
            >
              <Image
                src={project.author?.image || "/logo-icon.svg"}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg border-2 border-blue-200 dark:border-sky-800"
              />

            </Link>
            <span className="inline-block bg-blue-100 text-blue-700 dark:bg-sky-900 dark:text-sky-200 px-4 py-2 rounded-full text-xs font-semibold shadow">
              {project.category}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-blue-900 dark:text-sky-100 mt-8 mb-2">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose prose-blue dark:prose-invert max-w-4xl font-sans break-words text-blue-900 dark:text-sky-100"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No details provided</p>
          )}
        </div>

        <hr className="my-12 border-blue-200 dark:border-sky-800" />

        {/* {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl font-bold text-blue-900 dark:text-sky-100 mb-4">Editor Picks</p>
            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {editorPosts.map((post: ProjectCardType, i: number) => (
                <ProjectCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )} */}

        <Suspense fallback={<Skeleton className="w-full h-10 my-8" />}>
          <View id={project.id} />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;