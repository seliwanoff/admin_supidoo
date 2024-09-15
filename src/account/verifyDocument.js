import { useLocation, useNavigate } from "react-router";
import HeaderAccept from "../components/headersAccept";
import RejectModal from "../components/rejectModal";
import { useEffect, useState } from "react";
import axios from "axios";
const VerifyDocumentTab = () => {
  const { state } = useLocation();
  const [show, setmodal] = useState(false);
  const [loader, setloader] = useState(false);
  const [success, setsucess] = useState(false);
  const [deletes, setdelete] = useState(false);
  const [message, setmessage] = useState("");
  const [reason, setreason] = useState();
  const navigate = useNavigate();
  const [loaderreject, setloaderreject] = useState(false);
  const [clickIndex, setclickIndex] = useState(-1);
  const [target, setTarget] = useState(state.bill);

  const [filteredDocuments, setFilteredDocuments] = useState(() => {
    const filtered = Object.entries(state.documents).reduce(
      (acc, [key, value]) => {
        if (value?.status !== "APPROVED") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    return { ...filtered, currentIndex: 0 };
  });
  const findKeyByObjectValues = (obj, targetValues) => {
    for (const [key, values] of Object.entries(obj)) {
      if (
        values.key === targetValues.key &&
        values?.status === targetValues?.status &&
        values.url === targetValues.url
      ) {
        return key;
      }
    }
    return null;
  };

  // console.log(keyOfTargetObject);

  const displayCurrentDocument = () => {
    const currentDocument =
      filteredDocuments[
        Object.keys(filteredDocuments)[filteredDocuments.currentIndex]
      ];

    return (
      <div className="mg-lgbg">
        <embed
          src={`${clickIndex !== -1 ? currentDocument.url : state.image}`}
          style={{
            width: "100%",
            borderRadius: "4px",
            height: "100%",
          }}
          alt=""
        />
      </div>
    );
  };
  const keyOfTargetObject = findKeyByObjectValues(
    filteredDocuments,
    displayCurrentDocument
  );
  // console.log(keyOfTargetObject);
  const nextDocument = () => {
    setclickIndex(0);

    if (
      filteredDocuments.currentIndex <
      Object.keys(filteredDocuments).length - 1
    ) {
      setFilteredDocuments((prevState) => ({
        ...prevState,
        currentIndex: prevState.currentIndex + 1,
      }));
    }
  };

  const previousDocument = () => {
    setclickIndex(0);
    if (filteredDocuments.currentIndex > 0) {
      setFilteredDocuments((prevState) => ({
        ...prevState,
        currentIndex: prevState.currentIndex - 1,
      }));
    }
  };
  const acceptDocument = async () => {
    setloader(true);
    const data = {
      documentType: state.type,
      status: "APPROVED",
      businessType: state.businessType,
    };
    await axios
      .put(`/v1/admin/verifyDocument/${state.id}`, data)
      .then((res) => {
        setsucess(true);
        setmessage(res.data.message);
        setloader(false);
      })
      .catch((e) => {
        setloader(false);
        setdelete(true);

        setsucess(false);
        setmessage(e.response.data.message);
        console.log(e);
      });
  };
  const rejectHandler = async () => {
    setloaderreject(true);
    const data = {
      documentType: clickIndex !== -1 ? target : state.type,
      status: "REJECTED",
      businessType: state.businessType,
      reason: reason,
    };
    // console.log(data)
    await axios
      .put(`/v1/admin/verifyDocument/${state.id}`, data)
      .then((res) => {
        setmodal(false);
        setsucess(true);
        setmessage(res.data.message);
        setloaderreject(false);
        setdelete(false);
      })
      .catch((e) => {
        setsucess(false);
        setdelete(true);
        setloaderreject(false);
        setmessage(e.response.data.message);
      });
  };
  useEffect(() => {
    if (success) {
      var timeout = setTimeout(() => {
        setsucess(false);
        navigate(-1);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });
  useEffect(() => {
    if (deletes) {
      var timeout = setTimeout(() => {
        setdelete(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className="">
      <RejectModal
        show={show}
        setmodal={setmodal}
        rejectHandler={rejectHandler}
        setreason={setreason}
        loader={loaderreject}
      />

      <HeaderAccept
        bill={state.type}
        name={state.name}
        setmodal={setmodal}
        acceptDocument={acceptDocument}
        setloader={setloader}
        loader={loader}
      />

      <div
        className="main_bd_lg"
        style={{
          position: "relative",
        }}
      >
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
                  Deleted
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
        {displayCurrentDocument()}
      </div>
      <div className="footer_col">
        <div className="previous btn-go" onClick={nextDocument}>
          <span className="material-icons">chevron_left</span>
          <span>Previous document</span>
        </div>
        <div className="previous btn-go" onClick={previousDocument}>
          <span>Next document</span>
          <span className="material-icons">chevron_right</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyDocumentTab;
