import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/zod";
import { createUser } from "@/lib/utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedFields = signUpSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
          errors: validatedFields.error.errors,
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password } = validatedFields.data;
    const name = `${firstName} ${lastName}`.trim();

    const result = await createUser(name, email, password);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: result.user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
