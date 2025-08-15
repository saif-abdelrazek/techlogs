
"use server";

import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "@/lib/utils/parseServerActionResponse";

export const updateProject = async (
form: FormData, formDataFromForm: FormData, pitch: string, _id: string | undefined, projectId: string) => {
  try {
    const formData = {
      name: form.get("name") as string,
      description: form.get("description") as string,
      category: form.get("category") as string,
      image: form.get("image") as string,
      link: form.get("link") as string,
      repository: form.get("repository") as string,
    };

    const project = {
      _type: "project",
      ...formData,
      ...(pitch && { pitch }),
    };

    // Update the project in Sanity
    const result = await writeClient
      .patch(projectId)
      .set(project)
      .commit();

    return parseServerActionResponse({
      status: "SUCCESS",
      id: projectId,
    });

  } catch (error) {
    console.error("Error updating project:", error);
    
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to update project",
    });
  }
};