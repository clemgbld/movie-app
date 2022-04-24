export const handleStatus = (percent) => {
  if (percent < 50) return "bad";
  return percent < 70 ? "good" : "great";
};
