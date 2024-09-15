import { useLocation, useNavigate } from "react-router";
import HeaderAccept from "../components/headersAccept";
import RejectModal from "../components/rejectModal";
import { useEffect, useState } from "react";
import axios from "axios";
const ProofOfAddress = () => {
  const { state } = useLocation();
  const [show, setmodal] = useState(false);
  const [loader, setloader] = useState(false);
  const [success, setsucess] = useState(false);
  const [deletes, setdelete] = useState(false);
  const [message, setmessage] = useState("");
  const [reason, setreason] = useState();
  const navigate = useNavigate();

  const acceptDocument = async () => {
    setloader(true);
    const data = {
      type: state.type,
      status: "APPROVED",
    };
    await axios
      .put(`/v1/admin/verifyProofOfAddress/${state.id}`, data)
      .then((res) => {
        console.log(res);
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
    setloader(true);
    const data = {
      status: "REJECTED",
      reason: reason,
      type: state.type,
    };
    console.log(data);
    await axios
      .put(`/v1/admin/verifyProofOfAddress/${state.id}`, data)
      .then((res) => {
        console.log(res);
        setsucess(true);
        setmessage(res.data.message);
        setmodal(false);
      })
      .catch((e) => {
        // console.log(e)
        setsucess(false);
        setdelete(true);
        setmessage(e.response.data.message);
        setmodal(false);
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
        loader={loader}
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
        <div className="mg-lgbg">
          <embed
            src={`${state.image}`}
            style={{
              width: "100%",
              borderRadius: "4px",
              height: "100%",
            }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProofOfAddress;
