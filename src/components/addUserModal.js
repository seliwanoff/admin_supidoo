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
import UserTypeModal from "./userTypeModal";
import TradevuUser from "./Tradevuuser";

const AddUserModal = (props) => {
    const [show, setshow] = useState(false);
    const [selecteditems,setselecteditems] = useState([])
    const [selectedcurrency,setselectedcurrency] = useState([])

    const [showterm,setshowterm] = useState(false)
    const [showmethod,setshowmethod] = useState(false)
    const [showfile,setshowfile] = useState(false)
    const [showitem, setshowitem] = useState(false);
    const [showorderitem,setshowmodalitem] = useState(false)

   
    const [selectedterm,setselectedterm] = useState("Immediately on delivery")
    const [selectedmethod,setselectedmethod] = useState("Buyer")
    const [file,setfile] = useState([])
    const [items,setitems] = useState([])
    const [showcurrency,setshowcurrency]=useState(false)
    const [defaultcurrency,setdefaultcurrency]  = useState('NGN')
    const [firstname,setfirstname] = useState("")
    const [lastname,setlastname] = useState("")
    const [email,setemail] = useState("")
    const [loader,setloader] = useState(false)
    const [phoneNumber,setphone] = useState("")
    const [business,setbusinessname] = useState("")

  //  const [deliveryDate,setdeliveryDate] = useState(new Date())
    const closeModal = () => {
        props.setshow(false);
    };
  
const handleOrderSubmit = async(e)=>{
    e.preventDefault();
    setloader(true)
    const data = {
        firstName:firstname,
        lastName: lastname,
        phoneNumber : phoneNumber,
        email: email,
        businessName: business,

        flexUserType:selecteditems.length > 0 ? selecteditems._id.toLocaleLowerCase() : selectedmethod.toLocaleLowerCase(),
    }
  
   // const formdata = new FormData()
    axios.post(`/v1/admin/flex/create-flex-users` , data).then((res)=>{
        props.setsucess(true)
        props.setfail(false)
        props.setmessage(res.data.message)
        setfirstname("")
        setlastname("")
        setemail("")
        setphone("")
        setbusinessname("")
        setselecteditems([])
        setloader(false)
        

        axios.get("/v1/admin/flex/get-all-flex-users")
            .then((resp) => {
               // console.log(resp)
              props.setTradeOfCredit( resp.data.data);
              props.setshow(false)
              

            })
            .catch((e) => {
              console.log(e);
            });

        
      
    }).catch((e)=>{
        console.log(e)
        setloader(false)
        props.setfail(true)
        props.message(e.response?.data ? e.repsonse?.data.message : 'An error occur')
    })
}
  
    const customStyles = {
        content: {
         
            margin:'5% auto',
            overflow:'hidden',
            height:'100%',
            overflow:'auto',
            width:'100%',
            minHeight:'720px',
            maxHeight:'614px',
            maxWidth: 'calc(100vw - 77%)'
        }
    };

    return (
      

                <Modal isOpen={
                        props.show
                    }
                    ariaHideApp={false}
                    style={customStyles}
                    contentLabel="Example Modal">
                 <TradevuUser show={show} setshow={setshow} closeModal={closeModal} setselecteditems={setselecteditems}
                 setfirstname={setfirstname} setlastname={setlastname} setemail={setemail} setbusinessname={setbusinessname} setphone={setphone}
                 />
                 <PaymentTerm show={showterm} setshow={setshowterm} selecteditems={selectedterm} setselecteditems={setselectedterm}/>
                 <UserTypeModal show={showmethod} setshow={setshowmethod} selecteditems={selectedmethod} setselecteditems={setselectedmethod} />
                 <UploadInvoice   show={showfile} setshow={setshowfile} file={file} setfile={setfile} />
                 <OrderItemModal show={showorderitem} setshow={setshowmodalitem}  setselecteditems={setitems}/>
                 <CurrencyModal show={showcurrency} setshow={setshowcurrency} selecteditems={selectedcurrency} setselecteditems={setselectedcurrency} setdefaultcurrency={setdefaultcurrency}/>

                    <span className="material-icons"
                        onClick={closeModal}>
                        close
                    </span>
                    <form action="" className="Order_form" onSubmit={handleOrderSubmit}>
                        <h3>Add New Partner</h3>
                        <div className="lg-form-create">
                            <div className="info_input_slice">
                                <input type="text" placeholder="Firstname" value={firstname} onChange={(e)=>setfirstname(e.target.value)}/>
                            </div>
                            <div className="info_input_slice">
                                <input type="text" placeholder="Last name" value={lastname} onChange={(e)=>setlastname(e.target.value)}/>
                            </div>
                            <div className="info_input_slice">
                                <input type="text" placeholder="Business name" value={business} onChange={(e)=>setbusinessname(e.target.value)}/>
                            </div>
                            <div className="info_input_slice">
                                <input type="text" placeholder="Email Address" value={email} onChange={(e)=>setemail(e.target.value)}/>
                            </div>
                            <div className="info_input_slice">
                                <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e)=>setphone(e.target.value)}/>
                            </div>
                            <div className="info_input_slice">
                                <input type="text" placeholder="User Type" value={selectedmethod} readOnly onClick={(e)=>setshowmethod(e.target.value)}/>
                            </div>
                            <div className="info_input_slice">
                                <span>Or Search from TradeVu</span>
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
                                        {selecteditems?.user?.firstName}{" "}  {selecteditems?.user?.lastName}
                                        </span>

                                    </div>
                                    </div>
                                    : <div style={{
                                        display:'flex',
                                        alignItems:'center',
                                        gap:'8px'
                                    }}>
                                        <img src={person} alt="" />
                                       <span className="name_empty">TradeVu User</span> 
                                    </div>
                                    }
                                    <img src={edit} alt="" />


                                </div>
                            </div>
                           
                           
                           
                           
                         
                                
                               
                                
                           
                           
                           
                           
                            
                            

                        </div>
                        <button className="create_order_btn" type="submit" disabled={loader}>
                            {
                                loader ? <Loading/> : 'Add Partner'
                            }
                        </button>
                        
                    </form>
                    
            </Modal>
          
    );
};

export default AddUserModal;
