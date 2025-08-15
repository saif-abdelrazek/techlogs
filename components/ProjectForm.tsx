"use client";

import React, { useState, useActionState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send, Save } from "lucide-react";
import { newProjectSchema } from "@/lib/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createPitch } from "@/actions/createPitch";
import { updateProject } from "@/actions/updateProject";
import Image from "next/image";

interface ProjectFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
  isEditing?: boolean;
}

const ProjectForm = ({ initialData, isEditing = false }: ProjectFormProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    image: initialData?.image || "",
    link: initialData?.link || "",
    repository: initialData?.repository || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState(initialData?.pitch || "");

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        category: initialData.category || "",
        image: initialData.image || "",
        link: initialData.link || "",
        repository: initialData.repository || "",
      });
      setPitch(initialData.pitch || "");
    }
  }, [initialData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (prevState: any, formDataFromForm: FormData) => {
    try {
      const repositoryValue = formDataFromForm.get("repository") as string;
      
      const formValues = {
        name: formDataFromForm.get("name") as string,
        description: formDataFromForm.get("description") as string,
        category: formDataFromForm.get("category") as string,
        image: formDataFromForm.get("image") as string,
        link: formDataFromForm.get("link") as string,
        repository: repositoryValue.trim() === "" ? "" : repositoryValue,
        pitch: pitch.trim() === "" ? undefined : pitch,
        ...(isEditing && { _id: initialData?._id })
      };

      setErrors({});

      // Validate the form data
      await newProjectSchema.parseAsync(formValues);

      let result;
      
      if (isEditing) {
        // Update existing project
        result = await updateProject(prevState, formDataFromForm, pitch, initialData._id, initialData._id);
      } else {
        // Create new project
        result = await createPitch(prevState, formDataFromForm, pitch);
      }

      if (result.status === "SUCCESS") {
        toast.success(
          isEditing 
            ? "Your project has been updated successfully!" 
            : "Your project has been created successfully!"
        );
        
        if (!isEditing) {
          // Reset form only for new projects
          setFormData({
            name: "",
            description: "",
            category: "",
            image: "",
            link: "",
            repository: "",
          });
          setPitch("");
        }
        
        // Navigate to the project page
        const projectId = result.id || initialData?._id;
        router.push(`/projects/${projectId}`);
        return result;

      } else {
        toast.error(result.error || `Failed to ${isEditing ? 'update' : 'create'} project`);
        return result;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        const errorMap: Record<string, string> = {};
        
        Object.entries(fieldErrors).forEach(([key, messages]) => {
          if (messages && messages.length > 0) {
            errorMap[key] = messages[0];
          }
        });
        
        setErrors(errorMap);
        toast.error("Please check your inputs and try again");
        
        return { 
          ...prevState, 
          error: "Validation failed", 
          status: "ERROR",
          preserveFormData: true 
        };
      }

      toast.error("An unexpected error has occurred");
      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router]);

  // Helper function
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Cancel editing handler
  const handleCancel = () => {
    if (isEditing) {
      router.push(`/projects/${initialData?.slug?.current || initialData?._id}`);
    } else {
      router.push("/dashboard");
    }
  };

  // Reset form handler
  const handleReset = () => {
    if (isEditing && initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        category: initialData.category || "",
        image: initialData.image || "",
        link: initialData.link || "",
        repository: initialData.repository || "",
      });
      setPitch(initialData.pitch || "");
    } else {
      setFormData({
        name: "",
        description: "",
        category: "",
        image: "",
        link: "",
        repository: "",
      });
      setPitch("");
    }
    setErrors({});
    toast.success("Form reset successfully");
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-2 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Form Header */}
      {isEditing && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-amber-900 dark:text-amber-100">
                Editing Project: {initialData?.name}
              </h3>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                Make your changes below and click &quot;Update Project&quot; to save
                </p>
            </div>
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none"
            required
            placeholder="Enter your project name"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none resize-y"
            required
            placeholder="Briefly describe what your project does"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none"
            required
            placeholder="e.g., Web Development, Mobile App, AI/ML, Game Development"
          />
          {errors.category && (
            <p className="text-red-600 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Image URL
          </label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none"
            required
            placeholder="https://example.com/your-project-image.jpg"
          />
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
          
          {/* Image Preview */}
          {formData.image && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Preview:</p>
              <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                <Image
                  src={formData.image}
                  alt="Project preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Live Demo URL
          </label>
          <Input
            id="link"
            name="link"
            value={formData.link}
            onChange={(e) => handleInputChange("link", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none"
            required
            placeholder="https://your-project-demo.com"
          />
          {errors.link && <p className="text-red-600 text-sm mt-1">{errors.link}</p>}
        </div>

        <div>
          <label htmlFor="repository" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Repository URL <span className="text-gray-500">(optional)</span>
          </label>
          <Input
            id="repository"
            name="repository"
            value={formData.repository}
            onChange={(e) => handleInputChange("repository", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none"
            placeholder="https://github.com/username/project-name (optional)"
          />
          {errors.repository && (
            <p className="text-red-600 text-sm mt-1">{errors.repository}</p>
          )}
        </div>

        <div data-color-mode="light">
          <label htmlFor="pitch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Details <span className="text-gray-500">(optional)</span>
          </label>
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id="pitch"
            preview="edit"
            height={300}
            style={{ borderRadius: 12, overflow: "hidden" }}
            textareaProps={{
              placeholder:
                "Tell us more about your project - technologies used, challenges faced, future plans...",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          {errors.pitch && <p className="text-red-600 text-sm mt-1">{errors.pitch}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {/* Primary Action Button */}
          <Button
            type="submit"
            className="flex-1 bg-primary-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isEditing ? "Updating Project..." : "Creating Project..."}
              </>
            ) : (
              <>
                {isEditing ? <Save className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                {isEditing ? "Update Project" : "Create Project"}
              </>
            )}
          </Button>

          {/* Secondary Actions */}
          <div className="flex gap-3">
            {/* Reset Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
              disabled={isPending}
            >
              Reset
            </Button>

            {/* Cancel Button */}
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors duration-200"
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </div>

        {/* Form Status */}
        {state.error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{state.error}</p>
          </div>
        )}
      </form>

      {/* Tips Section */}
      {!isEditing && (
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Tips for a Great Project Submission
          </h3>
          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Use a descriptive and memorable project name</li>
            <li>• Write a clear, concise description that highlights key features</li>
            <li>• Choose an appropriate category for better discoverability</li>
            <li>• Use high-quality images (1200x630px recommended)</li>
            <li>• Ensure your live demo URL is working and accessible</li>
            <li>• Include a repository URL to showcase your code (GitHub, GitLab, etc.)</li>
            <li>• Use the project details section to explain technologies, challenges, and learnings</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectForm;