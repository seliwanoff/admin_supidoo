import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import Dashboard from "./dashboard";
import RootLayout from "./root";
import Account from "./account";
import UserDocument from "./account/userdocument";
import Login from "./auth/login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAutoLogin } from "./store/authService";
import TradeOfCredit from "./finance/trade";
import Factoring from "./finance/factoring";
import Letterofcredit from "./finance/letter_of_credit";
import Order from "./flex/order";
import Invoice from "./flex/invoice";
import Buyers from "./flex/buyer";
import Suppliers from "./flex/supplier";
import Card from "./flex/card";
import Settings from "./settings/home";
import UserAccount from "./account/userAccount";
import ProofOfAddress from "./account/proofofaddress";
import FinanceHome from "./finance/home";
import FinanceDetails from "./finance/financedetails";
import FinanaceProof from "./finance/financeproof";
import ApproveRequest from "./finance/approveRequest";
import VerifyDocumentTab from "./account/verifyDocument";
import FundRequest from "./fundrequest/accept";
import ChangeTerm from "./changeterm/term";
import AccountEdit from "./settings/account";
import FlexHome from "./flex/home";
import FlexDetails from "./flex/flexdetails";
import OrderDetails from "./flex/orderdetails";
import SingleFlexInvoice from "./flex/flexinvoice";
import PurchaseOrderDocument from "./flex/purchase_order";
import Transactions from "./transaction/home";
import Wallets from "./wallet/home";
import WalletDetails from "./wallet/walletdetails";
import EachTransactionDetail from "./transaction/eachwalletdetails";
import AdminDetails from "./settings/admindetails";
import AdminInvite from "./admininvite/invite";
import TransferRequest from "./transfer/home";
import TransferDetails from "./transfer/transferdetail";
import FundWallet from "./wallet/fund";
import DashboardHome from "./dashboard/home";
import Receipt from "./receipt/home";
import ReviewDocuments from "./finance/review";
import LenderAgreementContainer from "./lenderagreement/lenderagreement";
import PaymentHome from "./payments/home";
import PaymentDetails from "./payments/paymentdetails";
import PaymentViewDocument from "./payments/view_document";
import TransferPay from "./transfer/pay";
import InvoiceFlexPayDetails from "./transfer/invoice";
import RecordPayment from "./payments/record";
import Referrals from "./referral/home";
import ReferralsHome from "./referral/home";
//import Referrals from "./transaction/referral/home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />} path="/">
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/finance/:id" element={<FinanceDetails />} />
        <Route
          element={<ProofOfAddress />}
          path="/proof_of_address"
          name="proofOfAddress"
        />
        <Route element={<VerifyDocumentTab />} path="/verifyDocument" />
        <Route element={<PaymentHome />} path="/payment/home" />
        <Route element={<PaymentDetails />} path="/payment/:id" />
        <Route element={<PaymentViewDocument />} path="/payment/document" />
        <Route element={<TransferPay />} path="/transfer/pay" />
        <Route element={<InvoiceFlexPayDetails />} path="/pay/invoice/:id" />

        <Route path="/account" element={<Account />} />
        <Route path="/finance" element={<FinanceHome />} />
        <Route path="/flex" element={<FlexHome />} />
        <Route path="/flex/:id" element={<FlexDetails />} />
        <Route path="/flex/order/:id" element={<OrderDetails />} />
        <Route path="transaction/home" element={<Transactions />} />
        <Route path="referral/home" element={<ReferralsHome />} />
        <Route
          path="transaction/home/:id"
          element={<EachTransactionDetail />}
        />
        <Route path="wallet/home" element={<Wallets />} />
        <Route path="wallet" element={<WalletDetails />} />
        <Route path="transfer/request" element={<TransferRequest />} />
        <Route path="transfer/request/:id" element={<TransferDetails />} />
        <Route path="wallet/fund/" element={<FundWallet />} />
        <Route path="payment/record" element={<RecordPayment />} />

        <Route path="admin/:id" element={<AdminDetails />} />
        <Route
          path="/purchase_order/document"
          element={<PurchaseOrderDocument />}
        />
        <Route path="/flex/invoice/:id" element={<SingleFlexInvoice />} />
        <Route path="/account/:id" element={<UserAccount />} />

        <Route path="/account/document/:id" element={<UserDocument />} />
        <Route path="/finance/fundrequest" element={<FundRequest />} />
        <Route path="/finance/changeterm" element={<ChangeTerm />} />
        <Route path="/account/edit" element={<AccountEdit />} />

        <Route path="/finance/trade" element={<TradeOfCredit />} />
        <Route path="/finance/document" element={<FinanaceProof />} />

        <Route path="/finance/review" element={<ReviewDocuments />} />

        <Route path="/finance/factoring" element={<Factoring />} />
        <Route path="/finance/letter_of_credit" element={<Letterofcredit />} />
        <Route
          path="/finance/approve_factoring_request"
          element={<ApproveRequest />}
        />
        <Route path="/flex/order" element={<Order />} />
        <Route path="/flex/invoice" element={<Invoice />} />
        <Route path="/flex/buyers" element={<Buyers />} />
        <Route path="/flex/supplier" element={<Suppliers />} />
        <Route path="/flex/card" element={<Card />} />
        <Route path="/settings/home" element={<Settings />} />
        <Route path="/receipt/home" element={<Receipt />} />
        <Route
          path="/lender/agreement"
          element={<LenderAgreementContainer />}
        />
      </Route>
      <Route>
        <Route index element={<Login />} />
        <Route
          path="/admin/complete-profile/:token/:email"
          element={<AdminInvite />}
        />
      </Route>
    </>
  )
);
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAutoLogin(dispatch);
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
