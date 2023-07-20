export const getDateRangeByPeriod = (period) => {
  try {
    const today = new Date();
    let startDate;

    if (period === 'Last Week') {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      startDate = sevenDaysAgo;
    } else if (period === 'Last Quarter') {
      const threeMonthsAgo = new Date(today);
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      startDate = threeMonthsAgo;
    } else if (period === 'Last Year') {
      const oneYearAgo = new Date(today);
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      startDate = oneYearAgo;
    } else {
      // Handle invalid input (optional)
      startDate = 'Invalid Input';
    }

    return {
      enddate: today.toISOString().slice(0, 10),
      startdate: startDate.toISOString().slice(0, 10),
    };
  } catch (error) {
    console.log(error);
  }
};
