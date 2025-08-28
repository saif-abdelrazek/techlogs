
"use server";

import { auth } from "@/lib/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "@/lib/utils/parseServerActionResponse";
import { client } from "@/sanity/lib/client";
import { PROJECT_BY_ID_QUERY } from "@/sanity/lib/queries";
import { newProjectSchema } from "@/lib/zod";

export const updateProject = async (
  prevState: any, 
  formData: FormData, 
  pitch: string, 
  _id: string | undefined, 
  projectId: string
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  try {
    // Check if project exists and user owns it
    const existingProject = await client.fetch(PROJECT_BY_ID_QUERY, { id: projectId });
    
    if (!existingProject) {
      return parseServerActionResponse({
        error: "Project not found",
        status: "ERROR",
      });
    }

    if (existingProject.author.id !== session.user?.id) {
      return parseServerActionResponse({
        error: "You can only update your own projects",
        status: "ERROR",
      });
    }

    // Get form fields directly from formData
    const formDataObject = {
      name: String(formData.get("name") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      category: String(formData.get("category") || "").trim(),
      image: String(formData.get("image") || "").trim(),
      link: String(formData.get("link") || "").trim(),
      repository: formData.get("repository") ? String(formData.get("repository")).trim() : "",
      pitch: pitch && pitch.trim() ? pitch.trim() : undefined,
    };

    // Validate the form data
    await newProjectSchema.parseAsync(formDataObject);

    const { name, description, category, image, link, repository } = formDataObject;

    console.log("Updating project with data:", { name, description, category, image, link, repository });

    const projectUpdate = {
      name,
      description,
      category,
      image,
      link,
      repository: repository || "",
      ...(pitch && pitch.trim() && { pitch: pitch.trim() }),
    };

    // Update the project in Sanity
    const result = await writeClient
      .patch(projectId)
      .set(projectUpdate)
      .commit();

    console.log("Project updated successfully:", result);

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });

  } catch (error: any) {
    console.error("Error updating project:", error);
    
    return parseServerActionResponse({
      status: "ERROR",
      error: error.message || "Failed to update project",
    });
  }
};