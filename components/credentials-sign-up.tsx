import { createUser } from "@/utils/db";
import { signUpSchema } from "@/lib/zod";
import { isValid } from "zod";
import { UserResponse } from "@/types/userTypes";
import { signUp } from "@/utils/signup";

export function SignUp() {
  return (
    <form
      action={async (formData): Promise<void> => {
        "use server";
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

          const { firstName, lastName, email, password, confirmPassword } =
            formDataObject;

          await signUp(firstName, lastName, email, password, confirmPassword);
        } catch (error: any) {
          console.error("Error during sign-up:", error);
        }
      }}
      className="w-full space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none"
            placeholder="John"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none"
          placeholder="Create a strong password"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Must be at least 8 characters long
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 outline-none"
          placeholder="Confirm your password"
        />
      </div>

      {/* Terms and Privacy Checkbox */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          name="agreeToTerms"
          required
          className="mt-1 w-4 h-4 text-primary-blue bg-gray-100 border-gray-300 rounded focus:ring-primary-blue focus:ring-2"
        />
        <label className="text-sm text-gray-600 dark:text-gray-400">
          I agree to the{" "}
          <a
            href="/terms"
            className="text-primary-blue hover:text-blue-700 transition-colors duration-200"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-primary-blue hover:text-blue-700 transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-primary-blue hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
      >
        Create Account
      </button>
    </form>
  );
}
