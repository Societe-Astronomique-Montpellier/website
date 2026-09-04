export const useIconColorName = (iconName: string): string | undefined => {
  if (iconName === "light") return "material-symbols-light:sunny";
  if (iconName === "dark") return "material-symbols-light:dark-mode";
};
