import React from "react";
import SearchForm from "@/components/SearchForm";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { ProjectCardType } from "@/types/projectTypes";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

const ProjectsPage = async ({
  searchParams,
}: {  searchParams: Promise<{ query?: string }>;}) => {
  const query = (await searchParams).query || "";
  const params= {search: query  || null}

    const { data : projects} = await sanityFetch({query: PROJECTS_QUERY, params})

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 py-5 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center pt-24 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-sky-100 mb-10">
        Projects
      </h1>
      <div className="w-full max-w-3xl">
        <SearchForm query={query} />
      </div>
      <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
        <p className="text-lg">
         {query? `Search results for: `: "All Projects"} <span className="font-semibold">{query}</span>
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project: ProjectCardType) => (
              <ProjectCard post={project} key={project._id} />
            ))
          ) : (
            <p className="col-span-full">No projects found.</p>
          )}
        </div>
      </div>
    </div>
    <SanityLive />
    </>
  );
}
export default ProjectsPage;