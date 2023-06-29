export const getTodayDate = () => {
  try {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Format the day, month, and year with leading zeros if needed
    const currentDate = `${day.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year}`;
    return currentDate;
  } catch (error) {
    console.log(error);
  }
};
