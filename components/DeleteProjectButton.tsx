"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProject } from "@/actions/deleteProject";

interface DeleteProjectButtonProps {
  projectId: string;
  projectName: string;
  variant?: "text" | "button";
  className?: string;
  redirectAfterDelete?: boolean;
}

export const DeleteProjectButton = ({ 
  projectId, 
  projectName, 
  variant = "text",
  className = "",
  redirectAfterDelete = true
}: DeleteProjectButtonProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      setError(null);
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteProject(projectId);
        
        if (result.status === "ERROR") {
          setError(result.error);
          return;
        }

        // Success - redirect or refresh
        if (redirectAfterDelete) {
          router.push("/dashboard");
        } else {
          router.refresh();
        }
        
        setShowConfirm(false);
      } catch (error) {
        console.error("Error deleting project:", error);
        setError("Failed to delete project. Please try again.");
      }
    });
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setError(null);
  };

  if (variant === "button") {
    return (
      <div className={`relative ${className}`}>
        {!showConfirm ? (
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            <span>{isPending ? "Deleting..." : "Delete Project"}</span>
          </button>
        ) : (
          <div className="flex flex-col space-y-3 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <div>
              <p className="text-sm font-medium text-red-900 dark:text-red-100">
                Delete &quot;{projectName}&quot;?
              </p>
              <p className="text-xs text-red-700 dark:text-red-300">
                This action cannot be undone.
              </p>
            </div>
            
            {error && (
              <div className="text-xs text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-800/30 p-2 rounded">
                {error}
              </div>
            )}
            
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="text-xs bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-1 rounded transition-colors flex items-center space-x-1"
              >
                {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>{isPending ? "Deleting..." : "Confirm Delete"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Text variant (for inline use)
  return (
    <div className={`relative ${className}`}>
      {!showConfirm ? (
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors duration-200 disabled:opacity-50"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      ) : (
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-red-600 dark:text-red-400 font-medium">
            Sure?
          </span>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-2 py-1 rounded transition-colors flex items-center space-x-1"
          >
            {isPending && <Loader2 className="w-2 h-2 animate-spin" />}
            <span>{isPending ? "..." : "Yes"}</span>
          </button>
          <button
            onClick={handleCancel}
            disabled={isPending}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-colors disabled:opacity-50"
          >
            No
          </button>
        </div>
      )}
      
      {error && (
        <div className="absolute top-full left-0 mt-1 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded border border-red-200 dark:border-red-800 z-10 whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};

export default DeleteProjectButton;