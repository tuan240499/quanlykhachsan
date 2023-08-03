export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + " " + match[2] + " " + match[3];
  }
  return null;
};

export const formatNumber = (number = 0) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
