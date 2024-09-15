import axios from "axios";
import Loading from "./loading";
import { useState } from "react";
import currencyList from "./currencylist";

const UpdateCurrency = (props) => {
  // console.log(props);
  const [baseCurrency] = useState(1);

  // const [initial, setInitial] = useState(props.pairs.baseCurrencyRate);
  const updateamount = (e) => {
    props.setbaseRate(e.target.value);
    // setInitial(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    props.setInterest();
  };
  return (
    <>
      {props.show && (
        <>
          <div
            className="wrapper"
            onClick={() => {
              props.setshow(false);
            }}
          >
            Modal
          </div>
          <div
            id="demo-modal"
            className="modal"
            style={{
              zIndex: "999",
            }}
          >
            <div className="modal__content">
              <div className="header-modal-content">
                <span
                  className="material-icons"
                  style={{ cursor: "pointer" }}
                  onClick={() => props.setshow(false)}
                >
                  close
                </span>
              </div>
              <div className="modal-body-top">
                <h4> {props.tag}</h4>
                <form action="" className="form-lg-sec" onSubmit={handleSubmit}>
                  <div className="each-form-lg-sect">
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <div
                        className="each_pair_details "
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#667085",
                          fontWeight: "500",
                          fontSize: "16px",
                          lineHeight: "24px",
                          padding: "8px 16px",
                        }}
                      >
                        <img
                          src={currencyList(props.pairs.quoteCurrency).img}
                          alt=""
                          height={20}
                          width={20}
                        />
                        {currencyList(props.pairs.quoteCurrency).name}
                      </div>
                      <input
                        className="main-form-eeach-sec"
                        type="text"
                        name=""
                        readOnly
                        style={{
                          width: "100%",
                          border: "none",
                          display: "flex",
                          outline: "none",
                          color: "#98A2B3",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                        id=""
                        value={baseCurrency}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <div
                        className="each_pair_details "
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#667085",
                          fontWeight: "500",
                          fontSize: "16px",
                          lineHeight: "24px",
                          padding: "8px 16px",
                        }}
                      >
                        <img
                          src={currencyList(props.pairs.baseCurrency).img}
                          alt=""
                          height={20}
                          width={20}
                        />
                        {currencyList(props.pairs.baseCurrency).name}
                      </div>
                      <input
                        className="main-form-eeach-sec"
                        type="text"
                        name=""
                        style={{
                          width: "100%",
                          border: "none",
                          display: "flex",
                          outline: "none",
                          color: "#101828",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                        id=""
                        onChange={(e) => {
                          updateamount(e);
                          //    props.setbaseRate(e.target.value);
                        }}
                        value={props.baseRate}
                      />
                    </div>
                  </div>
                  <button
                    className="save-btn-changes"
                    disabled={props.loader}
                    style={{
                      background: props.loader === false && "rgb(111, 0, 255)",
                      color: "#fff",
                      fontWeight: "600",
                    }}
                  >
                    {props.loader ? <Loading /> : "Save Changes"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateCurrency;
