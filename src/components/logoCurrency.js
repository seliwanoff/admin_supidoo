export default function currencyPairCheck(props) {
  // console.log(props);
  return props === "GBP"
    ? "£"
    : props === "NGN"
    ? "₦"
    : props === "USD"
    ? "$"
    : "€";
}
