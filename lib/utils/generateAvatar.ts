type User = { name?: string; image?: string };

export function handleAvatarImage(user?: User) {
  if (!user?.image) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Author")}&background=random&color=fff`;
  }
  return user.image;

}
