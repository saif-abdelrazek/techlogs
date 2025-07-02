// actions/signup.ts
"use server";

import { signUp } from "@/lib/utils/signup";
import { signUpSchema } from "@/lib/zod";
import { redirect } from "next/navigation";

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function signUpAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Convert FormData to object
    const formDataObject = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      agreeToTerms: formData.get("agreeToTerms") === "on",
    };

    // Validate with Zod
    const validatedData = signUpSchema.safeParse(formDataObject);

    if (!validatedData.success) {
      const errors: Record<string, string> = {};
      validatedData.error.errors.forEach((error) => {
        if (error.path[0]) {
          errors[error.path[0] as string] = error.message;
        }
      });

      return {
        success: false,
        message: "Please fix the errors below",
        errors,
      };
    }

    const { firstName, lastName, email, password, confirmPassword } =
      validatedData.data;

    await signUp(firstName, lastName, email, password, confirmPassword);

    // Redirect on success
    redirect("/signin");
  } catch (error: any) {
    console.error("Error during sign-up:", error);
    return {
      success: false,
      message: error.message || "Failed to create account. Please try again.",
    };
  }
}
