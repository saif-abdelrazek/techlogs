import { useActionState } from "react";
import { signUpAction } from "@/actions/signup";

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export function SignUp() {
  const [state, formAction] = useActionState(signUpAction, initialState);

  return (
    <>
      {/* Error Display */}
      {state.message && !state.success && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{state.message}</p>
        </div>
      )}

      {/* Success Display */}
      {state.message && state.success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{state.message}</p>
        </div>
      )}

      <form action={formAction} className="w-full space-y-4">
        {/* Your existing form fields */}
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
            {state.errors?.firstName && (
              <p className="text-red-500 text-xs">{state.errors.firstName}</p>
            )}
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
            {state.errors?.lastName && (
              <p className="text-red-500 text-xs">{state.errors.lastName}</p>
            )}
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
          {state.errors?.email && (
            <p className="text-red-500 text-xs">{state.errors.email}</p>
          )}
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
          {state.errors?.password && (
            <p className="text-red-500 text-xs">{state.errors.password}</p>
          )}
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
          {state.errors?.confirmPassword && (
            <p className="text-red-500 text-xs">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>

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
          {state.errors?.agreeToTerms && (
            <p className="text-red-500 text-xs">{state.errors.agreeToTerms}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary-blue hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
        >
          Create Account
        </button>
      </form>
    </>
  );
}
