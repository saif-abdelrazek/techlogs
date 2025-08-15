import Image from "next/image";
import Link from "next/link";
import { Eye,User, Calendar } from "lucide-react";
import { ProjectCardType } from "@/types/projectTypes";

function MostViewedProjectCard({
  project,
  index,
}: {project: ProjectCardType, index: number }) {
  const { 
  _id,
  name,
  description,
  category,
  views,
  image,
  _createdAt: createdAt,
  author,
  } = project;
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num ? num.toString() : "0";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 flex flex-col">
      {/* Featured Badge */}
      {index === 0 && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-primary-blue to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
            🔥 Featured
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full aspect-[16/10] bg-blue-50 dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <Image
            src={image? image : "/placeholder.png"}
            alt={name || "Project Image"}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
          />
        </div>
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-primary-blue text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{formatNumber(views ? views : 0)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
          <div className="flex items-center space-x-2">
            <User className="w-3 h-3 text-primary-blue" />
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {author?.name}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Link Overlay */}
      <Link
        href={`/projects/${_id}`}
        className="absolute inset-0 z-10"
        aria-label={`Read more about ${name}`}
      />
    </article>
  );
}

export default MostViewedProjectCard;