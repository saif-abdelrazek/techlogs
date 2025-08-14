
import type { User } from "@prisma/client";

export interface UserResponse {
  success: boolean;
  message: string;
  user?: Omit<User, "password"> | null;
}
