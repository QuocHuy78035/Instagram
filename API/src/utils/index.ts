export const formatString = (str: string) => {
  const formatStr = str
    .split("")
    .filter((c) => c !== '"')
    .join("");
  return formatStr[0].toUpperCase() + formatStr.slice(1);
};
