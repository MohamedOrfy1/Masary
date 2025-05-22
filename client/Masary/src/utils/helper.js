export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export const getInitials = (name) => {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length > 1) {
    return names[0][0] + names[1][0];
  }
  return names[0][0];
}

export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";
  if (isNaN(num)) return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const prepareExpensesBarChartData = (data) => {
  const chartData = data.map((item) => ({
    amount: item?.amount,
    category: item?.category,
  }))

  return chartData
}
