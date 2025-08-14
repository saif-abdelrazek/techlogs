import React from "react";
import MostViewedProjectCard from "./MostViewedProjectCard";
import {client} from "@/sanity/lib/client";
import { ProjectCardType } from "@/types/projectTypes";

import { MOST_VIEWED_PROJECTS_QUERY } from "@/sanity/lib/queries";

const MostViewedProjects = async () => {

  const projects = await client.fetch(MOST_VIEWED_PROJECTS_QUERY) as ProjectCardType[];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
      {projects.map((projectData, index) => (
        <MostViewedProjectCard
          key={projectData._id}
          project={projectData}
          index={index}
        />
      ))}
    </div>
  );
}

export default MostViewedProjects;