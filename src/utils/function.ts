export const getDecadeRange = (date: Date) => {
  const year = date.getFullYear();
  const startYear = Math.floor(year / 10) * 10; // Find the start of the decade
  const endYear = startYear + 9; // End of the decade
  return [startYear, endYear];
};
