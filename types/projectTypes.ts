import { Project, Author } from "@/sanity/types";

export type ProjectType = {
  _id: string;
  id: string;
  name: string;
  description: string;
  category: string;
  views: number;
  likes: number;
  image: string;
  readTime: string;
  author: {
    id: string;
    name: string;
    image?: string;
  };
  slug: string;
  pitch?: string;
  _createdAt?: string;
};

export type ProjectComponentProps = {
  key: string;
  project: ProjectType;
};

export type ProjectCardType = Omit<Project, "author"> & { author: Author };