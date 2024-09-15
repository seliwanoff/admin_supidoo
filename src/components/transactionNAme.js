export default function TransactionName(props) {
  // console.log(props);

  return props === "LetterOfCredit"
    ? "Credit Line"
    : props === "Invoice"
    ? "Invoice Factoring"
    : props === "FxTransfer"
    ? "Fx Transfer"
    : props === "PaymentLink"
    ? "Payment Link"
    : props === "BankTransfer"
    ? "Bank Transfer"
    : props === "WalletDebit"
    ? "Wallet Debit"
    : props === "WalletCredit"
    ? "Wallet Credit"
    : "Working Capital";
}
