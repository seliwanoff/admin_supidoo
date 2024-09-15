export default function AmountCheck(props) {
  if (isNaN(props) || props === null) {
    return 0;
  } else {
    // console.log(props);
    const [integerPart, decimalPart] = parseFloat(props)
      .toFixed(2)
      .toString()
      .split(".");
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
    return `${formattedIntegerPart}.${decimalPart}`;
  }
}
