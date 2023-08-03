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

export const formatDateWithHour = (date, symbol = "/") => {
  const d = new Date(date);
  return (
    convertDate(d.getHours()) +
    ":" +
    convertDate(d.getMinutes()) +
    ":" +
    convertDate(d.getSeconds()) +
    " " +
    convertDate(d.getDate()) +
    symbol +
    convertDate(d.getMonth() + 1) +
    symbol +
    d.getFullYear()
  );
};
