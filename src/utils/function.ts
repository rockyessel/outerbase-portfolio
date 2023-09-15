export const AbbrevNumber = (value: number): string => {
  if (value < 1000) {
    return value.toString();
  } else {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + value).length / 3);
    const shortValue = parseFloat(
      (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(
        2
      )
    );
    let f: String = '';
    if (shortValue % 1 != 0) {
      f = shortValue.toFixed(1);
    }
    return f + suffixes[suffixNum];
  }
};

export const createSlug = (input: string): string => {
  const slug = input
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-zA-Z0-9-]/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
    .toLowerCase(); // Convert to lowercase

  return slug;
};

export const escapeDoubleQuotes = (jsonData: string): string => {
  console.log('jsonData: ', jsonData);
  // Use regular expressions to replace double quotes with escaped double quotes
  const re = jsonData.replace(/"/g, '\\"');

  console.log('Changed: ', re);

  return re;
};
