export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.src = "/assets/user.png";
};

export const getUserAvatarSrc = (user: { avatar?: string | null } | null): string => {
  if (!user?.avatar || user.avatar === "null" || user.avatar.trim() === "") {
    return "/assets/user.png";
  }
  return user.avatar;
};

export const formatCartItemCount = (count: number): string => {
  return count > 99 ? "99+" : count.toString();
};
