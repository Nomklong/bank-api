export const convertDateTimeToAsiaBkk = (): Date => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  return currentDate;
};
