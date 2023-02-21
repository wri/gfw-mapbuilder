export const handleCustomColorTheme = (theme: string | null | undefined) => {
  if (!theme) return '#f0ab00';
  return theme;
};
