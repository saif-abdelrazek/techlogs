import React from "react";
import MostViewedProjectCard from "./MostViewedProjectCard";
import {  ProjectType } from "@/types/projectTypes";
import {client} from "@/sanity/lib/client";

import { MOST_VIEWED_PROJECTS_QUERY } from "@/sanity/lib/queries";

const MostViewedProjects = async () => {

  const projects = await client.fetch(MOST_VIEWED_PROJECTS_QUERY) as ProjectType[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
      {projects.map((projectData, index) => (
        <MostViewedProjectCard
          key={projectData._id}
          title={projectData.name}
          description={projectData.description}
          category={projectData.category}
          views={projectData.views}
          likes={projectData.likes}
          image={projectData.image}
          readTime={projectData.readTime}
          author={projectData.author.name}
          createdAt={projectData._createdAt || new Date().toISOString()}
          index={index}
        />
      ))}
    </div>
  );
}

export default MostViewedProjects;