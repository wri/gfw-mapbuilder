export const handleCustomColorTheme = (theme: string | null | undefined) => {
  if (!theme) return '#f0ab00';
  return theme;
};

export const setToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
