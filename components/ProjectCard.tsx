import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/formatDate";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvatarFallback } from "@/lib/utils/generateAvatar";
import { ProjectType } from "@/types/projectTypes";

const ProjectCard = ({ post }: { post: ProjectType }) => {
  const {
    _id,
    id,
    _createdAt,
    views,
    author,
    name,
    category,
    image,
    description,
  } = post;

  return (
    <li
      key={_id}
      className={cn(
        "flex flex-col bg-white dark:bg-[#1e293b] border border-blue-200 dark:border-sky-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
      )}
    >
      <Link href={`/projects/${id}`} className="block">
        <div className="relative aspect-[4/3] bg-blue-100 dark:bg-sky-900 overflow-hidden transition-transform duration-300 group-hover:scale-105">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
            draggable={false}
          />
        </div>
      </Link>
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/user/${author?.id}`}>
              {author?.image ? (
                <Image
                  src={author.image}
                  alt={author.name || "Author Avatar"}
                  width={36}
                  height={36}
                  className="rounded-full border border-blue-200 dark:border-sky-800 object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-blue-200 dark:bg-sky-800 flex items-center justify-center">
                  <span className="text-base font-medium text-blue-700 dark:text-sky-200">
                    {getAvatarFallback(author?.name)}
                  </span>
                </div>
              )}
            </Link>
            <div className="flex flex-col text-start">
              <span className="left-0 block text-sm font-semibold text-blue-700 dark:text-sky-200">Author</span>
              <Link href={`/user/${author?.id}`}>
              <span className="text-sm text-blue-900 dark:text-sky-100">{author?.name}</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <EyeIcon className="w-5 h-5 text-blue-500 dark:text-sky-400" />
            <span className="text-sm text-blue-700 dark:text-sky-200">{views ? views : 0}</span>
          </div>
        </div>
        <Link href={`/projects/${id}`}>
          <h3 className="font-bold text-lg text-blue-900 dark:text-sky-100 mb-1 line-clamp-1">{name}</h3>
        </Link>
        <p className="text-sm text-blue-800 dark:text-sky-200 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="inline-block bg-blue-100 text-blue-700 dark:bg-sky-900 dark:text-sky-200 px-3 py-1 rounded-full text-xs font-medium">
            {category ? category : "Uncategorized"}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(_createdAt ? _createdAt : new Date().toISOString())}
          </span>
        </div>
        <Button
          className="rounded-full bg-blue-700 hover:bg-blue-800 dark:bg-sky-700 dark:hover:bg-sky-600 font-medium text-[15px] text-white px-4 py-2 border-none transition mt-3"
          asChild
        >
          <Link href={`/projects/${id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const ProjectCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="w-full h-80 rounded-2xl bg-gray-200 dark:bg-gray-700 mb-4" />
      </li>
    ))}
  </>
);

export default ProjectCard;