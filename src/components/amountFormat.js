export function changeFoemat(amount) {
  const amountfigure = parseFloat(amount).toLocaleString();
  return amountfigure !== "NAN" ? amountfigure : 0;
}
