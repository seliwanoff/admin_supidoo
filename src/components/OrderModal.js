import {useEffect, useState} from "react";
import "../style/index.css";
import edit from "../assets/images/edit-2.svg";
import person from "../assets/images/person.svg";

import Additem from "../assets/images/add-circle.svg";

import Modal from "react-modal";
import { useLocation, useNavigate } from "react-router";
import document from '../assets/images/document-upload.svg'
import UserModal from "./userModal";
import PaymentTerm from "./paymentterm";
import PaymentMethod from "./paymentmethods";
import UploadInvoice from "./UploadInvoice";
import OrderItemModal from "./orderItemmodal";
import CurrencyModal from "./currencymodal";
import US from "../assets/images/EU.svg";
import NGN from "../assets/images/ngnnigeria.jpg";
import EU from "../assets/images/usds.svg";
import axios from "axios";
import Loading from "./loading";

const OrderModal = (props) => {
    const [show, setshow] = useState(false);
    const [selecteditems,setselecteditems] = useState([])
    const [selectedcurrency,setselectedcurrency] = useState([])

    const [showterm,setshowterm] = useState(false)
    const [showmethod,setshowmethod] = useState(false)
    const [showfile,setshowfile] = useState(false)
    const [showitem, setshowitem] = useState(false);
    const [showorderitem,setshowmodalitem] = useState(false)

   
    const [selectedterm,setselectedterm] = useState("Immediately on delivery")
    const [selectedmethod,setselectedmethod] = useState("Cash")
    const [file,setfile] = useState([])
    const [items,setitems] = useState([])
    const [showcurrency,setshowcurrency]=useState(false)
    const [defaultcurrency,setdefaultcurrency]  = useState('NGN')
    const [amount,setamount] = useState(0)
    const [title,settitle] = useState("")
    const [note,setnote] = useState("")
    const [loader,setloader] = useState(false)

    const [deliveryDate,setdeliveryDate] = useState(new Date())
    const closeModal = () => {
        props.setshow(false);
    };
  useEffect(()=>{
    setamount(items.reduce((a, v) => (a = a + v.pricePerUnit * v.quantity), 0));
})
//console.log(selecteditems)
const handleOrderSubmit = async(e)=>{
    e.preventDefault();
    setloader(true)
    const data = {
        title:title,
        deliveryDate: deliveryDate,
        paymentMethod : selectedmethod,
        paymentTerms: selectedterm,
        currency: defaultcurrency,
        note: note,
        orderItems:[...items],
        flexUser: selecteditems._id,
        business:selecteditems?._id
    }
    const formdata = new FormData()
    axios.post(`/v1/admin/flex/create-flex-order`, data).then((res)=>{
        props.setsucess(true)
        props.setfail(false)
        props.setmessage(res.data.message)

        if(file.length !== 0){
            formdata.append("file", file, file.name);
            //formdata.append("orderId", );
            axios
            .post(`/v1/admin/flex/purchaseOrder/${res.data.data?._id}`, formdata).then(()=>{
                props.setfail(false )
                props.setmessage(res.data?.message)
                props.setsucess(true)
                axios.get("/v1/admin/flex/get-all-orders")
                .then((res) => {
                  props.setTradeOfCredit( res.data.data);
                  props.setshow(false)
                })
                .catch((e) => {
                  console.log(e);
                });

                
            }).catch((e)=>{
                console.log(e)
                props.setfail(true)
                props.setsucess(false)
                props.message(e.response?.data ? e.repsonse?.data.message : 'An error occur')

            })
        }else{
            axios.get("/v1/admin/flex/get-all-orders")
            .then((resp) => {
               // console.log(resp)
              props.setTradeOfCredit( resp.data.data);
              props.setshow(false)
              

            })
            .catch((e) => {
              console.log(e);
            });

        }
      
    }).catch((e)=>{
        console.log(e)
        setloader(false)
        props.setfail(e.response?.data ? e.repsonse?.data.message : 'An error occur')
    })
}
  
    const customStyles = {
        content: {
         
            margin:'5% auto',
            overflow:'hidden',
            maxWidth: 'calc(100vw - 77%)',
            width:'100%'

        }
    };

    return (
      

                <Modal isOpen={
                        props.show
                    }
                    ariaHideApp={false}
                    style={customStyles}
                    contentLabel="Example Modal">
                 <UserModal show={show} setshow={setshow} closeModal={closeModal} setselecteditems={setselecteditems}/>
                 <PaymentTerm show={showterm} setshow={setshowterm} selecteditems={selectedterm} setselecteditems={setselectedterm}/>
                 <PaymentMethod show={showmethod} setshow={setshowmethod} selecteditems={selectedmethod} setselecteditems={setselectedmethod} />
                 <UploadInvoice   show={showfile} setshow={setshowfile} file={file} setfile={setfile} />
                 <OrderItemModal show={showorderitem} setshow={setshowmodalitem}  setselecteditems={setitems}/>
                 <CurrencyModal show={showcurrency} setshow={setshowcurrency} selecteditems={selectedcurrency} setselecteditems={setselectedcurrency} setdefaultcurrency={setdefaultcurrency}/>

                    <span className="material-icons"
                        onClick={closeModal}>
                        close
                    </span>
                    <form action="" className="Order_form" onSubmit={handleOrderSubmit}>
                        <h3>Create Order</h3>
                        <div className="lg-form-create">
                            <div className="info_input_slice">
                                <span>Order Title</span>
                                <input type="text" placeholder="Eg. New Arrival" onChange={(e)=>settitle(e.target.value)}/>
                            </div>
                            <div className="info_input_slice">
                                <span>Send To</span>
                                <div className="send_to_order" onClick={()=>setshow(true)}>
                                    {
                                        selecteditems!= ""   ?
                                    
                                    <div style={{
                                        display:'flex',
                                        alignItems:'center',
                                        gap:'8px'
                                    }}>
                                    <div className="inital_name">
                                        {selecteditems?.name?.slice(0,2)}
                                    </div>
                                    <div className="name_tag_lg">
                                        <div className="name_main_tag">
                                            {selecteditems?.name}
                                        </div>
                                        <span className="email_tag">
                                            {selecteditems?.user?.firstName} {" "}  {selecteditems?.user?.lastName}
                                        </span>

                                    </div>
                                    </div>
                                    : <div style={{
                                        display:'flex',
                                        alignItems:'center',
                                        gap:'8px'
                                    }}>
                                        <img src={person} alt="" />
                                       <span className="name_empty">Enter Partner's Details</span> 
                                    </div>
                                    }
                                    <img src={edit} alt="" />


                                </div>
                            </div>
                            <div className="info_input_slice">
                                <span>Expected Delivery Date</span>
                                <input type="date" placeholder="Eg. New Arrival" onChange={(e)=>setdeliveryDate(e.target.value)} />
                            </div>
                            <div className="info_input_slice">
                                <span>Payment Method</span>
                                <input type="text" value={selectedmethod} readOnly onClick={(e)=>setshowmethod(true)} />
                            </div>
                            <div className="info_input_slice">
                                <span>Payment Terms</span>
                                <input type="text" value={selectedterm} readOnly onClick={()=>setshowterm(true)}/>
                            </div>
                            <div className="info_input_slice">
                                <span>Currency</span>
                                <div className="currency_lg">
                                    <img src={defaultcurrency === 'NGN' ? NGN : defaultcurrency === 'EUR' ? US : EU} alt="" style={{
                                        width:'25px',height:'25px',marginLeft:'20px'
                                    }} />
                                    <input type="text" value={defaultcurrency} readOnly onClick={()=>setshowcurrency(true)}/>

                                </div>
                            </div>
                            <div className="info_input_slice" style={{
                                position:'relative'
                            }}>
                                <span>Order Item</span>
                                {
                                    items.length === 0 && <div className="send_to_order"   onClick={() => setshowmodalitem(true)}>
                                    <div style={{
                                        display:'flex',
                                        alignItems:'center',
                                        gap:'8px'
                                    }}>
                                    <img src={Additem} alt="" />

                                    <div className="name_tag_lg">
                                        <div className="name_main_tag_item">
                                            Add Items
                                        </div>
                                    </div>
                                    </div>


                                </div>
                                }
                                {
                                    items.length > 0 && <div className="send_to_order"   onClick={() => setshowmodalitem(true)}>
                                    <div style={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                        width:'100%'
                                    }}>
                                        <div style={{
                                             display:'flex',
                                             alignItems:'center',
                                             gap:'8px',
                                        }}>

                                      
                                    
                                    <img src={Additem} alt="" />

                                    <div className="name_tag_lg" style={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                    }}>
                                        <div className="name_main_tag_item">
                                            {items.length} Item(s) Added
                                        </div>
                                       
                                    </div>
                                    </div>
                                    <div className="name_main_tag_item">
                                    {defaultcurrency === "GPB"
                                ? "£"
                                : defaultcurrency === "NGN"
                                ? "₦"
                                : "€"}{parseFloat(amount).toLocaleString()}
                                        </div>
                                    </div>


                                </div>
                                }
                                
                            </div>
                            <div className="info_input_slice">
                                <span>Purchase Order (Optional)</span>
                                <div type="text" className="purchase_Ordder" onClick={()=>{
                                    setshowfile(true)
                                    setfile([])
                                    
                                    }}>
                                        {
                                            file.length !== 0 ? file.name : ' Upload Purchase Order'
                                        }
                                    <img src={document} alt="" />
                                </div>
                            </div>
                           
                            <div className="info_input_slice">
                                <span>Add Note</span>
                                <textarea type="text" placeholder="Eg. New Arrival" style={{
                                    height:'60px'
                                }} onChange={(e)=>setnote(e.target.value)} ></textarea>
                            </div>
                           
                            
                            

                        </div>
                        <button className="create_order_btn" type="submit" disabled={loader}>
                            {
                                loader ? <Loading/> : 'Create Order'
                            }
                        </button>
                        
                    </form>
                    
            </Modal>
          
    );
};

export default OrderModal;
