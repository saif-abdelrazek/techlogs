"use server";

import { auth } from "@/lib/auth";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "@/lib/utils/parseServerActionResponse";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  // Get all form fields correctly
  const { name, description, category, image, link, repository } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(name as string, { lower: true, strict: true });

  try {
    let author = await client.fetch(AUTHOR_BY_ID_QUERY, {
      id: session.user.id,
    });


        if (!author) {
      author = await writeClient.create({
        _type: "author",
        id: session.user.id,
        name: session.user.name || "Anonymous User",
        email: session.user.email || "",
        image: session.user.image || "",
        bio: "",
      });
    }

    const project = {
      name,
      description,
      category,
      image,
      link, 
      repository: repository || "", 
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: author._id,
      },
      pitch: pitch || "",
        views: 0, // Initialize views
      };

    // Create project document
    const result = await writeClient.create({ _type: "project", ...project });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Error creating project:", error);
    
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};