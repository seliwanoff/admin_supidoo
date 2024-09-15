import mark from "../assets/images/bluesuccess.svg";
import { useState } from "react";
import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
import GB from "../assets/images/GB.svg";

const CurrencyModal2 = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    props.setInterest();
  };
  const [currencciess] = useState([
    {
      img: NGN,
      name: "NGN",
      title: "NG Naira",
    },
    {
      img: GB,
      name: "GBP",
      title: " British Pounds",
    },

    {
      img: US,
      name: "EUR",
      title: "Euro",
    },
    {
      img: EU,
      name: "USD",
      title: "USD Dollar",
    },
  ]);
  const [selectedindex, setselectedindex] = useState(0);

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
            <div
              className="modal__content"
              style={{
                background: "#F6F6F6",
                padding: "8px 24px",
                zIndex: "999999",
              }}
            >
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
                <h4>Choose Currency</h4>
                <div className="modal_drop_down">
                  {currencciess.map((item, index) => (
                    <div
                      className="each_item_list"
                      key={index}
                      onClick={() => {
                        props.setselecteditems(item);
                        setselectedindex(index);
                        props.setshow(false);
                        props?.setdefaultcurrency(item.name);
                        props.getdetailbytype(item.name);
                        // props?.fetchMetrics();
                      }}
                      style={{
                        background:
                          selectedindex === index && "rgb(244, 240, 255)",
                        margin: "4px",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <img
                          src={item.img}
                          alt=""
                          style={{ width: "25px", height: "25px" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <span>{item.title}</span>
                          <span>{item.name}</span>
                        </div>
                      </div>
                      {selectedindex === index && <img src={mark} alt="" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CurrencyModal2;
