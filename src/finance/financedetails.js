// import {useNavigate} from "react-router";
// import {useEffect} from "react";
// import axios from "axios";
import OtherHeader from "../components/otherheader";
import user from "../assets/images/review.svg";
import document from "../assets/images/document-text.svg";
import loaders from "../assets/images/load.svg";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import document2 from "../assets/images/documentagree.svg";
import loaders2 from "../assets/images/refresh-square-2.svg";
import empty from "../assets/images/emptyadmin.svg";
import axios from "axios";
import sendfunds from "../assets/images/sendfunds.svg";
import rejectimg from "../assets/images/cancelsuccess.svg";
import checkbox from "../assets/images/marksuccess.svg";
import Loading from "../components/loading";
import factoring from "../assets/images/factoring.svg";
import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
import GBP from "../assets/images/GB.svg";
import currencyPairCheck from "../components/logoCurrency";
import AmountCheck from "../components/amountcheck";

const FinanceDetails = () => {
  // const [users, setuser] = useState([]);
  const { state } = useLocation();
  //console.log(state);
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, settab] = useState("kyc");
  const [loans, setLoans] = useState([]);

  const [allbusiness, setallbusiness] = useState([]);
  const [loader, setloader] = useState(false);
  const [success, setsucess] = useState(false);
  const [fail, setfail] = useState(false);
  const [message, setmessage] = useState("");
  const [idloan, setidloan] = useState("");
  const [businesswallet, setBusinesswallet] = useState([]);
  const [agreementDocument, setagreementDocument] = useState([]);
  const [isLoadingDocument, setisLoadingDocument] = useState(true);

  // console.log(state);
  useEffect(() => {
    if (fail) {
      let timer = setTimeout(() => {
        setfail(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [fail]);

  useEffect(() => {
    if (success) {
      let timer = setTimeout(() => {
        setsucess(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);
  //console.log(state);
  useEffect(() => {
    const fetchDocument = async () => {
      const data = {
        business: state.business._id,
        financeType:
          state?.customtype === "Credit Line" ? "CreditLine" : "TradeCredit",
        creditLine: state._id,
      };
      const datas = {
        business: state.business._id,
        financeType:
          state?.customtype === "Credit Line" ? "CreditLine" : "TradeCredit",
        tradeCredit: state._id,
      };
      const datass = {
        business: state.business?._id,
        financeType: "FinanceInvoice",
        financeInvoice: state._id,
      };
      await axios
        .post(
          `/v1/admin/getAgreement`,
          state?.customtype === "Credit Line"
            ? data
            : state.customtype === "Working Capital"
            ? datas
            : datass
        )
        .then((res) => {
          // console.log(res);
          setagreementDocument(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchDocument();
  }, []);
  function allSigned() {
    if (agreementDocument.length !== 0) {
      const signees = agreementDocument.signees;
      for (const signee of signees) {
        if (signee.status !== "completed") {
          return false;
        }
      }
      return true;
    }
  }
  // console.log(allSigned());
  console.log(allbusiness);
  function anySigned() {
    if (agreementDocument.length !== 0) {
      if (
        agreementDocument.signees.length > 0 &&
        agreementDocument.signees[0].status === "completed"
      ) {
        return true;
      } else {
        return false;
      }

      // Loop through each signee
      /**
      for (const signee of agreementDocument.signees) {
        // Check if the status is "signed"
        if (signee.status === "completed") {
          // If any signee has status "signed", return true
          return true;
        }
      }
      **/
      // If no signee has status "signed", return false
      return false;
    }
  }
  useEffect(() => {
    const fetchLoanDetails = async () => {
      await axios
        .get(
          `/v1/admin/loan/finance/${state._id}?financeType=${
            state.customtype === "Working Capital"
              ? "TradeCredit"
              : state.customtype === "Credit Line"
              ? "CreditLine"
              : "FinanceInvoice"
          }`
        )
        .then((res) => {
          //console.log(res);
          setLoans(res.data.data?.loans);
          setidloan(res.data.data?._id);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchLoanDetails();
  }, []);
  const filterloan = loans?.filter((item) =>
    item?.paymentStatus?.match("UNPAID")
  );
  //console.log(state.customtype);
  const filterloanrepaid = loans?.filter((item) =>
    item?.paymentStatus?.match("REPAID")
  );
  let firstloan = filterloan?.filter((item, index) => {
    return index === 0;
  });
  function areAllDocumentsApproved(uploadDocuments) {
    //console.log(uploadDocuments);
    for (const key in uploadDocuments) {
      if (uploadDocuments[key]?.status !== "APPROVED") {
        return false;
      }
    }
    return true;
  }
  // console.log(state.customtype);
  function checkDocumentsStatus(customtype) {
    if (customtype === "Credit Line") {
      return areAllDocumentsApproved(allbusiness.uploadDocuments);
    } else if (customtype === "Working Capital") {
      if (allbusiness.type === "purchaseOrder") {
        return areAllDocumentsApproved(allbusiness.purchaseOrder);
      } else if (allbusiness.type === "shippingDocuments") {
        return areAllDocumentsApproved(allbusiness.shippingDocuments);
      } else if (allbusiness.type === "inventoryDocuments") {
        return areAllDocumentsApproved(allbusiness.inventoryDocuments);
      } else if (allbusiness.type === "cashFlowSupport") {
        return areAllDocumentsApproved(allbusiness.cashFlowSupport);
      } else {
        return false;
      }
    } else if (customtype === "Factoring") {
      const agreement = allbusiness.agreement;
      const invoiceDocument = allbusiness.invoiceDocument;
      const extractedData = [agreement, invoiceDocument];
      // console.log(...extractedData);

      return areAllDocumentsApproved([...extractedData]);
    } else {
      return false;
    }
  }

  function isAnyDocumentRejected(uploadDocuments) {
    // Iterate over the values of uploadDocuments object
    for (const key in uploadDocuments) {
      // Check if the status of the document is not 'APPROVED'
      if (uploadDocuments[key].status === "REJECTED") {
        // If any document has a status other than 'APPROVED', return false
        return true;
      }
    }
    // If no document has 'rejected' status, return false
    return false;
  }

  function checkDocumentsStatusisany(customtype) {
    // Check if the customtype is 'creditLine'
    if (customtype === "Credit Line") {
      // Use the function to check if all documents are approved
      return isAnyDocumentRejected(allbusiness.uploadDocuments);
    } else if (customtype === "Working Capital") {
      if (allbusiness.type === "purchaseOrder") {
        return isAnyDocumentRejected(allbusiness.purchaseOrder);
      } else if (allbusiness.type === "shippingDocuments") {
        return isAnyDocumentRejected(allbusiness.shippingDocuments);
      } else if (allbusiness.type === "inventoryDocuments") {
        return isAnyDocumentRejected(allbusiness.inventoryDocuments);
      } else if (allbusiness.type === "inventoryDocuments") {
        return isAnyDocumentRejected(allbusiness.cashFlowSupport);
      }
    } else {
      return false;
    }
  }
  const sendLenderDocument = () => {
    if (checkDocumentsStatus(state.customtype) === true) {
      navigate("/finance/review", {
        state: {
          ...allbusiness,
          customtype: state.customtype,
          ...state,
        },
      });
    }
  };
  //console.log(allbusiness);
  // console.log(state.customtype);
  // console.log(checkDocumentsStatus(state.customtype));
  const gotoDocuments = async () => {
    startVerification("PROCESSING");
    if (state.customtype === "Factoring") {
      if (
        allbusiness.agreement?.status === "APPROVED" &&
        allbusiness.invoiceDocument.status === "APPROVED"
      ) {
        navigate("/lender/agreement", {
          state: {
            ...allbusiness,
            customtype: state.customtype,
            ...state,
          },
        });
      }
      if (!allbusiness.invoiceDocument?.hasOwnProperty("status")) {
        navigate("/finance/document", {
          state: {
            image: allbusiness?.invoiceDocument?.url,
            type: "invoice",
            id: state._id,
            name: "Invoice",
            customtype: state.customtype,
          },
        });
      } else if (!allbusiness.agreement?.hasOwnProperty("status")) {
        navigate("/finance/document", {
          state: {
            image: allbusiness?.agreement?.url,
            type: "agreement",
            id: state._id,
            name: "Invoice",
            customtype: state.customtype,
          },
        });
      }
    }
    if (state.customtype === "Credit Line") {
      if (
        allbusiness?.uploadDocuments?.bankStatement?.status === "APPROVED" &&
        allbusiness?.uploadDocuments?.boardResolution?.status === "APPROVED" &&
        allbusiness?.uploadDocuments?.contractAgreement?.status ===
          "APPROVED" &&
        allbusiness?.uploadDocuments?.managementAccounts?.status ===
          "APPROVED" &&
        allbusiness?.uploadDocuments?.schedulingExistingLoan?.status ===
          "APPROVED"
      ) {
        navigate("/finance/review", {
          state: {
            ...allbusiness,
            customtype: state.customtype,
            ...state,
          },
        });
      } else {
        if (allbusiness?.uploadDocuments.bankStatement?.status === "PENDING") {
          navigate("/finance/document", {
            state: {
              image: allbusiness?.uploadDocuments?.bankStatement?.url,
              type: "bankStatement",
              id: state._id,
              name: "letterOfCredit",

              customtype: state.customtype,
              newdata: allbusiness,
            },
          });
        } else if (
          allbusiness?.uploadDocuments.boardResolution?.status === "PENDING"
        ) {
          navigate("/finance/document", {
            state: {
              image: allbusiness?.uploadDocuments?.boardResolution?.url,
              type: "boardResolution",
              id: state._id,
              name: "letterOfCredit",
              customtype: state.customtype,
              newdata: allbusiness,
            },
          });
        } else if (
          allbusiness?.uploadDocuments.contractAgreement?.status === "PENDING"
        ) {
          navigate("/finance/document", {
            state: {
              image: allbusiness?.uploadDocuments?.contractAgreement?.url,
              type: "contractAgreement",
              id: state._id,
              name: "letterOfCredit",
              customtype: state.customtype,
              newdata: allbusiness,
            },
          });
        } else if (
          allbusiness?.uploadDocuments.managementAccounts?.status === "PENDING"
        ) {
          navigate("/finance/document", {
            state: {
              image: allbusiness?.uploadDocuments?.managementAccounts?.url,
              type: "managementAccounts",
              id: state._id,
              name: "letterOfCredit",
              customtype: state.customtype,
              newdata: allbusiness,
            },
          });
        } else if (
          allbusiness?.uploadDocuments.schedulingExistingLoan?.status ===
          "PENDING"
        ) {
          navigate("/finance/document", {
            state: {
              image: allbusiness?.uploadDocuments?.schedulingExistingLoan?.url,
              type: "schedulingExistingLoan",
              id: state._id,
              name: "letterOfCredit",
              customtype: state.customtype,
              newdata: allbusiness,
            },
          });
        }
      }
    }
    if (state.customtype === "Working Capital") {
      if (allbusiness.type === "purchaseOrder") {
        if (
          allbusiness.purchaseOrder.bankStatement?.status === "APPROVED" &&
          allbusiness.purchaseOrder.boardResolution?.status === "APPROVED" &&
          allbusiness.purchaseOrder.contractAgreement?.status === "APPROVED" &&
          allbusiness.purchaseOrder.pastPurchaseOrder?.status === "APPROVED" &&
          allbusiness.purchaseOrder.purchaseOrder?.status === "APPROVED" &&
          allbusiness.purchaseOrder.vendorLetter?.status === "APPROVED"
        ) {
          navigate("/finance/review", {
            state: {
              ...allbusiness,
              customtype: state.customtype,
              ...state,
            },
          });
        } else {
          if (
            !allbusiness.purchaseOrder.boardResolution?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.purchaseOrder?.boardResolution?.url,
                type: "boardResolution",
                id: state._id,
                name: "TradeCredit",
                customtype: state.customtype,

                newdata: allbusiness,
              },
            });
          } else if (
            !allbusiness.purchaseOrder.contractAgreement?.hasOwnProperty(
              "status"
            )
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.purchaseOrder?.contractAgreement?.url,
                type: "contractAgreement",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.purchaseOrder.bankStatement?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.purchaseOrder?.bankStatement?.url,
                type: "bankStatement",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.purchaseOrder.pastPurchaseOrder?.hasOwnProperty(
              "status"
            )
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.purchaseOrder?.pastPurchaseOrder?.url,
                type: "pastPurchaseOrder",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.purchaseOrder.purchaseOrder?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.purchaseOrder?.boardResolution?.url,
                type: "purchaseOrder",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.purchaseOrder.vendorLetter?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.purchaseOrder?.vendorLetter?.url,
                type: "vendorLetter",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          }
        }
      }
      if (allbusiness.type === "shippingDocuments") {
        if (
          allbusiness.shippingDocuments.forwardingDocument?.status ===
            "APPROVED" &&
          allbusiness.shippingDocuments.airWayBill?.status === "APPROVED" &&
          allbusiness.shippingDocuments.insurance?.status === "APPROVED" &&
          allbusiness.shippingDocuments.certificateOfOrigin?.status ===
            "APPROVED" &&
          allbusiness.shippingDocuments.packingList?.status === "APPROVED" &&
          allbusiness.shippingDocuments.inspectionCertificate?.status ===
            "APPROVED" &&
          allbusiness.shippingDocuments.exportAndImportDocument?.status ===
            "APPROVED"
        ) {
          navigate("/finance/review", {
            state: {
              ...allbusiness,
              customtype: state.customtype,
              ...state,
            },
          });
        } else {
          if (
            !allbusiness.shippingDocuments.airWayBill?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.shippingDocuments?.airWayBill?.url,
                type: "airWayBill",
                id: state._id,
                name: "TradeCredit",
                customtype: state.customtype,

                newdata: allbusiness,
              },
            });
          } else if (
            !allbusiness.shippingDocuments.certificateOfOrigin?.hasOwnProperty(
              "status"
            )
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.shippingDocuments?.certificateOfOrigin?.url,
                type: "certificateOfOrigin",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.shippingDocuments.exportAndImportDocument?.hasOwnProperty(
              "status"
            )
          ) {
            navigate("/finance/document", {
              state: {
                image:
                  allbusiness?.shippingDocuments?.exportAndImportDocument?.url,
                type: "exportAndImportDocument",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.shippingDocuments.forwardingDocument?.hasOwnProperty(
              "status"
            )
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.shippingDocuments?.forwardingDocument?.url,
                type: "forwardingDocument",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.shippingDocuments.inspectionCertificate?.hasOwnProperty(
              "status"
            )
          ) {
            navigate("/finance/document", {
              state: {
                image:
                  allbusiness?.shippingDocuments?.inspectionCertificate?.url,
                type: "inspectionCertificate",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.shippingDocuments.insurance?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.shippingDocuments?.insurance?.url,
                type: "vendorLetter",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.shippingDocuments.packingList?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.shippingDocuments?.packingList?.url,
                type: "packingList",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.shippingDocuments.packingList?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.shippingDocuments?.forwardingDocument?.url,
                type: "forwardingDocument",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          }
        }
      }
      if (allbusiness.type === "inventoryDocuments") {
        if (
          allbusiness.inventoryDocuments.agreement?.status === "APPROVED" &&
          allbusiness.inventoryDocuments.invoice?.status === "APPROVED"
        ) {
          navigate("/finance/review", {
            state: {
              ...allbusiness,
              customtype: state.customtype,
              ...state,
            },
          });
        } else {
          if (
            !allbusiness.inventoryDocuments.agreement?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.inventoryDocuments?.agreement?.url,
                type: "agreement",
                id: state._id,
                name: "TradeCredit",
                customtype: state.customtype,

                newdata: allbusiness,
              },
            });
          } else if (
            !allbusiness.inventoryDocuments.invoice?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.inventoryDocuments?.invoice?.url,
                type: "invoice",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          }
        }
      }
      if (allbusiness.type === "cashFlowSupport") {
        if (
          allbusiness.cashFlowSupport.agreement?.status === "APPROVED" &&
          allbusiness.cashFlowSupport.bankStatement?.status === "APPROVED" &&
          allbusiness.cashFlowSupport.managementAccount?.status === "APPROVED"
        ) {
          navigate("/finance/review", {
            state: {
              ...allbusiness,
              customtype: state.customtype,
              ...state,
            },
          });
        } else {
          if (
            !allbusiness.cashFlowSupport.agreement?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.cashFlowSupport?.agreement?.url,
                type: "agreement",
                id: state._id,
                name: "TradeCredit",
                customtype: state.customtype,

                newdata: allbusiness,
              },
            });
          } else if (
            !allbusiness.cashFlowSupport.managementAccount?.hasOwnProperty(
              "status"
            )
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.cashFlowSupport?.managementAccount?.url,
                type: "managementAccount",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          } else if (
            !allbusiness.cashFlowSupport.bankStatement?.hasOwnProperty("status")
          ) {
            navigate("/finance/document", {
              state: {
                image: allbusiness?.cashFlowSupport?.bankStatement?.url,
                type: "bankStatement",
                id: state._id,
                name: "TradeCredit",
                newdata: allbusiness,
                customtype: state.customtype,
              },
            });
          }
        }
      }
    }
  };
  useEffect(() => {
    const fetchTransaction = async () => {
      if (state.customtype === "Working Capital") {
        await axios
          .get(`/v1/admin/get-single-finance-trade-credit/${state._id}`)
          .then((res) => {
            //   console.log(res)
            setallbusiness(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (state.customtype === "Credit Line") {
        await axios
          .get(`/v1/admin/get-single-finance-credit-line/${state._id}`)
          .then((res) => {
            // console.log(res);
            setallbusiness(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await axios
          .get(`/v1/admin/get-single-finance-invoice/${id}`)
          .then((res) => {
            console.log(res);
            setallbusiness(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };

    fetchTransaction();
  }, [state?.customtype, state?._id]);
  // console.log(state);
  useEffect(() => {
    const fetchwalletbusiness = async () => {
      await axios
        .get(`/v1/admin/get-full-business-details/${state?.business?._id}`)
        .then((res) => {
          setBusinesswallet(res.data.data.wallets);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchwalletbusiness();
  }, []);
  const filterwallet = businesswallet?.filter((item) =>
    item?.currency?.match(state?.currency)
  );
  //  console.log(allbusiness);
  const startVerification = async (value) => {
    if (state.customtype === "Factoring") {
      const data = {
        status: value,
      };
      await axios
        .put(`/v1/admin/changeFinanceInvoiceStatus/${id}`, data)

        .then((res) => {
          if (value === "APPROVED") {
            axios.post(`/v1/admin/approveFinanceInvoice/${id}`, {
              amount:
                allbusiness.loanAmount === undefined
                  ? allbusiness.requestedAmount
                  : allbusiness.loanAmount,
              repaymentStructure: allbusiness.repaymentStructure,
              tenure: allbusiness.tenure,
            });
          }
          if (state.customtype === "Working Capital") {
            axios
              .get(`/v1/admin/get-single-finance-trade-credit/${state._id}`)
              .then((res) => {
                // console.log(res)
                setallbusiness(res.data.data);
              })
              .catch((e) => {
                console.log(e);
              });
          } else if (state.customtype === "Credit Line") {
            axios
              .get(`/v1/admin/get-single-finance-credit-line/${state._id}`)
              .then((res) => {
                //  console.log(res)
                setallbusiness(res.data.data);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            axios
              .get(`/v1/admin/get-single-finance-invoice/${state._id}`)
              .then((res) => {
                // console.log(res)
                setallbusiness(res.data.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (state.customtype === "Working Capital") {
      const data = {
        status: value,
      };
      await axios
        .put(`/v1/admin/changeFinanceTradeCreditStatus/${id}`, data)
        .then(() => {
          if (value === "APPROVED") {
            axios.post(`/v1/admin/approveTradeCreditLoan/${id}`, {
              amount:
                allbusiness.loanAmount === undefined
                  ? allbusiness.requestedAmount
                  : allbusiness.loanAmount,
              repaymentStructure: allbusiness.repaymentStructure,
              tenure: allbusiness.tenure,
            });
          }
          axios
            .get(`/v1/admin/get-single-finance-trade-credit/${state._id}`)
            .then((res) => {
              setallbusiness(res.data.data);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (state.customtype === "Credit Line") {
      const data = {
        status: value,
      };
      await axios
        .put(`/v1/admin/changeFinanceCreditLineStatus/${id}`, data)
        .then((res) => {
          if (value === "APPROVED") {
            axios.post(`/v1/admin/approveCreditLineLoan/${id}`, {
              amount:
                allbusiness.loanAmount === undefined
                  ? allbusiness.requestedAmount
                  : allbusiness.loanAmount,
              repaymentStructure: allbusiness.repaymentStructure,
              tenure: allbusiness.tenure,
            });
          }
          axios
            .get(`/v1/admin/get-single-finance-credit-line/${state._id}`)
            .then((res) => {
              //console.log(res)
              setallbusiness(res.data.data);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const RepayNow = async () => {
    setloader(true);
    await axios
      .post(`/v1/admin/loan/repay/${idloan}/${firstloan[0]?._id}`)
      .then((res) => {
        setsucess(true);
        setfail(false);
        setmessage(res.data.message);
        axios
          .get(
            `/v1/admin/loan/finance/${state._id}?financeType=${
              state.customtype === "Working Capital"
                ? "TradeCredit"
                : state.customtype === "Credit Line"
                ? "CreditLine"
                : "FinanceInvoice"
            }`
          )
          .then((res) => {
            setLoans(res.data.data?.loans);
          });
        setloader(false);
      })
      .catch((e) => {
        setsucess(false);
        setfail(true);
        setmessage(
          e.response?.data.message ? e.response?.data.message : "An error occur"
        );
        setloader(false);
      });
  };

  return (
    <>
      <div className="main">
        <OtherHeader title={"BACK TO FINANCE"} arrow={"keyboard_backspace"} />

        <div className="info-cl">
          {allbusiness.status === "SUBMITTED" && (
            <marquee
              behavior=""
              direction=""
              style={{
                color: "crimson",
              }}
            >
              FInance status must be in processing before you can start
              verifying the documents.
            </marquee>
          )}
          <div className="overview">
            <h4
              style={{
                margin: "0px",
                padding: "0px",
              }}
            >
              Request details
            </h4>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "30px",
            }}
          >
            <div
              className="main-info-con-rights"
              style={{
                padding: "0px",
                minHeight: "790px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {fail && (
                <div
                  className="success"
                  style={{
                    background: "#FCFCFD",
                    border: " 1px solid #D0D5DD",

                    boxSizing: "border-box",
                    zIndex: "9999",
                    width: "100%",
                  }}
                >
                  <div className="lg-success">
                    <div
                      className="ech-lg-hm"
                      style={{
                        background: "#F9FAFB",
                      }}
                    >
                      <div
                        className="main-sucees"
                        style={{
                          color: "#344054",
                          textAlign: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        Access Denied
                      </div>
                      <span
                        style={{
                          color: "#344054",
                        }}
                      >
                        {message}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="top_head_cl" style={{ padding: "24px" }}>
                <div className="ip_v_lg">
                  <div
                    className="profile-d-icon"
                    style={{
                      height: "48px",
                      width: "48px",
                    }}
                  >
                    {state?.business?.name?.slice(0, 2)}
                  </div>
                  <div className="name-avater-tag" style={{ gap: "8px" }}>
                    <span
                      style={{
                        color: "#101828",
                        fontWeight: "500",
                        fontSize: "20px",
                        lineHeight: "24px",
                      }}
                    >
                      {state?.business?.name}{" "}
                    </span>
                    <span className="business_name">
                      {state?.business?.user?.firstName}{" "}
                      {state?.business?.user?.lastName}
                    </span>
                  </div>
                </div>
                <div
                  className="status_user"
                  style={{
                    color:
                      allbusiness.status === "APPROVED"
                        ? "#12b76a"
                        : allbusiness?.status === "COMPLETED"
                        ? "#12b76a"
                        : "",
                  }}
                >
                  {allbusiness.status === "SUBMITTED"
                    ? "PENDING"
                    : allbusiness.status}
                </div>
              </div>
              <div
                className="verify_account"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {allbusiness.status === "SUBMITTED" && (
                  <div
                    className="user_verify"
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      color: "#6F00FF",
                      fontWeight: "600",
                    }}
                    onClick={() => gotoDocuments()}
                  >
                    <img src={user} alt="" />
                    Review request
                  </div>
                )}

                {checkDocumentsStatus(state.customtype) === true &&
                agreementDocument.length === 0 &&
                allbusiness.status !== "REJECTED" ? (
                  <div
                    className="user_verify"
                    style={{
                      width: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => sendLenderDocument()}
                  >
                    {/**<img src={user} alt="" /> **/}
                    Send Lender's agreement
                  </div>
                ) : (
                  ""
                )}
                {allSigned() === true &&
                  allbusiness.status !== "COMPLETED" &&
                  allbusiness.status !== "APPROVED" &&
                  allbusiness.status !== "REJECTED" && (
                    <div
                      className="user_verify"
                      style={{
                        width: "100%",
                        cursor: "pointer",
                      }}
                      onClick={() => startVerification("APPROVED")}
                    >
                      {/**<img src={user} alt="" />**/}
                      Approve Requests
                    </div>
                  )}
                {/**
                {allSigned() === true && (
                  <div
                    className="user_verify"
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      color: "crimson",
                    }}
                    onClick={() => startVerification("PROCESSING")}
                  >
                    Reject Request
                  </div>
                )}
                */}
                {/**
                {checkDocumentsStatusisany(state.customtype) === true && (
                  <div
                    className="user_verify"
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      color: "crimson",
                    }}
                    onClick={() => startVerification("REJECTED")}
                  >
                    Reject Request
                  </div>
                )}
                */}
                {allbusiness.status !== "APPROVED" &&
                  allbusiness.status !== "REJECTED" && (
                    <div
                      className="user_verify"
                      style={{
                        width: "100%",
                        cursor: "pointer",
                        color: "crimson",
                      }}
                      onClick={() => startVerification("REJECTED")}
                    >
                      Reject Request
                    </div>
                  )}

                {allbusiness?.status === "APPROVED" &&
                !allbusiness?.disbursementDate &&
                allSigned() === true ? (
                  <>
                    <div
                      className="user_verify"
                      style={{
                        width: "100%",
                        color: "#98A2B3",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        navigate("/finance/fundrequest", {
                          state: {
                            ...allbusiness,
                            customtype: state.customtype,
                          },
                        });
                      }}
                    >
                      <img src={sendfunds} alt="" />
                      Disburse Payment
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              {/**

              {state.customtype !== "Factoring" &&
                allbusiness?.status !== "COMPLETED" && (
                  <>
                    <div
                      className="user_verify"
                      style={{
                        width: "100%",
                        color: "#98A2B3",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate("/finance/changeterm", {
                          state: {
                            ...allbusiness,
                            customtype: state.customtype,
                          },
                        })
                      }
                    >
                      <img src={sendfunds} alt="" />
                      Change Terms
                    </div>

                    <div className="user_balance"></div>
                  </>
                )}
                */}
              <div style={{ marginTop: "-20px" }} className="details-d_tl">
                <div className="md-details-col">
                  <div className="details_cl_tl">
                    {state.customtype} details
                  </div>

                  <div
                    className="each_details_tl"
                    style={{
                      borderBottom: "1px solid #E7E9FB",
                      paddingBottom: "30px",
                    }}
                  >
                    {state.customtype === "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Request Amount</div>
                        <span className="d-lt-a">
                          {currencyPairCheck(state.currency)}

                          {state.customtype === "Factoring" &&
                            parseFloat(state.requestedAmount).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {state.customtype === "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Credit Amount</div>
                        <span className="d-lt-a">
                          {currencyPairCheck(state.currency)}
                          {state.customtype === "Factoring" &&
                            parseFloat(state.requestedAmount).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {state.customtype === "Factoring" && (
                      <>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Invoice Title</div>
                          <span className="d-lt-a">
                            {allbusiness?.invoice?.invoiceTitle}
                          </span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Issue Date</div>
                          <span className="d-lt-a">
                            {new Date(
                              allbusiness?.invoice
                                ? allbusiness?.invoice?.issueDate
                                : allbusiness?.createdAt
                            ).toDateString()}
                          </span>
                        </div>
                        {/**
                        <div className="each_main_tl">
                          <div className="each_d_lt">Payment Link</div>
                          <span className="d-lt-a">

                            {allbusiness?.invoice?.paymentLink}
                          </span>
                        </div>
                        */}

                        <div className="each_main_tl">
                          <div className="each_d_lt">Due Date</div>
                          <span className="d-lt-a">
                            {new Date(
                              allbusiness?.invoice
                                ? allbusiness?.invoice?.dueDate
                                : allbusiness?.createdAt
                            ).toDateString()}
                          </span>
                        </div>
                      </>
                    )}
                    {/**
                    {
                      allbusiness?.loanAmount !== undefined && allbusiness?.loanAmount !== null &&

                      <div className="each_main_tl">
                        <div className="each_d_lt">Approved Amount</div>
                        <span className="d-lt-a">
                          {state.currency === "NGN"
                            ? "₦"
                            : state.currency === "EUR"
                              ? "€"
                              : "£"}
                          {allbusiness?.loanAmount}
                        </span>
                      </div>
                    }
                     */}

                    {state.customtype === "Working Capital" &&
                      allbusiness?.purchaseOrder && (
                        <>
                          <div className="each_main_tl">
                            <div className="each_d_lt">Contract Amount</div>
                            <span className="d-lt-a">
                              {currencyPairCheck(state.currency)}
                              {AmountCheck(state.contractAmount)}
                            </span>
                          </div>
                          <div className="each_main_tl">
                            <div className="each_d_lt">Contract Type</div>
                            <span className="d-lt-a">{state.contractType}</span>
                          </div>
                        </>
                      )}
                    {state.customtype === "Credit Line" && (
                      <>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Request Title</div>
                          <span className="d-lt-a">{state.requestTitle}</span>
                        </div>
                      </>
                    )}
                    {state.customtype !== "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">
                          Initial Repayment Structure
                        </div>
                        <span className="d-lt-a">
                          {state?.initialRepaymentStructure === "InterestFirst"
                            ? "Interest First"
                            : state?.initialRepaymentStructure === "FullPayment"
                            ? "Full Payment"
                            : state?.initialRepaymentStructure}
                        </span>
                      </div>
                    )}
                    {/***
                    {
                      state.customtype !== 'Factoring' &&

                      <div className="each_main_tl">
                        <div className="each_d_lt">Request Date</div>
                        <span className="d-lt-a">
                          {new Date(state.createdAt).toDateString()}{" "}
                          {new Date(state.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    }
                    */}
                    {state.customtype === "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Invoice Status</div>
                        <span className="d-lt-a">
                          {allbusiness?.paymentStatus}
                        </span>
                      </div>
                    )}
                    {state.customtype !== "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Payment Status</div>
                        <span className="d-lt-a">
                          {allbusiness?.paymentStatus}
                        </span>
                      </div>
                    )}
                    {state.customtype !== "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Requested Amount </div>
                        <span className="d-lt-a">
                          {currencyPairCheck(state.currency)}
                          {AmountCheck(allbusiness?.requestedAmount)}
                        </span>
                      </div>
                    )}
                    {/**
                    {state.customtype === "Working Capital" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Repay Date</div>
                        <span className="d-lt-a">
                          {new Date(state.createdAt).toDateString()}{" "}
                          {new Date(state.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                     */}

                    {state?.customtype !== "Factoring" && (
                      <div className="each_main_tl">
                        <div className="each_d_lt">Initial Tenure</div>
                        <span className="d-lt-a">{state.tenure} Days</span>
                      </div>
                    )}
                    <div className="each_main_tl">
                      <div className="each_d_lt">Management Fee (1%)</div>
                      <span className="d-lt-a">
                        {currencyPairCheck(state.currency)}

                        {AmountCheck(0.01 * parseFloat(state?.requestedAmount))}
                      </span>
                    </div>

                    {state.customtype === "Working Capital" ? (
                      <div className="each_main_tl">
                        <div className="each_d_lt">
                          Interest (
                          {parseFloat(allbusiness?.interestRate) * 100}%)
                        </div>
                        <span className="d-lt-a">
                          {currencyPairCheck(state.currency)}
                          {parseFloat(
                            allbusiness?.interestRate *
                              allbusiness?.requestedAmount
                          ).toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    {/**  <div className="each_main_tl">
                                          <div className="each_d_lt">Fee</div>
                                          <span className="d-lt-a">0.0s</span>
                                        </div> */}
                  </div>
                  {state.customtype === "Working Capital" && (
                    <div className="each_main_tl">
                      <div className="each_d_lt">Type</div>
                      <span className="d-lt-a">
                        {allbusiness?.type === "purchaseOrder"
                          ? "Purchase Order"
                          : allbusiness.type === "shippingDocuments"
                          ? "Shipping Documents"
                          : allbusiness.type === "inventoryDocuments"
                          ? "Inventory Documents"
                          : "CashFlow Support"}
                      </span>
                    </div>
                  )}
                  {state.customtype === "Credit Line" && (
                    <>
                      <div className="details_cl_tl">Other Details</div>

                      <div
                        className="each_details_tl"
                        style={{ paddingBottom: "30px" }}
                      >
                        <div className="each_main_tl">
                          <div className="each_d_lt">Annual Sales Revenue</div>
                          <span className="d-lt-a">
                            {currencyPairCheck(state.currency)}
                            {parseFloat(state.annualRevenue).toLocaleString()}
                          </span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Annual Turnover</div>
                          <span className="d-lt-a">
                            {currencyPairCheck(state.currency)}
                            {parseFloat(state.annualTurnOver).toLocaleString()}
                          </span>
                        </div>
                        {/**
                        <div className="each_main_tl">
                          <div
                            className="each_d_lt"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            {state.userType} bank
                          </div>
                          <span className="d-lt-a">
                            {state?.advisingBank
                              ? state?.advisingBank.name
                              : "Nill"}
                          </span>
                        </div>

                        <div className="each_main_tl">
                          <div
                            className="each_d_lt"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            {state.userType} account
                          </div>
                          <span className="d-lt-a">
                            {state.advisingBank
                              ? state.advisingBank?.accountNumber
                              : "Nill"}
                          </span>
                        </div>
                        */}
                      </div>
                    </>
                  )}
                  {state.customtype === "Factoring" && (
                    <>
                      <div
                        className="details_cl_tl"
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        {allbusiness?.userType} Details
                      </div>

                      <div
                        className="each_details_tl"
                        style={{ paddingBottom: "30px" }}
                      >
                        <div className="each_main_tl">
                          <div className="each_d_lt">Firstname</div>
                          <span className="d-lt-a">
                            {allbusiness?.invoice?.firstName}{" "}
                          </span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Email</div>
                          <span className="d-lt-a">
                            {allbusiness?.invoice?.email}
                          </span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">Phone Number</div>
                          <span className="d-lt-a">
                            {allbusiness?.invoice?.phoneNumber}
                          </span>
                        </div>
                        <div className="each_main_tl">
                          <div className="each_d_lt">User Type</div>
                          <span className="d-lt-a">
                            {allbusiness?.invoice?.userType}
                          </span>
                        </div>
                        {/**
                        <div className="each_main_tl">
                          <div
                            className="each_d_lt"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            {state.userType} bank
                          </div>
                          <span className="d-lt-a">
                            {state?.advisingBank
                              ? state?.advisingBank.name
                              : "Nill"}
                          </span>
                        </div>

                        <div className="each_main_tl">
                          <div
                            className="each_d_lt"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            {state.userType} account
                          </div>
                          <span className="d-lt-a">
                            {state.advisingBank
                              ? state.advisingBank?.accountNumber
                              : "Nill"}
                          </span>
                        </div>
                        */}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-right-col-cf">
              <ul className="tp-head-list">
                <li
                  onClick={() => settab("kyc")}
                  style={{
                    borderBottom: tab === "kyc" ? "3px solid #6F00FF" : "",
                  }}
                >
                  Document
                </li>
                {state?.customtype === "Working Capital" && (
                  <li
                    onClick={() => settab("bank")}
                    style={{
                      borderBottom: tab === "bank" ? "3px solid #6F00FF" : "",
                    }}
                  >
                    {allbusiness?.userType ? allbusiness?.userType : ""}
                  </li>
                )}
                {state?.customtype === "Factoring" && (
                  <li
                    onClick={() => settab("bank")}
                    style={{
                      borderBottom: tab === "bank" ? "3px solid #6F00FF" : "",
                    }}
                  >
                    Invoice Details
                  </li>
                )}

                {state.customtype !== "Factoring" && (
                  <li
                    onClick={() => {
                      if (allbusiness.isAdminApproved?.status === "APPROVED")
                        settab("repay");
                    }}
                    style={{
                      borderBottom: tab === "repay" ? "3px solid #6F00FF" : "",
                    }}
                  >
                    Credit Details
                  </li>
                )}
              </ul>
              <div
                className="main_tp_lig"
                style={{
                  minHeight: "670px !important",
                }}
              >
                {tab === "kyc" && (
                  <>
                    {state.customtype === "Factoring" && (
                      <>
                        <div
                          className="prof_ad_rf"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (allbusiness?.invoiceDocument) {
                              navigate("/finance/document", {
                                state: {
                                  image: allbusiness?.invoiceDocument?.url,
                                  type: "invoice",
                                  id: state._id,
                                  name: "Invoice",
                                },
                              });
                            }
                          }}
                        >
                          <div className="left-ttl-c">
                            <span className="typ_lg_vg">Invoice</span>
                          </div>
                          <div className="each_sec_lg_vg">
                            <div className="lg-md-lf-glv">
                              <img src={document} alt="" />
                              Invoice
                            </div>
                            {state?.invoiceDocument?.url ? (
                              <span className="material-icons">
                                navigate_next
                              </span>
                            ) : (
                              "Not uploaded"
                            )}

                            <div className="loader">
                              <img
                                src={
                                  allbusiness?.invoiceDocument?.status ===
                                  "APPROVED"
                                    ? checkbox
                                    : allbusiness.invoiceDocument?.status ===
                                      "REJECTED"
                                    ? rejectimg
                                    : loaders
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="prof_ad_rf"
                          onClick={() => {
                            navigate("/finance/document", {
                              state: {
                                image: allbusiness?.agreement?.url,
                                type: "agreement",
                                id: state._id,
                                name: "Invoice",
                              },
                            });
                          }}
                        >
                          <div className="left-ttl-c">
                            <span className="typ_lg_vg">
                              Customer Agreement
                            </span>
                          </div>

                          <div
                            className="each_sec_lg_vg"
                            style={{
                              border: "1px solid #e7e9fb",
                            }}
                          >
                            <div className="lg-md-lf-glv">
                              <img src={document} alt="" />
                              Customer Agreement
                            </div>
                            {allbusiness?.agreement?.url ? (
                              <span className="material-icons">
                                navigate_next
                              </span>
                            ) : (
                              "Not uploaded"
                            )}
                            <div className="loader">
                              <img
                                src={
                                  allbusiness.agreement?.status === "APPROVED"
                                    ? checkbox
                                    : allbusiness.agreement?.status ===
                                      "REJECTED"
                                    ? rejectimg
                                    : loaders
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        {agreementDocument?.length !== 0 ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "16px",
                            }}
                          >
                            <span className="typ_lg_vg">
                              Lender's agreement
                            </span>
                            <div
                              className="each_sec_lg_vgs"
                              style={{
                                border: "1px solid #e7e9fb",
                                borderRadius: "8px",
                                marginTop: "-20px !important",
                              }}
                            >
                              <div className="lg-md-lf-glv">
                                <img src={document2} alt="" />
                                Lender's agreement
                              </div>

                              <span className="material-icons">
                                navigate_next
                              </span>

                              <div className="loader">
                                <img
                                  src={
                                    allSigned() === true
                                      ? checkbox
                                      : agreementDocument?.status === "rejected"
                                      ? rejectimg
                                      : loaders2
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                            {anySigned() === false && allSigned() === false ? (
                              <span
                                style={{
                                  color: "#F04438",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "19.6px",
                                }}
                              >
                                Not Signed yet
                              </span>
                            ) : (
                              ""
                            )}
                            {anySigned() === true && allSigned() === false ? (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                }}
                              >
                                <span
                                  style={{
                                    color: "#039855",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "19.6px",
                                  }}
                                >
                                  Signed.
                                </span>
                                <span
                                  style={{
                                    color: "#667085",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    lineHeight: "19.6px",
                                  }}
                                >
                                  Waiting for admin to counter-sign
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                            {/**
                            {anySigned() === true && allSigned() === false ? (
                              <>
                                <button
                                  style={{
                                    maxWidth: "280px",
                                    borderRadius: "8px",
                                    marginTop: "20px",
                                    border: "none",
                                    outline: "none",
                                    background: "#EBE4FF",
                                    padding: "16px 24px",
                                    color: "#6F00FF",
                                    textAlign: "center",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                  }}
                                >
                                  Sign Agreement
                                </button>
                              </>
                            ) : (
                              ""
                            )}
                            */}
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                    {state.customtype !== "Factoring" && (
                      <>
                        <div
                          className="prof_ad_rf"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="left-ttl-c">
                            {/**
                            <span className="typ_lg_vg">
                              {state.customtype}
                            </span>
                            */}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              className="left-ttl-c"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              <span
                                className="typ_lg_vg"
                                style={{
                                  fontWeight: "500",
                                  color: "#101828",
                                }}
                              >
                                Document Status
                              </span>
                              <span className="typ_lg_vg">
                                {allbusiness?.isSubmitted
                                  ? allbusiness?.isSubmitted.status
                                  : "Not Submitted"}
                              </span>
                            </div>
                            {allbusiness?.isSubmitted && (
                              <div
                                className="left-ttl-c"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "4px",
                                }}
                              >
                                <span
                                  className="typ_lg_vg"
                                  style={{
                                    fontWeight: "500",
                                    color: "#101828",
                                  }}
                                >
                                  Submitted Date
                                </span>
                                <span className="typ_lg_vg">
                                  {new Date(
                                    allbusiness?.isSubmitted.date
                                  ).toDateString()}
                                </span>
                              </div>
                            )}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              className="left-ttl-c"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              <span
                                className="typ_lg_vg"
                                style={{
                                  fontWeight: "500",
                                  color: "#101828",
                                }}
                              >
                                Loan Status
                              </span>
                              <span className="typ_lg_vg">
                                {allbusiness?.isAdminApproved
                                  ? allbusiness?.isAdminApproved.status
                                  : "Not Approved"}
                              </span>
                            </div>

                            <div
                              className="left-ttl-c"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              <span
                                className="typ_lg_vg"
                                style={{
                                  fontWeight: "500",
                                  color: "#101828",
                                }}
                              >
                                Approval Date
                              </span>
                              <span className="typ_lg_vg">
                                {new Date(
                                  allbusiness?.isAdminApproved?.adminDate
                                ).toDateString()}
                              </span>
                            </div>
                          </div>

                          {/**
                          {
                            allbusiness?.uploadDocuments &&  <>


                          <div className="each_sec_lg_vg"
                           onClick={() => {
                                if(allbusiness?.uploadDocuments?.LetterOfCredit?.url){


                                navigate("/finance/document", {
                                  state: {
                                    image:allbusiness?.uploadDocuments?.LetterOfCredit?.url,
                                    type: 'LetterOfCredit',
                                    id: state._id,
                                    name: allbusiness.customtype === "Credit Line" ? 'LetterOfCredit' : "TradeCredit",

                                  },
                                });
                                }
                              }}>

                            <div className="lg-md-lf-glv">
                              <img src={document} alt="" />
                              LOC.pdf - 4 MB
                            </div>



                            {
                                allbusiness?.uploadDocuments?.LetterOfCredit?.url ?  <span className="material-icons">
                                navigate_next
                              </span> : 'Not uploaded'
                              }
                            <div className="loader">
                                <img src={allbusiness.uploadDocuments?.LetterOfCredit?.status === 'APPROVED' ? checkbox : allbusiness.uploadDocuments?.LetterOfCredit?.status === 'REJECTED' ? rejectimg : loader } alt="" />

                            </div>
                          </div>
                          </>
                          }
                            */}
                        </div>

                        <div className="prof_ad_rf">
                          {allbusiness?.cashFlowSupport && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Recommended Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.cashFlowSupport
                                        ?.managementAccount?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.cashFlowSupport
                                              ?.managementAccount?.url,
                                          type: "managementAccount",
                                          id: state._id,
                                          name: "TradeCredit",
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Management Account
                                  </div>
                                  {allbusiness?.cashFlowSupport
                                    ?.managementAccount?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness.cashFlowSupport
                                          ?.managementAccount?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.cashFlowSupport
                                              ?.managementAccount?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.cashFlowSupport?.agreement
                                        ?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.cashFlowSupport
                                              ?.agreement?.url,
                                          type: "agreement",
                                          id: state._id,
                                          name: "TradeCredit",
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Agreement
                                  </div>
                                  {allbusiness?.cashFlowSupport?.agreement
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.cashFlowSupport?.agreement
                                          ?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.cashFlowSupport
                                              ?.agreement?.status === "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.cashFlowSupport
                                        ?.bankStatement?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.cashFlowSupport
                                              ?.bankStatement?.url,
                                          type: "bankStatement",
                                          id: state._id,
                                          name: "TradeCredit",
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Bank Statement
                                  </div>
                                  {allbusiness?.cashFlowSupport?.bankStatement
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.cashFlowSupport
                                          ?.bankStatement?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.cashFlowSupport
                                              ?.bankStatement?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {allbusiness?.inventoryDocuments && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Recommended Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.inventoryDocuments?.agreement
                                        ?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.inventoryDocuments
                                              ?.agreement?.url,
                                          type: "agreement",
                                          id: state._id,
                                          seg: "single",

                                          name: "TradeCredit",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Agreement
                                  </div>
                                  {allbusiness?.inventoryDocuments?.agreement
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness.inventoryDocuments
                                          ?.agreement?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.inventoryDocuments
                                              ?.agreement?.status === "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>

                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.inventoryDocuments?.invoice
                                        ?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.inventoryDocuments
                                              ?.invoice?.url,
                                          type: "invoice",
                                          id: state._id,
                                          name: "TradeCredit",
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Invoice
                                  </div>
                                  {allbusiness?.inventoryDocuments?.invoice
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.inventoryDocuments?.invoice
                                          ?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.inventoryDocuments
                                              ?.invoice?.status === "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {allbusiness?.shippingDocuments && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Recommended Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments
                                        ?.forwardingDocument?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.forwardingDocument?.url,
                                          type: "forwardingDocument",
                                          id: state._id,
                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Commercial Invoice
                                  </div>
                                  {allbusiness?.shippingDocuments
                                    ?.forwardingDocument?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness.shippingDocuments
                                          ?.forwardingDocument?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.shippingDocuments
                                              ?.forwardingDocument?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments?.airWayBill
                                        ?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.airWayBill?.url,
                                          type: "airWayBill",
                                          id: state._id,
                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    AirWay Bill
                                  </div>
                                  {allbusiness?.shippingDocuments?.airWayBill
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.airWayBill?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.shippingDocuments
                                              ?.airWayBill?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments?.insurance
                                        ?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.insurance?.url,
                                          type: "insurance",
                                          id: state._id,
                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Insurance Certificate
                                  </div>
                                  {allbusiness?.shippingDocuments?.insurance
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.insurance?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.shippingDocuments
                                              ?.insurance?.status === "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {allbusiness?.shippingDocuments && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Other Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments
                                        ?.certificateOfOrigin.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.certificateOfOrigin?.url,
                                          type: "certificateOfOrigin",
                                          id: state._id,
                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Certificate of Origin
                                  </div>
                                  {allbusiness?.shippingDocuments
                                    ?.certificateOfOrigin?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}

                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.certificateOfOrigin?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.shippingDocuments
                                              ?.certificateOfOrigin?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments
                                        ?.exportAndImportDocument?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.exportAndImportDocument?.url,
                                          type: "exportAndImportDocument",
                                          id: state._id,
                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Packing List
                                  </div>
                                  {allbusiness?.shippingDocuments
                                    ?.exportAndImportDocument?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.exportAndImportDocument?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : state?.shippingDocuments
                                              ?.exportAndImportDocument
                                              ?.status === "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments
                                        ?.exportAndImportDocument?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.packingList?.url,
                                          type: "packingList",
                                          id: state._id,
                                          seg: "single",

                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Export and Import Document
                                  </div>
                                  {allbusiness?.shippingDocuments
                                    ?.exportAndImportDocument?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.exportAndImportDocument?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : state?.shippingDocuments
                                              ?.exportAndImportDocument
                                              ?.status === "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.shippingDocuments
                                        ?.inspectionCertificate?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.shippingDocuments
                                              ?.inspectionCertificate?.url,
                                          type: "inspectionCertificate",
                                          seg: "single",

                                          id: state._id,
                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Certificate of Inspection
                                  </div>
                                  {allbusiness?.shippingDocuments
                                    ?.inspectionCertificate?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.shippingDocuments
                                          ?.inspectionCertificate?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : state?.shippingDocuments
                                              ?.inspectionCertificate
                                              ?.status === "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {allbusiness?.purchaseOrder && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Recommended Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder?.bankStatement
                                        ?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.bankStatement?.url,
                                          type: "bankStatement",
                                          id: state._id,
                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Bank Statement
                                  </div>
                                  {allbusiness?.purchaseOrder?.bankStatement
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}

                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder
                                          ?.bankStatement?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.purchaseOrder
                                              ?.bankStatement?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder
                                        ?.boardResolution?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.boardResolution?.url,
                                          type: "boardResolution",
                                          id: state._id,
                                          seg: "single",

                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Board Resolution
                                  </div>
                                  {allbusiness?.purchaseOrder?.boardResolution
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder
                                          ?.boardResolution?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.purchaseOrder
                                              ?.boardResolution?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder
                                        ?.pastPurchaseOrder?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.pastPurchaseOrder?.url,
                                          type: "pastPurchaseOrder",
                                          id: state._id,
                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Past Purchase Order
                                  </div>
                                  {allbusiness?.purchaseOrder?.pastPurchaseOrder
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder
                                          ?.pastPurchaseOrder?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.purchaseOrder
                                              ?.pastPurchaseOrder?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder?.purchaseOrder
                                        ?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.purchaseOrder?.url,
                                          type: "purchaseOrder",
                                          id: state._id,
                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Purchase Order
                                  </div>
                                  {allbusiness?.purchaseOrder?.purchaseOrder
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder
                                          ?.purchaseOrder?.status === "APPROVED"
                                          ? checkbox
                                          : state?.purchaseOrder?.purchaseOrder
                                              ?.status === "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder?.vendorLetter
                                        ?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.vendorLetter?.url,
                                          type: "vendorLetter",
                                          id: state._id,
                                          name: "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Vendor Letter
                                  </div>
                                  {allbusiness?.purchaseOrder?.vendorLetter
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder?.vendorLetter
                                          ?.status === "APPROVED"
                                          ? checkbox
                                          : allbusiness?.purchaseOrder
                                              ?.vendorLetter?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.purchaseOrder
                                        ?.contractAgreement?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.purchaseOrder
                                              ?.contractAgreement?.url,
                                          type: "contractAgreement",
                                          id: state._id,
                                          name: "TradeCredit",
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Contract Agreement
                                  </div>
                                  {allbusiness?.purchaseOrder?.contractAgreement
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.purchaseOrder
                                          ?.contractAgreement?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.purchaseOrder
                                              ?.contractAgreement?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {allbusiness?.uploadDocuments &&
                            state.customtype === "Credit Line" && (
                              <>
                                <div
                                  className="left-ttl-c"
                                  style={{
                                    marginTop: "20px",
                                  }}
                                >
                                  <span className="typ_lg_vg">
                                    Recommended Documents
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: "-20px",
                                  }}
                                >
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderBottomLeftRadius: "0px",
                                      borderBottomRightRadius: "0px",
                                      cursor:
                                        allbusiness.status !== "SUBMITTED"
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.bankStatement?.url &&
                                        allbusiness.status !== "SUBMITTED"
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.bankStatement?.url,
                                            type: "bankStatement",
                                            id: state._id,
                                            seg: "single",

                                            name: "letterOfCredit",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Bank Statement
                                    </div>
                                    {allbusiness?.uploadDocuments?.bankStatement
                                      ?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}

                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.bankStatement?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.bankStatement?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loaders
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderRadius: "0px",
                                      cursor:
                                        allbusiness.status !== "SUBMITTED"
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.boardResolution?.url &&
                                        allbusiness.status !== "SUBMITTED"
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.boardResolution?.url,
                                            type: "boardResolution",
                                            id: state._id,
                                            name: "LetterOfCredit",
                                            customtype: state.customtype,
                                            seg: "single",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Board Resolution
                                    </div>
                                    {allbusiness?.uploadDocuments
                                      ?.boardResolution?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.boardResolution?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.boardResolution?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loaders
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderRadius: "0px",
                                      cursor:
                                        allbusiness.status !== "SUBMITTED"
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.contractAgreement?.url &&
                                        allbusiness.status !== "SUBMITTED"
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.contractAgreement?.url,
                                            type: "contractAgreement",
                                            id: state._id,
                                            name: "LetterOfCredits",
                                            customtype: state.customtype,
                                            seg: "single",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Contract Agreement
                                    </div>
                                    {allbusiness?.uploadDocuments
                                      ?.contractAgreement?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.contractAgreement?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.contractAgreement?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loaders
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderRadius: "0px",
                                      cursor:
                                        allbusiness.status !== "SUBMITTED"
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.managementAccounts?.url &&
                                        allbusiness.status !== "SUBMITTED"
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.managementAccounts?.url,
                                            type: "managementAccount",
                                            id: state._id,
                                            name: "LetterOfCredit",
                                            customtype: state.customtype,
                                            seg: "single",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Management Account
                                    </div>
                                    {allbusiness?.uploadDocuments
                                      ?.managementAccounts?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.managementAccounts?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.managementAccounts?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loaders
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>

                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderTopLeftRadius: "0px",
                                      borderTopRightRadius: "0px",
                                      cursor:
                                        allbusiness.status !== "SUBMITTED"
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.schedulingExistingLoan?.url &&
                                        allbusiness.status !== "SUBMITTED"
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.schedulingExistingLoan?.url,
                                            type: "schedulingExistingLoan",
                                            id: state._id,
                                            name: "LetterOfCredit",
                                            customtype: state.customtype,
                                            seg: "single",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Scheduling Exisiting Loan
                                    </div>
                                    {allbusiness?.uploadDocuments
                                      ?.schedulingExistingLoan?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.schedulingExistingLoan?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.schedulingExistingLoan
                                                ?.status === "REJECTED"
                                            ? rejectimg
                                            : loaders
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          {allbusiness?.uploadDocuments &&
                            state.customtype !== "Credit Line" && (
                              <>
                                <div
                                  className="left-ttl-c"
                                  style={{
                                    marginTop: "20px",
                                  }}
                                >
                                  <span className="typ_lg_vg">
                                    Recommended Documents
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: "-20px",
                                  }}
                                >
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderBottomLeftRadius: "0px",
                                      borderBottomRightRadius: "0px",
                                      cursor:
                                        allbusiness.status !== "SUBMITTED"
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments
                                          ?.forwardingDocument?.url &&
                                        allbusiness.status !== "SUBMITTED"
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.forwardingDocument?.url,
                                            type: "forwardingDocument",
                                            id: state._id,
                                            name:
                                              state.customtype === "Credit Line"
                                                ? "LetterOfCredit"
                                                : "TradeCredit",
                                            customtype: state.customtype,
                                            seg: "single",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Commercial Invoice
                                    </div>
                                    {allbusiness?.uploadDocuments
                                      ?.forwardingDocument?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness.uploadDocuments
                                            ?.forwardingDocument?.status ===
                                          "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.forwardingDocument?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loaders
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderRadius: "0px",
                                      cursor:
                                        allbusiness.status !== "SUBMITTED"
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments?.airWayBill
                                          ?.url &&
                                        allbusiness.status !== "SUBMITTED"
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.airWayBill?.url,
                                            type: "airWayBill",
                                            id: state._id,
                                            name:
                                              state.customtype === "Credit Line"
                                                ? "LetterOfCredit"
                                                : "TradeCredit",
                                            customtype: state.customtype,
                                            seg: "single",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      AirWay Bill
                                    </div>
                                    {allbusiness?.uploadDocuments?.airWayBill
                                      ?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.airWayBill?.status === "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.airWayBill?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loaders
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="each_sec_lg_vg"
                                    style={{
                                      border: "1px solid #e7e9fb",
                                      borderTopLeftRadius: "0px",
                                      borderTopRightRadius: "0px",
                                      cursor:
                                        allbusiness.status !== "SUBMITTED"
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                    onClick={() => {
                                      if (
                                        allbusiness?.uploadDocuments?.insurance
                                          ?.url &&
                                        allbusiness.status !== "SUBMITTED"
                                      ) {
                                        navigate("/finance/document", {
                                          state: {
                                            image:
                                              allbusiness?.uploadDocuments
                                                ?.insurance?.url,
                                            type: "insurance",
                                            id: state._id,
                                            name:
                                              state.customtype === "Credit Line"
                                                ? "LetterOfCredit"
                                                : "TradeCredit",
                                            customtype: state.customtype,
                                            seg: "single",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="lg-md-lf-glv">
                                      <img src={document} alt="" />
                                      Insurance Certificate
                                    </div>
                                    {allbusiness?.uploadDocuments?.insurance
                                      ?.url ? (
                                      <span className="material-icons">
                                        navigate_next
                                      </span>
                                    ) : (
                                      "Not uploaded"
                                    )}
                                    <div className="loader">
                                      <img
                                        src={
                                          allbusiness?.uploadDocuments
                                            ?.insurance?.status === "APPROVED"
                                            ? checkbox
                                            : allbusiness?.uploadDocuments
                                                ?.insurance?.status ===
                                              "REJECTED"
                                            ? rejectimg
                                            : loaders
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                        </div>
                        {allbusiness?.uploadDocuments &&
                          state.customtype !== "Credit Line" && (
                            <>
                              <div
                                className="left-ttl-c"
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <span className="typ_lg_vg">
                                  Other Documents
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "-20px",
                                }}
                              >
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.uploadDocuments
                                        ?.certificateOfOrigin?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.uploadDocuments
                                              ?.certificateOfOrigin?.url,
                                          type: "certificateOfOrigin",
                                          id: state._id,
                                          name:
                                            state.customtype === "Credit Line"
                                              ? "LetterOfCredit"
                                              : "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Certificate of Origin
                                  </div>
                                  {allbusiness?.uploadDocuments
                                    ?.certificateOfOrigin?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}

                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.uploadDocuments
                                          ?.certificateOfOrigin?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : allbusiness?.uploadDocuments
                                              ?.certificateOfOrigin?.status ===
                                            "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.uploadDocuments?.packingList
                                        ?.url &&
                                      allbusiness.status !== "SUBMITTED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.uploadDocuments
                                              ?.packingList?.url,
                                          type: "packingList",
                                          id: state._id,
                                          name:
                                            state.customtype === "Credit Line"
                                              ? "LetterOfCredit"
                                              : "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Packing List
                                  </div>
                                  {allbusiness?.uploadDocuments?.packingList
                                    ?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.uploadDocuments
                                          ?.packingList?.status === "APPROVED"
                                          ? checkbox
                                          : state?.uploadDocuments?.packingList
                                              ?.status === "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="each_sec_lg_vg"
                                  style={{
                                    border: "1px solid #e7e9fb",
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                    cursor:
                                      allbusiness.status !== "SUBMITTED"
                                        ? "pointer"
                                        : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (
                                      allbusiness?.uploadDocuments
                                        ?.inspectionCertificate?.url &&
                                      allbusiness.status !== "SUBMITED"
                                    ) {
                                      navigate("/finance/document", {
                                        state: {
                                          image:
                                            allbusiness?.uploadDocuments
                                              ?.inspectionCertificate?.url,
                                          type: "inspectionCertificate",
                                          id: state._id,
                                          name:
                                            state.customtype === "Credit Line"
                                              ? "LetterOfCredit"
                                              : "TradeCredit",
                                          customtype: state.customtype,
                                          seg: "single",
                                        },
                                      });
                                    }
                                  }}
                                >
                                  <div className="lg-md-lf-glv">
                                    <img src={document} alt="" />
                                    Certificate of Inspection
                                  </div>
                                  {allbusiness?.uploadDocuments
                                    ?.inspectionCertificate?.url ? (
                                    <span className="material-icons">
                                      navigate_next
                                    </span>
                                  ) : (
                                    "Not uploaded"
                                  )}
                                  <div className="loader">
                                    <img
                                      src={
                                        allbusiness?.uploadDocuments
                                          ?.inspectionCertificate?.status ===
                                        "APPROVED"
                                          ? checkbox
                                          : state?.uploadDocuments
                                              ?.inspectionCertificate
                                              ?.status === "REJECTED"
                                          ? rejectimg
                                          : loaders
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        {agreementDocument?.length !== 0 ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "16px",
                            }}
                          >
                            <span className="typ_lg_vg">
                              Lender's agreement
                            </span>
                            <div
                              className="each_sec_lg_vgs"
                              style={{
                                border: "1px solid #e7e9fb",
                                borderRadius: "8px",
                                marginTop: "-20px !important",
                              }}
                            >
                              <div className="lg-md-lf-glv">
                                <img src={document2} alt="" />
                                Lender's agreement
                              </div>

                              <span className="material-icons">
                                navigate_next
                              </span>

                              <div className="loader">
                                <img
                                  src={
                                    allSigned() === true
                                      ? checkbox
                                      : agreementDocument?.status === "rejected"
                                      ? rejectimg
                                      : loaders2
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                            {anySigned() === false && allSigned() === false ? (
                              <span
                                style={{
                                  color: "#F04438",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "19.6px",
                                }}
                              >
                                Not Signed yet
                              </span>
                            ) : (
                              ""
                            )}
                            {anySigned() === true && allSigned() === false ? (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                }}
                              >
                                <span
                                  style={{
                                    color: "#039855",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "19.6px",
                                  }}
                                >
                                  Signed.
                                </span>
                                <span
                                  style={{
                                    color: "#667085",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    lineHeight: "19.6px",
                                  }}
                                >
                                  Waiting for admin to counter-sign
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                            {/**
                            {anySigned() === true && allSigned() === false ? (
                              <>
                                <button
                                  style={{
                                    maxWidth: "280px",
                                    borderRadius: "8px",
                                    marginTop: "20px",
                                    border: "none",
                                    outline: "none",
                                    background: "#EBE4FF",
                                    padding: "16px 24px",
                                    color: "#6F00FF",
                                    textAlign: "center",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                  }}
                                >
                                  Sign Agreement
                                </button>
                              </>
                            ) : (
                              ""
                            )}
                            */}
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </>
                )}

                {tab === "bank" && (
                  <>
                    {state.customtype === "Working Capital" && (
                      <div className="section_modl_lg">
                        <div className="bank-detail-other">
                          <div className="level-bank-details">
                            <span>Name</span>
                            <div>
                              {allbusiness?.firstName} {allbusiness?.lastName}
                            </div>
                          </div>
                          <div className="level-bank-details">
                            <span>Email</span>
                            <div>{allbusiness?.email}</div>
                          </div>
                          <div className="level-bank-details">
                            <span>Phone Number</span>
                            <div>{allbusiness?.phoneNumber}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {state.customtype === "Factoring" &&
                      state?.invoice?.invoiceItems?.map((res, index) => (
                        <div className="main-lg-request" key={index}>
                          <div className="each-request">
                            <div className="img-name">
                              <img src={factoring} alt="" />
                              <div
                                className="mytag-lg"
                                style={{
                                  gap: "0px",
                                }}
                              >
                                <div className="head-tg">{res.itemName}</div>
                                <span
                                  className="small-tg"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  Quantity : {res.quantity} Price Per Unit :{" "}
                                  {allbusiness?.currency === "NGN"
                                    ? "₦"
                                    : allbusiness?.currency === "USD"
                                    ? "$"
                                    : allbusiness?.currency === "EUR"
                                    ? "€"
                                    : "£"}
                                  {parseFloat(
                                    res.pricePerUnit
                                  ).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="mytag-lg">
                              <div
                                className="head-tg"
                                style={{
                                  color: "#344054",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  lineHeight: "19.6px",
                                  textAlign: "right",
                                }}
                              >
                                {allbusiness?.currency === "NGN"
                                  ? "₦"
                                  : allbusiness?.currency === "USD"
                                  ? "$"
                                  : allbusiness?.currency === "EUR"
                                  ? "€"
                                  : "£"}
                                {parseFloat(
                                  res.pricePerUnit * res.quantity
                                ).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}
                {tab === "repay" && (
                  <>
                    <div
                      className="section_modl_lg"
                      style={{
                        position: "relative",
                      }}
                    >
                      {success && (
                        <div
                          className="success"
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            zIndex: "9999",
                          }}
                        >
                          <div className="lg-success">
                            <div className="ech-lg-hm">
                              <div className="main-sucees">Success</div>
                              <span
                                style={{
                                  fontSize: "12px",
                                }}
                              >
                                {message}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      {fail && (
                        <div
                          className="success"
                          style={{
                            background: "#FCFCFD",
                            border: " 1px solid #D0D5DD",

                            boxSizing: "border-box",
                            zIndex: "9999",
                            width: "100%",
                          }}
                        >
                          <div className="lg-success">
                            <div
                              className="ech-lg-hm"
                              style={{
                                background: "#F9FAFB",
                              }}
                            >
                              <div
                                className="main-sucees"
                                style={{
                                  color: "#344054",
                                }}
                              >
                                Failed
                              </div>
                              <span
                                style={{
                                  color: "#344054",
                                }}
                              >
                                {message}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="bank-detail-other">
                        <div className="new_line_credit_detail">
                          <div className="each_line_credit_line">
                            <div className="line_each_dl">
                              <span className="initial_each_dl">
                                Initial Request
                              </span>
                              <span className="amount_dl">
                                {" "}
                                {state.currency === "NGN"
                                  ? "₦"
                                  : state.currency === "EUR"
                                  ? "€"
                                  : state.currency === "USD"
                                  ? "$"
                                  : "£"}
                                {allbusiness.requestedAmount}
                              </span>
                            </div>
                            <div className="line_each_dl">
                              <span className="initial_each_dl">
                                Approved Tenure
                              </span>
                              <span className="amount_dl">
                                {allbusiness.tenure} Days
                              </span>
                            </div>
                          </div>
                          <div className="each_line_credit_line">
                            <div className="line_each_dl">
                              <span className="initial_each_dl">
                                Approved Amount
                              </span>
                              <span className="amount_dl">
                                {" "}
                                {state.currency === "NGN"
                                  ? "₦"
                                  : state.currency === "EUR"
                                  ? "€"
                                  : "£"}
                                {allbusiness.loanAmount}
                              </span>
                            </div>
                            <span className="date_my_lie">
                              {new Date(state.createdAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>

                        <div className="balance_detail_lg_con">
                          <div className="level-bank-details">
                            <span>Wallet Balance</span>
                            <div
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                color: "#101828",
                                letterSpacing: "2%",
                                lineHeight: "24px",
                              }}
                            >
                              {filterwallet?.length > 0 ? (
                                <>
                                  {" "}
                                  {state.currency === "NGN"
                                    ? "₦"
                                    : state.currency === "EUR"
                                    ? "€"
                                    : "£"}
                                  {filterwallet?.map((item) => (
                                    <>
                                      {parseFloat(
                                        item?.balance
                                      ).toLocaleString()}
                                    </>
                                  ))}
                                </>
                              ) : (
                                <>{parseFloat(0).toLocaleString()}</>
                              )}
                            </div>
                          </div>
                          <div className="img_balance_logo">
                            <img
                              src={
                                state.currency === "NGN"
                                  ? NGN
                                  : state.currency === "EUR"
                                  ? US
                                  : state.currency === "GBP"
                                  ? GBP
                                  : EU
                              }
                              alt=""
                              style={{
                                height: "24px",
                                width: "24px",
                              }}
                            />
                            <span
                              className="material-icons"
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              expand_more
                            </span>
                          </div>
                        </div>
                        {allbusiness?.disbursementDate !== undefined && (
                          <div className="new_lag_repayment">
                            <span className="repaymentdetails">
                              Repayment Details
                            </span>
                            <div className="new_linw_gl">
                              <div
                                className="each_section_lp"
                                style={{
                                  borderBottom: "1px solid #E7E9FB",
                                }}
                              >
                                <div className="level-bank-details">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <span className="repayment_stage">
                                      Repayment({filterloanrepaid?.length}/
                                      {loans?.length})
                                    </span>
                                    <span className="competetion_rate">
                                      {parseFloat(
                                        filterloanrepaid?.length / loans?.length
                                      ).toFixed(2) * 100}
                                      % Complete
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      position: "relative",
                                      background: "#EAECF0",
                                      borderRadius: "20px",
                                      width: "100%",
                                      height: "16px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "absolute",
                                        background: "#12B76A",
                                        width: `calc(${parseFloat(
                                          filterloanrepaid?.length /
                                            loans?.length
                                        ).toFixed(2)} * 100%)`,
                                        height: "100%",
                                        borderRadius: "20px",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="each_section_lp"
                                style={{
                                  display: "flex",
                                  gap: "16px",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div className="level-bank-details">
                                  <span>Next Payment</span>
                                  <div>
                                    {filterloan?.length > 0 ? (
                                      <>
                                        {" "}
                                        {currencyPairCheck(state.currency)}
                                        {firstloan?.map((item) => item?.amount)}
                                      </>
                                    ) : (
                                      "Repaid fully"
                                    )}
                                  </div>
                                </div>
                                <div className="level-bank-details">
                                  <span>Next Payment On</span>
                                  <div>
                                    {filterloan?.length > 0
                                      ? firstloan?.map((item) =>
                                          new Date(item?.dueDate).toDateString()
                                        )
                                      : "Repaid fully."}
                                  </div>
                                </div>
                                <div className="level-bank-details">
                                  <span>Repayment Structure</span>
                                  <div>
                                    {" "}
                                    {state?.repaymentStructure ===
                                    "InterestFirst"
                                      ? "Interest First"
                                      : state?.repaymentStructure ===
                                        "FullPayment"
                                      ? "Full Payment"
                                      : state?.repaymentStructure}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {filterloan?.length > 0 && (
                          <button
                            className="repay-for"
                            disabled={loader}
                            type="button"
                            onClick={RepayNow}
                          >
                            {loader ? <Loading /> : "Repay Loan"}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {tab === "term" && (
                  <>
                    <div
                      className="section_modl_lg"
                      style={{
                        position: "relative",
                      }}
                    >
                      <div className="bank-detail-other">
                        <div className="level-bank-details">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <span>
                              Repayment({filterloanrepaid?.length}/
                              {loans?.length})
                            </span>
                            <span>
                              {parseFloat(
                                filterloanrepaid?.length / loans?.length
                              ).toFixed(2) * 100}
                              % Complete
                            </span>
                          </div>
                          <div
                            style={{
                              position: "relative",
                              background: "#EAECF0",
                              borderRadius: "20px",
                              width: "100%",
                              height: "16px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                background: "#12B76A",
                                width: `calc(${parseFloat(
                                  filterloanrepaid?.length / loans?.length
                                ).toFixed(2)} * 100%)`,
                                height: "100%",
                                borderRadius: "20px",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="level-bank-details">
                          <span>Next Payment</span>
                          <div>
                            {filterloan?.length > 0 ? (
                              <>
                                {" "}
                                {currencyPairCheck(state.currency)}
                                {firstloan?.map((item) => item?.amount)}
                              </>
                            ) : (
                              "Repaid fully"
                            )}
                          </div>
                        </div>
                        <div className="level-bank-details">
                          <span>Next Payment In</span>
                          <div>
                            {filterloan?.length > 0
                              ? firstloan?.map((item) =>
                                  new Date(item?.dueDate).toDateString()
                                )
                              : "Repaid fully."}
                          </div>
                        </div>
                        <div className="level-bank-details">
                          <span>Repayment Structure</span>
                          <div>{allbusiness?.repaymentStructure}</div>
                        </div>
                        {filterloan?.length > 0 && (
                          <button
                            className="repay-for"
                            disabled={loader}
                            type="button"
                            onClick={RepayNow}
                          >
                            {loader ? <Loading /> : "Repay"}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {tab === "goods" && (
                  <>
                    <div
                      className="section_modl_lg"
                      style={{
                        border: "1px solid #e7e9fb",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="bank-detail-other">
                        <div className="level-bank-details">
                          <span>Supplier Details</span>
                          <div>
                            {state?.typesOfGoods ? state.typesOfGoods : "nill"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceDetails;
