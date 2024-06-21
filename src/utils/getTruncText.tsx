const getTruncText = (text: string): string => {
  const para = text?.trim().slice(0, 110);

  return `${para} ...`;
};

export default getTruncText;
