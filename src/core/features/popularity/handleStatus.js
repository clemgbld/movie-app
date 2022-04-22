export const handleStatus = (percent) => {
  if (percent < 50) return "bad";

  if (percent < 70) return "good";

  return "great";
};
