"use server";

import { auth } from "@/lib/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { parseServerActionResponse } from "@/lib/utils/parseServerActionResponse";
import { PROJECT_BY_ID_QUERY } from "@/sanity/lib/queries";
import { redirect } from "next/navigation";

export const deleteProject = async (projectId: string) => {
  const session = await auth();

  if (!session?.user) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  try {
    // Fetch the project to verify ownership
    const project = await client.fetch(PROJECT_BY_ID_QUERY, { id: projectId });

    if (!project) {
      return parseServerActionResponse({
        error: "Project not found",
        status: "ERROR",
      });
    }

    // Check if user owns the project
    if (project.author.id !== session.user.id) {
      return parseServerActionResponse({
        error: "Forbidden: You can only delete your own projects",
        status: "ERROR",
      });
    }

    // Delete the project using Sanity write client
    await writeClient.delete(projectId);

    return parseServerActionResponse({
      message: "Project deleted successfully",
      status: "SUCCESS",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    console.error("Error deleting project:", error);
    
    return parseServerActionResponse({
      error: `Failed to delete project: ${error.message}`,
      status: "ERROR",
    });
  }
};

export const deleteProjectAndRedirect = async (projectId: string) => {
  const result = await deleteProject(projectId);
  
  if (result.status === "SUCCESS") {
    redirect("/dashboard");
  }
  
  return result;
};