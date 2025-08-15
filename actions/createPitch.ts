"use server";

import { auth } from "@/lib/auth";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "@/lib/utils/parseServerActionResponse";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";

export const createPitch = async (
form: FormData, formDataFromForm: FormData, pitch: string,
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  try {
    // Get form fields
    const formData = Object.fromEntries(
      Array.from(form).filter(([key]) => key !== "pitch")
    );
    
    const { name, description, category, image, link, repository } = formData;

    // Create safe slug
    const slug = slugify(name as string, { 
      lower: true, 
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });

    // Find or create author
    let author = await client.fetch(AUTHOR_BY_ID_QUERY, {
      id: session.user?.id,
    });

    if (!author) {
      author = await writeClient.create({
        _type: "author",
        id: session.user?.id,
        name: session.user?.name || "Anonymous User",
        email: session.user?.email || "",
        username: session.user?.email?.split('@')[0] || "",
        image: session.user?.image || "",
        bio: "",
      });
    }

    // Create project
    const project = {
      _type: "project",
      name: String(name).trim(),
      description: String(description).trim(),
      category: String(category).trim(),
      image: String(image).trim(),
      link: String(link).trim(),
      repository: repository ? String(repository).trim() : "",
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: author._id,
      },
      pitch: pitch && pitch.trim() ? pitch.trim() : undefined, 
      views: 0,
    };


    const result = await writeClient.create(project);

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating project:", error);
    
    return parseServerActionResponse({
      error: `Failed to create project: ${error.message}`,
      status: "ERROR",
    });
  }
};