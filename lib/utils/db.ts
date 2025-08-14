
/* eslint-disable @typescript-eslint/no-unused-vars */

import {prisma} from "../prisma";
import { verifyPassword} from "./password";
import { UserResponse } from "@/types/userTypes";

export const getUserFromDb = async (
  email: string,
  password: string
): Promise<UserResponse> => {
  "use server";
  try {
    const user = await prisma.user.findUnique({
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
    return { success: false, message: "Failed to fetch user" };
  }
};

export const getAccountFromDb = async (
  userId: string,
): Promise<UserResponse> => {
  "use server";
  try {
    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    return {
      success: true,
      message: "Account fetched successfully",
      user: account,
    };
  } catch (error) {
    return { success: false, message: "Failed to fetch account" };
  }
};
