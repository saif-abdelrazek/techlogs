import React from "react";
import ProjectComponent from "@/components/ProjectComponent";
import { ProjectComponentProps } from "@/types/projectTypes";

function MostViewedProjects() {
  // logic for projects
  const projects: ProjectComponentProps[] = [
    {
      key: "1",
      project: {
        id: "1",
        title: "Project One",
        description: "Description for project one",
        category: "Category A",
        views: 100,
        likes: 10,
        image:
          "https://res.cloudinary.com/saifassets/image/upload/v1751232703/My%20Brand/saifdev-logo-dark_khrozz.png",
        readTime: "5 min",
        author: "Author One",
        date: "2023-01-01",
      },
    },
    {
      key: "2",
      project: {
        id: "2",
        title: "Project Two",
        description: "Description for project two",
        category: "Category B",
        views: 200,
        likes: 20,
        image:
          "https://res.cloudinary.com/saifassets/image/upload/My%20Brand/saifdev-logo-dark_khrozz.png",
        readTime: "10 min",
        author: "Author Two",
        date: "2023-02-01",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
      {projects.map((projectData, index) => (
        <ProjectComponent
          key={projectData.project.id}
          title={projectData.project.title}
          description={projectData.project.description}
          category={projectData.project.category}
          views={projectData.project.views}
          likes={projectData.project.likes}
          image={projectData.project.image}
          readTime={projectData.project.readTime}
          author={projectData.project.author}
          date={projectData.project.date}
          index={index}
        />
      ))}
    </div>
  );
}

export default MostViewedProjects;
