import { useLocation, useNavigate } from "react-router";
//import HeaderAccept from "../components/headersAccept";
import RejectModal from "../components/rejectModal";
import { useState } from "react";
import PasswordModal from "../components/passwordModal";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../components/loader";
import FXHeader from "../components/fxheader";
const PaymentViewDocument = () => {
  const { state } = useLocation();
  const [show, setmodal] = useState(false);
  const [show2, setmodal2] = useState(false);
  const [loader, setloader] = useState();
  const [reason, setreason] = useState("");
  const [success, setsucess] = useState(false);
  const [deletes, setdelete] = useState(false);
  const [message, setmessage] = useState("");
  const [rejectloader, setrejectloader] = useState(false);
  const [pendingDocuments, setPendingDocuments] = useState([]);
  const [allbusiness, setallbusiness] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const goNextPage = () => {
    if (pendingDocuments.length === 0) {
      navigate(-1);
    }
  };
  // console.log(state);
  const getnewDocumentRequest = async () => {
    setisLoading(true);
    if (state.customtype === "Working Capital") {
      await axios
        .get(
          `/v1/admin/get-single-finance-trade-credit/${
            state?.newdata?._id !== undefined ? state.newdata._id : state.id
          }`
        )
        .then((res) => {
          setallbusiness(res.data.data);
          if (res.data.data.type === "purchaseOrder") {
            setallbusiness(res.data.data);
            const filteredDocuments = Object.values(
              res.data.data.purchaseOrder
            ).filter((doc) => !doc?.hasOwnProperty("status"));
            setPendingDocuments(filteredDocuments);
          } else if (res.data.data.type === "shippingDocuments") {
            setallbusiness(res.data.data);
            const filteredDocuments = Object.values(
              res.data.data.shippingDocuments
            ).filter((doc) => !doc?.hasOwnProperty("status"));
            setPendingDocuments(filteredDocuments);
          } else if (res.data.data.type === "inventoryDocuments") {
            setallbusiness(res.data.data);
            const filteredDocuments = Object.values(
              res.data.data.inventoryDocuments
            ).filter((doc) => !doc?.hasOwnProperty("status"));
            setPendingDocuments(filteredDocuments);
          }
          setisLoading(false);
        })
        .catch((e) => {
          //   console.log(e);
        });
    } else if (state.customtype === "Credit Line") {
      await axios
        .get(
          `/v1/admin/get-single-finance-credit-line/${
            state?.newdata?._id !== undefined ? state.newdata._id : state.id
          }`
        )
        .then((res) => {
          setallbusiness(res.data.data);
          const filteredDocuments = Object.values(
            res.data.data.uploadDocuments
          ).filter((doc) => doc.status === "PENDING");
          setPendingDocuments(filteredDocuments);
          setisLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      await axios
        .get(
          `/v1/admin/get-single-finance-invoice/${
            state?.newdata?._id !== undefined ? state.newdata._id : state.id
          }`
        )
        .then((res) => {
          setallbusiness(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  // console.log(state.image);
  // console.log(pendingDocuments);
  useEffect(() => {
    const fetchTransaction = async () => {
      if (state.customtype === "Working Capital") {
        await axios
          .get(
            `/v1/admin/get-single-finance-trade-credit/${
              state?.newdata?._id !== undefined ? state.newdata._id : state.id
            }`
          )
          .then((res) => {
            // console.log(res);
            if (res.data.data.type === "purchaseOrder") {
              setallbusiness(res.data.data);
              const filteredDocuments = Object.values(
                res.data.data.purchaseOrder
              ).filter((doc) => !doc?.hasOwnProperty("status"));
              // console.log(filteredDocuments);
              setPendingDocuments(filteredDocuments);
            } else if (res.data.data.type === "shippingDocuments") {
              setallbusiness(res.data.data);
              const filteredDocuments = Object.values(
                res.data.data.shippingDocuments
              ).filter((doc) => !doc?.hasOwnProperty("status"));
              // console.log(filteredDocuments);
              setPendingDocuments(filteredDocuments);
            } else if (res.data.data.type === "inventoryDocuments") {
              setallbusiness(res.data.data);
              const filteredDocuments = Object.values(
                res.data.data.inventoryDocuments
              ).filter((doc) => !doc?.hasOwnProperty("status"));
              // console.log(filteredDocuments);
              setPendingDocuments(filteredDocuments);
            } else if (res.data.data.type === "cashFlowSupport") {
              setallbusiness(res.data.data);
              const filteredDocuments = Object.values(
                res.data.data.cashFlowSupport
              ).filter((doc) => !doc?.hasOwnProperty("status"));
              // console.log(filteredDocuments);
              setPendingDocuments(filteredDocuments);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (state.customtype === "Credit Line") {
        await axios
          .get(
            `/v1/admin/get-single-finance-credit-line/${
              state?.newdata?._id !== undefined ? state.newdata._id : state.id
            }`
          )
          .then((res) => {
            setallbusiness(res.data.data);
            const filteredDocuments = Object.values(
              res.data.data.uploadDocuments
            ).filter((doc) => doc.status === "PENDING");
            setPendingDocuments(filteredDocuments);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await axios
          .get(
            `/v1/admin/get-single-finance-invoice/${
              state?.newdata?._id !== undefined ? state.newdata._id : state.id
            }`
          )
          .then((res) => {
            setallbusiness(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };

    fetchTransaction();
  }, [state.customtype]);
  //console.log(state);

  useEffect(() => {
    if (allbusiness._id !== undefined) {
      if (pendingDocuments.length === 0) {
        if (state.seg === "single") {
        } else {
          navigate(-1);
        }
      }
    }
  }, [allbusiness]);

  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);

  const displayCurrentDocument = () => {
    const currentDocument = pendingDocuments[currentDocumentIndex];

    // console.log(currentDocument);
  };
  // console.log(currentDocumentIndex);
  const showNextDocument = () => {
    goNextPage();
    setCurrentDocumentIndex(currentDocumentIndex);
    getnewDocumentRequest();
  };

  const showPreviousDocument = () => {
    setCurrentDocumentIndex(
      (prevIndex) =>
        (prevIndex - 1 + pendingDocuments.length) % pendingDocuments.length
    );
    getnewDocumentRequest();
  };

  const renderDocument = () => {
    if (state?.seg === "single") {
      return state.type;
    } else {
      if (state?.customtype === "Credit Line") {
        const uploadDocuments = allbusiness.uploadDocuments;
        for (const key in uploadDocuments) {
          if (uploadDocuments[key].status === "PENDING") {
            // console.log(key);
            return key;
          }
        }
      } else if (state?.customtype === "Working Capital") {
        if (allbusiness.type === "purchaseOrder") {
          const uploadDocuments = allbusiness.purchaseOrder;
          for (const key in uploadDocuments) {
            if (!uploadDocuments[key].hasOwnProperty("status")) {
              return key;
            }
          }
        }
        if (allbusiness.type === "shippingDocuments") {
          const uploadDocuments = allbusiness.shippingDocuments;
          for (const key in uploadDocuments) {
            if (!uploadDocuments[key].hasOwnProperty("status")) {
              return key;
            }
          }
        }
        if (allbusiness.type === "inventoryDocuments") {
          const uploadDocuments = allbusiness.inventoryDocuments;
          for (const key in uploadDocuments) {
            if (!uploadDocuments[key].hasOwnProperty("status")) {
              return key;
            }
          }
        }
        if (allbusiness.type === "cashFlowSupport") {
          const uploadDocuments = allbusiness.cashFlowSupport;
          for (const key in uploadDocuments) {
            if (!uploadDocuments[key].hasOwnProperty("status")) {
              return key;
            }
          }
        }
      }
    }
  };
  useEffect(() => {
    displayCurrentDocument();
  }, [pendingDocuments, currentDocumentIndex]);

  useEffect(() => {
    if (deletes || success) {
      var timeout = setTimeout(() => {
        setdelete(false);
        setsucess(false);
        if (state?.seg === "single") {
          navigate(-1);
        }
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  const rejectHandler = async () => {
    if (state.name === "TradeCredit") {
      setrejectloader(true);
      const data = {
        documentType: state?.type,
        status: "REJECTED",
        reason: reason,
      };
      await axios
        .put(`/v1/admin/verifyFinanceTradeCreditDocument/${state.id}`, data)
        .then((res) => {
          //showNextDocument();

          setmessage(res.data.message);
          setsucess(true);
          setdelete(false);
          setrejectloader(false);
          setmodal(false);
        })
        .catch((e) => {
          setmessage(
            e.response?.data.message
              ? e.response?.data.message
              : "An error occur"
          );
          setsucess(true);
          setdelete(false);
          setrejectloader(false);
          setmodal(false);
        });
    } else if (
      state.name === "LetterOfCredit" ||
      state.name === "letterOfCredit" ||
      state.name === "LetterOfCredits"
    ) {
      setrejectloader(true);
      const data = {
        documentType: state?.type,
        status: "REJECTED",
        reason: reason,
      };
      await axios
        .put(`/v1/admin/verifyFinanceCreditLineDocument/${state.id}`, data)
        .then((res) => {
          // showNextDocument();

          setmessage(res.data.message);
          setmodal(false);

          setsucess(true);
          setdelete(false);
          setrejectloader(false);
        })
        .catch((e) => {
          setmessage(
            e.response?.data.message
              ? e.response?.data.message
              : "An error occur"
          );
          setsucess(true);
          setdelete(false);
          setrejectloader(false);
          setmodal(false);
        });
    } else if (state.name === "Invoice") {
      setrejectloader(true);

      const data = {
        documentType:
          state?.type === "invoice" ? "invoiceDocument" : "agreement",
        status: "REJECTED",
        reason: reason,
      };
      await axios
        .put(`/v1/admin/verifyFinanceInvoiceDocument/${state.id}`, data)
        .then((res) => {
          // console.log(res);
          // showNextDocument();

          setmessage(res.data.message);
          setsucess(true);
          setdelete(false);
          setrejectloader(false);
          setmodal(false);
        })
        .catch((e) => {
          setmessage(
            e.response?.data.message
              ? e.response?.data.message
              : "An error occur"
          );
          setsucess(true);
          setdelete(false);
          setrejectloader(false);
          setmodal(false);
        });
    }
  };
  const acceptDocument = async () => {
    if (state.name === "TradeCredit") {
      setloader(true);
      const data = {
        documentType: renderDocument(),
        status: "APPROVED",
      };
      await axios
        .put(`/v1/admin/verifyFinanceTradeCreditDocument/${state.id}`, data)
        .then((res) => {
          //  showNextDocument();
          setmessage(res.data.message);
          setsucess(true);
          setdelete(false);
          setloader(false);
        })
        .catch((e) => {
          setmessage(
            e.response?.data.message
              ? e.response?.data.message
              : "An error occur"
          );
          setsucess(true);
          setdelete(false);
          setloader(false);
        });
    } else if (
      state.name === "letterOfCredit" ||
      state.name === "LetterOfCredit" ||
      state.name === "LetterOfCredits"
    ) {
      setloader(true);
      const data = {
        documentType: renderDocument(),
        status: "APPROVED",
      };
      await axios
        .put(`/v1/admin/verifyFinanceCreditLineDocument/${state.id}`, data)
        .then((res) => {
          //  showNextDocument();

          setmessage(res.data.message);
          setsucess(true);
          setdelete(false);
          setloader(false);
        })
        .catch((e) => {
          setmessage(
            e.response?.data.message
              ? e.response?.data.message
              : "An error occur"
          );
          setsucess(true);
          setdelete(false);
          setloader(false);
        });
    } else if (state.name === "Invoice") {
      setloader(true);
      const data = {
        documentType:
          renderDocument() === "invoice" ? "invoiceDocument" : "agreement",

        status: "APPROVED",
      };
      await axios
        .put(`/v1/admin/verifyFinanceInvoiceDocument/${state.id}`, data)
        .then((res) => {
          // showNextDocument();

          setmessage(res.data.message);
          setsucess(true);
          setdelete(false);
          setloader(false);
        })
        .catch((e) => {
          setmessage(
            e.response?.data.message
              ? e.response?.data.message
              : "An error occur"
          );
          setsucess(true);
          setdelete(false);
          setloader(false);
        });
    }
  };

  return (
    <div className="">
      <RejectModal
        show={show}
        setmodal={setmodal}
        setreason={setreason}
        rejectHandler={rejectHandler}
        loader={rejectloader}
      />
      <PasswordModal show={show2} setmodal={setmodal2} />

      <FXHeader
        setloader={setloader}
        loader={loader}
        bill={renderDocument()}
        name={state?.name}
        setmodal2={setmodal2}
        setmodal={setmodal}
        acceptDocument={acceptDocument}
      />

      <div className="main_bd_lg">
        {success && (
          <div className="success">
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

        {deletes && (
          <div
            className="success"
            style={{
              background: "#FCFCFD",
              border: " 1px solid #D0D5DD",
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
        <div className="mg-lgbg">
          {isLoading === false ? (
            <embed
              src={`${
                state?.seg === "single"
                  ? state?.image
                  : pendingDocuments[currentDocumentIndex]?.url
              }`}
              // src={state.image}
              style={{
                width: "100%",
                borderRadius: "4px",
                height: "100%",
              }}
              alt=""
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div className="footer_col">
        <div
          style={{
            cursor: state.seg === "single" ? "not-allowed" : "pointer",
          }}
          className="previous btn-go"
          onClick={() => {
            if (state?.seg === "single") {
            } else {
              showPreviousDocument();
            }
          }}
        >
          <span className="material-icons">chevron_left</span>
          <span>Previous document</span>
        </div>
        {pendingDocuments.length > 0 && (
          <div
            style={{
              cursor: state.seg === "single" ? "not-allowed" : "pointer",
            }}
            className="previous btn-go"
            onClick={() => {
              if (state?.seg === "single") {
              } else {
                showNextDocument();
              }
            }}
          >
            <span>Next document</span>
            <span className="material-icons">chevron_right</span>
          </div>
        )}
        {pendingDocuments.length === 0 && (
          <div
            className="previous btn-go"
            onClick={() => {
              goNextPage();
            }}
          >
            <span>Continue</span>
            <span className="material-icons">chevron_right</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentViewDocument;
