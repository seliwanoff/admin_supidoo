import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
import GB from "../assets/images/GB.svg";
const currency = [
  {
    img: NGN,
    name: "NGN",
    title: "NG Naira",
  },
  {
    img: GB,
    name: "GBP",
    title: " British Pounds",
  },

  {
    img: US,
    name: "EUR",
    title: "Euro",
  },
  {
    img: EU,
    name: "USD",
    title: "USD Dollar",
  },
];
export default function currencyList(props) {
  return currency.find((currencyItem) => currencyItem.name === props);
}
