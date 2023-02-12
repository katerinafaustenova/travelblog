const regExpAfterConjunction = /\s([aiknosuvzAIKNOSUVZ])\s/gm;
const regExpDoubleNbsp = /(\u00A0)([aiknosuvzAIKNOSUVZ])\s/gm;
const regExpBefore = /\s(%|Kč|€|IDR|PHP|£|\$)([\s.,<&])/gm;

// https://caniuse.com/js-regexp-lookbehind
// https://stackoverflow.com/questions/58460501/js-regex-lookbehind-not-working-in-firefox-and-safari
// https://stackoverflow.com/questions/51568821/works-in-chrome-but-breaks-in-safari-invalid-regular-expression-invalid-group
// const regExpNumbers = /(?<=\d)\s(?=\d)(?=([^<>]*?<))/gm; // only text between HTML tags

export const processNbspAfterConjunction = (content: string): string => {
  return content.replace(regExpAfterConjunction, (match, p1) => ` ${p1}\u00A0`);
};

export const processDoubleNbsp = (content: string): string => {
  return content.replace(
    regExpDoubleNbsp,
    (match, p1, p2) => `\u00A0${p2}\u00A0`
  );
};

export const processNbspBefore = (content: string): string => {
  return content.replace(regExpBefore, (match, p1, p2) => `\u00A0${p1}${p2}`);
};
/*

export const processNbspInAndAfterNumbers = (content: string): string => {
  // HP =  helperTag
  // is necessary for replacing white spaces in text without HTML tags or after HTMl tags
  return `<HP>${content}</HP>`.replace(regExpNumbers, '\u00A0').replace(/<\/?HP>/g, '');
};
*/

export const processNbsp = (content?: string): string | undefined => {
  if (!content) {
    return undefined;
  }
  let processedContent = content.replace(/&nbsp;/gm, "\u00A0");
  processedContent = processNbspAfterConjunction(processedContent);
  processedContent = processDoubleNbsp(processedContent);
  processedContent = processNbspBefore(processedContent);
  // processedContent = processNbspInAndAfterNumbers(processedContent);
  return processedContent;
};
