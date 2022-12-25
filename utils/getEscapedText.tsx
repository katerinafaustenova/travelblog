export const getEscapedText = (text: string, escapedChar: string) => {
  if (!text) return null;
  return text.replaceAll(escapedChar, " ");
};
