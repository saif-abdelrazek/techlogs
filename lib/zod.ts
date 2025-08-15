import { literal, object, string } from "zod";

export const newProjectSchema = object({
  name: string().min(3).max(100),
  description: string().min(20).max(500),
  category: string().min(3).max(20),
  image: string().url().refine(
    (url) => {
      // Simple image URL validation based on file extension
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      return imageExtensions.some(ext => url.toLowerCase().includes(ext));
    },
    { message: "URL must point to a valid image file" }
  ),
  link: string().url(),
  repository: string().url().optional().or(literal("")),
  pitch: string().optional(),
});
