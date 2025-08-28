"use server";

import { auth } from "@/lib/auth";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "@/lib/utils/parseServerActionResponse";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";


export const createPitch = async (
  prevState: any, 
  formData: FormData, 
  pitch: string,
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  try {
    // Get form fields directly from formData
    const formDataObject = {
      name: String(formData.get("name") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      category: String(formData.get("category") || "").trim(),
      image: String(formData.get("image") || "").trim(),
      link: String(formData.get("link") || "").trim(),
      repository: formData.get("repository") ? String(formData.get("repository")).trim() : "",
    };

    const { name, description, category, image, link, repository } = formDataObject;

    // Validate required fields
    if (!name || !description || !category || !image || !link) {
      console.error("Missing required fields:", { name, description, category, image, link });
      return parseServerActionResponse({
        error: "All required fields must be filled",
        status: "ERROR",
      });
    }

    console.log("Creating project with data:", { name, description, category, image, link, repository });

    // Create safe slug
    const slug = slugify(name, { 
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
      name: name,
      description: description,
      category: category,
      image: image,
      link: link,
      repository: repository || "",
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