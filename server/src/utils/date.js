const convertDate = (number) => (number < 10 ? "0" + number : number);

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

export const msToTime = (duration) => {
  var milliseconds = Math.floor(duration % 1000),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours > 0 ? hours + "h" : "";
  minutes = minutes > 0 ? minutes + "m" : "";
  seconds = seconds > 0 ? seconds + "," + milliseconds + "s" : "";

  return hours + minutes + seconds;
};
