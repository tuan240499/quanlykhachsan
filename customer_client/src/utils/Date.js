// const DAY_IN_WEEK = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const convertDate = (number) => (number < 10 ? "0" + number : number);

export const formatDate = (date, symbol = "-") => {
  const d = new Date(date);
  return (
    convertDate(d.getDate()) +
    symbol +
    convertDate(d.getMonth() + 1) +
    symbol +
    d.getFullYear()
  );
};

export const formatDateWithHour = (date) => {
  const d = new Date(date);
  return (
    convertDate(d.getDate()) +
    "/" +
    convertDate(d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    " " +
    convertDate(d.getHours()) +
    ":" +
    convertDate(d.getMinutes())
  );
};

export const addMonth = (originalDate, numberOfMonths) => {
  const newDate = new Date(originalDate);
  newDate.setMonth(newDate.getMonth() + numberOfMonths);
  return newDate;
};
export const getDiffDays = (begin, end) => Math.floor((end - begin) / 86400000); // 1000ms * 60s * 60m * 24h

export const getDiffMonths = (begin, end) =>
  end.getMonth() +
  12 * end.getFullYear() -
  (begin.getMonth() + 12 * begin.getFullYear());
export const getDiffYears = (begin, end) =>
  end.getFullYear() - begin.getFullYear();
