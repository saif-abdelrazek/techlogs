export type ProjectType = {
  id: string;
  title: string;
  description: string;
  category: string;
  views: number;
  likes: number;
  image: string;
  readTime: string;
  author: string;
  date: string;
};

export type ProjectComponentProps = {
  key: string;
  project: ProjectType;
};
