import db from "../prisma";
import { verifyPassword, hashPassword } from "./password";
import { createUserSchema, signUpSchema } from "@/lib/zod";
import { UserResponse } from "@/types/userTypes";

export const getUserFromDb = async (
  email: string,
  password: string
): Promise<UserResponse> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.password) {
      throw new Error("User does not have a password set");
    }

    const isPasswordValid = user
      ? await verifyPassword(password, user.password)
      : false;

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // This changes the name of the password const since there is another one in the function scope
    const { password: userPassword, ...userWithoutPW } = user;

    return {
      success: true,
      message: "User fetched successfully",
      user: userWithoutPW,
    };
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return { success: false, message: "Failed to fetch user" };
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<UserResponse> => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const { error } = createUserSchema.safeParse({
      name,
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      throw new Error("Failed to create user");
    }

    // This changes the name of the password const since there is another one in the function scope
    const { password: userPassword, ...userWithoutPw } = user;

    return {
      success: true,
      message: "User created successfully",
      user: userWithoutPw,
    };
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message:
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : "Failed to create user",
      user: null,
    };
  }
};
