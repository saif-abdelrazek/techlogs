"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

interface SignoutBtnProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  children?: React.ReactNode;
}

export default function SignoutBtn({
  className = "",
  variant = "default",
  size = "md",
  showIcon = true,
  children,
}: SignoutBtnProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoading(false);
    }
  };

  const variants = {
    default: "bg-red-600 hover:bg-red-700 text-white border-red-600",
    outline:
      "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-white",
    ghost:
      "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-lg font-medium transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {isLoading ? (
        <div
          className={`border-2 border-current border-t-transparent rounded-full animate-spin ${iconSizes[size]}`}
        />
      ) : (
        showIcon && (
          <svg
            className={iconSizes[size]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        )
      )}
      {children || (isLoading ? "Signing out..." : "Sign out")}
    </button>
  );
}