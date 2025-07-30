export function getAvatarFallback(name?: string) {
  if (!name) return "A";
  const first = name.trim().split(" ")[0];
  return first[0]?.toUpperCase() || "A";
}
