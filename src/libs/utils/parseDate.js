export const parseAgoToDays = (dateStr) => {
  const value = parseInt(dateStr);

  if (dateStr.includes('day')) return value;
  if (dateStr.includes('week')) return value * 7;
  if (dateStr.includes('month')) return value * 30;

  return Infinity;
};