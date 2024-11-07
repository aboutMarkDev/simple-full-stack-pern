// This function removes the first word from an error message and returns the modified message.
export const errorHandler = (message: string): string => {
  // Split the message into an array of words
  const strToArr = message.split(" ");

  // Destructure to separate the first word from the rest
  const [, ...remainingWords] = strToArr;

  // Join the remaining words back into a single string and return
  return remainingWords.join(" ");
};
