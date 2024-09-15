export default function getOrdinalSuffix(date) {
  if (typeof date !== "number") return "";
  const suffixes = ["th", "st", "nd", "rd"];
  const value = date % 100;
  return date + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
}
