import { useNavigate } from "react-router";
import Loading from "./loading";

const FXHeader = (props) => {
  const rejectHandler = () => {
    props.setmodal(true);
  };
  const showPassword = () => {
    props.setloader(true);
    props.acceptDocument();
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="main_proof_header">
        <div className="main_cl_pg">
          <div className="mg_kg_lj">
            <span className="material-icons" onClick={() => navigate(-1)}>
              close
            </span>
            <h3>{props.bill}</h3>
          </div>
          <div className="business_tg_lg_yf" style={{ textAlign: "center" }}>
            {props?.name === "TradeCredit"
              ? "Working Capital"
              : props?.name === "LetterOfCredits"
              ? "Credit Line"
              : props?.name === "letterOfCredit"
              ? "Credit Line"
              : props?.name === "LetterOfCredit"
              ? "Credit Line"
              : props.name === "Finance"
              ? "Finance"
              : ""}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default FXHeader;
