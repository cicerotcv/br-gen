export const saveToClipboard = (content: string) => {
  if (!navigator.clipboard) return;

  navigator.clipboard.writeText(content);
};
