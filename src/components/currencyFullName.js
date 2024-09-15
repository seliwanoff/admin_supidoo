export default function getFullCurrencyName(props) {
  if (props === "NGN") {
    return "Naira";
  } else if (props === "GBP") {
    return "Pounds";
  } else if (props === "EUR") {
    return "Euro";
  } else {
    return "Dollar";
  }
}
