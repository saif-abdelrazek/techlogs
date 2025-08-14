"use client";

import React, { useState, useActionState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { newProjectSchema } from "@/lib/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createPitch } from "@/actions/createPitch";

const ProjectForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Move ALL hooks to the top - before any conditional logic
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    link: "",
    repository: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");

  // Move useActionState hook to the top as well
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
      };

      console.log("Form values being validated:", formValues);

      setErrors({});

      await newProjectSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formDataFromForm, pitch);

if (result.status === "SUCCESS") {
  toast.success("Your project has been created successfully!");
  setFormData({
    name: "",
    description: "",
    category: "",
    image: "",
    link: "",
    repository: "",
  });
  setPitch("");
  router.push(`/projects/${result.id}`);
  return result;

      } else {
        toast.error(result.error || "Failed to create project");
        return result;
      }
    } catch (error) {
      console.log("Validation error:", error);
      
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        const errorMap: Record<string, string> = {};
        
        Object.entries(fieldErrors).forEach(([key, messages]) => {
          if (messages && messages.length > 0) {
            errorMap[key] = messages[0];
          }
        });
        
        console.log("Field errors:", errorMap);
        
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
  }, [status, router]);

  // Helper function
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-2 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
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

      <Button
        type="submit"
        className="w-full bg-primary-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating Project...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Create Project
          </>
        )}
      </Button>
    </form>
  );
};

export default ProjectForm;