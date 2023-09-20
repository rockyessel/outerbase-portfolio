import { CommentProps } from '@/interface';
import { OutputData } from '@editorjs/editorjs';

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
    .replace(/[^a-zA-Z0-9-]/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
    .toLowerCase() // Convert to lowercase
    .trim(); // Remove leading and trailing spaces

  return slug;
};

export const escapeDoubleQuotes = (jsonData: string): string => {
  console.log('jsonData: ', jsonData);
  // Use regular expressions to replace double quotes with escaped double quotes
  const re = jsonData.replace(/"/g, '\\"');

  console.log('Changed: ', re);

  return re;
};

export const getTextFromEditorContent = (
  editorContent: OutputData | undefined
) => {
  let plainText = '';

  if (editorContent && editorContent.blocks) {
    editorContent.blocks.forEach((block) => {
      if (block.type === 'paragraph') {
        // Replace HTML entities and strip HTML tags
        const text = block.data.text.replace(/<[^>]*>?/gm, '');
        const decodedText = decodeHtmlEntities(text);

        // Append the decoded text to the plainText string
        plainText += decodedText + '\n';
      } else if (block.type === 'header') {
        // Replace HTML entities and strip HTML tags for headers
        const text = block.data.text.replace(/<[^>]*>?/gm, '');
        const decodedText = decodeHtmlEntities(text);

        // Append the decoded text to the plainText string
        plainText += decodedText + '\n';
      }
      // Add more conditions for other block types if needed
    });
  }

  return plainText.trim(); // Remove leading/trailing whitespace
};

// Helper function to decode HTML entities
const decodeHtmlEntities = (text: string) => {
  const element = document.createElement('div');
  element.innerHTML = text;
  return element.textContent || '';
};

const shuffleString = (input: string): string => {
  const shuffleRatio = Math.random() * 0.8;
  let characters = input.split('');
  characters = characters.sort(() => Math.random() - shuffleRatio);
  return characters.join('');
};

export const IdGen = (type: string): string => {
  // Shuffling the characters to ensure randomness
  const characters = shuffleString(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  );

  // Determining the length of the random string
  const length = Math.floor(Math.random() * 6) + 5;

  // Array to track used characters
  const usedChars: string[] = [];

  // Building the random string character by character
  let result = '';
  for (let i = 0; i < length; i++) {
    let index: number;

    // Selecting a random character that has not been used before
    do {
      index = Math.floor(Math.random() * characters.length);
    } while (usedChars.includes(characters[index]));

    // Adding the selected character to the result string and tracking it as used
    result += characters[index];
    usedChars.push(characters[index]);
  }

  return `${type}_${result}`;
};

export const processComments = (
  comments: CommentProps[],
  level: number = 1
): CommentProps[] => {
  if (level > 2) {
    return []; // If the level exceeds 2, return an empty array
  }

  return comments
    .filter((comment) => comment.content !== null) // Remove null objects
    .map((comment) => ({
      ...comment,
      replies: processComments(comment.replies || [], level + 1), // Recursively process replies
    }));
};
