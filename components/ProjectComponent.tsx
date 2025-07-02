"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Clock, User, Calendar, ArrowUpRight } from "lucide-react";

interface ProjectComponentProps {
  title: string;
  description: string;
  category: string;
  views: number;
  likes: number;
  image: string;
  readTime: string;
  author: string;
  date: string;
  index: number;
}

function ProjectComponent({
  title,
  description,
  category,
  views,
  likes,
  image,
  readTime,
  author,
  date,
  index,
}: ProjectComponentProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
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
    <article className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
      {/* Featured Badge */}
      {index === 0 && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-primary-blue to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
            🔥 Featured
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-primary-blue text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{formatNumber(views)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-3 h-3" />
            <span>{formatNumber(likes)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <User className="w-3 h-3 text-primary-blue" />
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {author}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </div>

      {/* Link Overlay */}
      <Link
        href={`/Projects/${index + 1}`}
        className="absolute inset-0 z-10"
        aria-label={`Read more about ${title}`}
      />
    </article>
  );
}

export default ProjectComponent;
