export const getUserFromDb = async (
  email: string,
  pwHash: string
): Promise<any> => {
  // This function should interact with your database to fetch user data.
  // For example, using Prisma or any other ORM.
  // Here is a placeholder implementation:

  const user = "testUser"; // Replace with actual database call

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
