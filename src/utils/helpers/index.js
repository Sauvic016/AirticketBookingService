function subtract24Hour(timestamp) {
  const date = new Date(timestamp);
  const TwentyFourHrInMS = 24 * 60 * 60 * 1000;
  const newTimestamp = new Date(date - TwentyFourHrInMS).toISOString();
  return newTimestamp;
}

function getDateTimeIST(timestamp) {
  let date = new Date(timestamp);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

module.exports = {
  subtract24Hour,
  getDateTimeIST,
};
