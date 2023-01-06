function returnTodayDate() {
  const currentTime = new Date();
  const date =
    currentTime.getDate() < 10
      ? "0" + currentTime.getDate()
      : currentTime.getDate();

  const month =
    currentTime.getMonth() + 1 < 10
      ? "0" + (currentTime.getMonth() + 1)
      : currentTime.getMonth() + 1;

  const year = currentTime.getFullYear();

  return date + "/" + month + "/" + year;
}

module.exports = returnTodayDate;
