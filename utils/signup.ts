import { UserResponse } from "@/types/userTypes";
import { createUser } from "@/utils/db";
import { signUpSchema } from "@/lib/zod";

export const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<void> => {
  try {
    const { error } = signUpSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    if (error) {
      throw new Error(error.message);
    }

    const name = `${firstName} ${lastName}`.trim();

    const user = await createUser(name, email, password);

    if (!user || !user.success) {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("Error signing up user:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to sign up user"
    );
  }
};
