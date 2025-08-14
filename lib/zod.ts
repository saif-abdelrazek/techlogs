import { object, string } from "zod";

export const newProjectSchema = object({
  title: string().min(3).max(100),
  description: string().min(20).max(500),
  category: string().min(3).max(20),
  image: string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),
  link: string().url(),
  repository: string().url().optional(),
  pitch: string().min(10),
});
