// Utility function to split any string format into words
export const splitIntoWords = (value: string): string[] => {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase -> camel Case
    .replace(/[_-]/g, ' ') // replace _ and - with spaces
    .split(/\s+/) // split by whitespace
    .filter(word => word.length > 0); // remove empty strings
};