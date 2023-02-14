export const getEscapedText = (text: string, escapedChar: string) => {
  return text.replaceAll(escapedChar, " ");
};
