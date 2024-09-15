import axios from "axios";
import Loading from "./loading";
import mark  from '../assets/images/bluesuccess.svg'
import trash from '../assets/images/trash.png'

import { useState } from "react";

const OrderItemModal = (props) => {
    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        props.setInterest()
    }
    const addanothersection = () => {
        const data = {
          itemName: "",
          quantity: 0,
          pricePerUnit: 0,
          // amount: 0,
          //  currency: selectedcurrency.title,
        };
        setitems((current) => [...current, data]);
      };
    const [items, setitems] = useState([
        {
          itemName: "",
    
          quantity: 0,
    
          pricePerUnit: 0,
    
          
        },
      ]);
      const delitems = (index) => {
        setitems([...items.slice(0, index)]);
      };
      const updateitemprice = (e, indexs, q) => {
        // setitems([...items.indexOf()])
    
        const newState = items.map((obj, index) => {
          if (index === indexs) {
            return {
              ...obj,
              pricePerUnit: e.target.value,
              // amount: q * e.target.value,
            };
          }
          return obj;
        });
        setitems(newState);
      };
      const updateitemquantity = (e, indexs, p) => {
        // setitems([...items.indexOf()])
    
        const newState = items.map((obj, index) => {
          if (index === indexs) {
            return {
              ...obj,
              quantity: e.target.value,
              //amount: e.target.value * p,
            };
          }
          return obj;
        });
    
        setitems(newState);
      };
      const updateitemitems = (e, indexs) => {
        // setitems([...items.indexOf()])
    
        const newState = items.map((obj, index) => {
          if (index === indexs) {
            return {
              ...obj,
              itemName: e.target.value,
            };
          }
          return obj;
        });
    
        setitems(newState);
      };

  return (
    <>
    {
        props.show && <>
      <div className="wrapper" onClick={()=>{
        alert()
        props.setshow(false)
      }}>Modal</div>
      <div id="demo-modal" className="modal" style={{
        zIndex:'999'
      }}>

        <div className="modal__content"  style={{
            background:'#F6F6F6',
            padding:'8px 24px',
            zIndex:'999999',
            maxWidth:'630px',
            width:'100%'
        }}>
            <div className="header-modal-content">
                <span className="material-icons" style={{cursor:'pointer'}} onClick={()=>props.setshow(false)}>close</span>

            </div>
            <div className="modal-body-top">
                <h4>Add Order Items</h4>
                <div className="modal_drop_down" style={{
                    padding:'20px'
                }}>
              {
                    items.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "8px",
                          boxSizing:'border-box'
                        }}
                      >
                        <div
                          className=""
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexDirection: "column",
                            width: "calc((100% / 3) - 10px)",
                          }}
                        >
                          <span
                            htmlFor=""
                            style={{
                              color: "#344054",
                              fontWeight: "500",
                              lineHeight: "19.6px",
                              fontSize: "14px",
                            }}
                          >
                            Items
                          </span>
                            <input
                              type="text"
                              name=""
                              id=""
                              required
                              onChange={(e) => updateitemitems(e, index)}
                              style={{
                               
                                borderRadius: "8px",
                                border: "none",
                                outline: "none",
                                textTransform: "none",

                                height: "46px",
                                background: "",
                                padding: "8px 16px 8px 16px",
                                backgroundColor: "#ECEFF3",
                                letterSpacing: "2%",
                                fontWeight: "400",
                                fontSize: "16px",
                              }}
                              placeholder="Add item name"
                            />
                          </div>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexDirection: "column",
                            width: "calc((100% / 3) - 10px)",
                          }}
                        >
                          <span
                            htmlFor=""
                            style={{
                              color: "#344054",
                              fontWeight: "400",
                              lineHeight: "19.6px",
                              fontSize: "14px",
                            }}
                          >
                            Quantity
                          </span>
                        
                            <input
                              type="number"
                              name=""
                              id=""
                              required
                              onChange={(e) =>
                                updateitemquantity(e, index, item.pricePerUnit)
                              }
                              style={{
                               
                                borderRadius: "8px",
                                textTransform: "none",

                                border: "none",
                                height: "46px",
                                outline: "none",
                                background: "",
                                padding: "8px 16px 8px 16px",
                                backgroundColor: "#ECEFF3",
                                letterSpacing: "2%",
                                fontWeight: "400",
                                fontSize: "16px",
                              }}
                              placeholder="1"
                            />
                          
                        </div>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexDirection: "column",
                            width: "calc((100% / 3) - 10px)",
                          }}
                        >
                          <span
                            htmlFor=""
                            style={{
                              color: "#344054",
                              fontWeight: "500",
                              lineHeight: "19.6px",
                              fontSize: "14px",
                            }}
                          >
                            Unit Price
                          </span>
                            <input
                              type="number"
                              name=""
                              id=""
                              onChange={(e) =>
                                updateitemprice(e, index, item.quantity)
                              }
                              style={{
                             
                                borderRadius: "8px",
                                border: "none",
                                height: "46px",
                                textTransform: "none",
                                outline: "none",
                                background: "",
                                padding: "8px 16px 8px 16px",
                                backgroundColor: "#ECEFF3",
                                letterSpacing: "2%",
                                fontWeight: "400",
                                fontSize: "16px",
                              }}
                              required
                              placeholder="Unit price"
                            />
                          </div>
                        
                        {items.length > 1 && (
                          <div style={{ padding: "40px 0px" }}>
                            <img
                              src={trash}
                              alt=""
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                delitems(index);
                              }}
                            />
                          </div>
                        )}{" "}
                         
                      </div>
                    
                    ))}
                </div>
                <div
                    style={{
                      display: "flex",
                      color: "#6F00FF",
                      fontWeight: "500",
                      lineHeight: "19.6px",
                      fontSize: "14px",
                      letterSpacing: "2%",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      marginTop:'-20px',
                      marginBottom:'20px'
                    }}
                    onClick={addanothersection}
                  >
                    <span className="material-icons">add</span>
                    Add another item
                  </div>
                  <button className="btn-flex-order" style={{
                    maxWidth:'200px',
                    display:'flex',
                    justifyContent:'center',
                    marginBottom:'10px'
                  }} 
                  onClick={()=>{
                    props.setselecteditems(items)
                    props.setshow(false)

                }}
                  >
                    Continue
                  </button>
              

            </div>
        </div>
      </div>
      </>
    }
    </>
    
  );
};

export default OrderItemModal;
