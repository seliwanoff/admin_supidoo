import { useEffect } from "react";
import "../style/index.css";

import Modal from "react-modal";
import axios from "axios";
import { useState } from "react";
import edit from "../assets/images/edit-2.svg";


const UserModal = (props) => {
   
    const closeModal = () => {
        props.setshow(false);
    };
    const [partners,setPartners] = useState([])
    const [search, setsearch] = useState("")
    useEffect(()=>{
       const fetchUser = async() =>{
        await axios.get('/v1/admin/get-all-businesses').then((res)=>{
            console.log(res)
            setPartners(res.data.data)
        }).catch((e)=>{
            console.log(e)
        })
       }

       fetchUser()
    },[])
    const filterBuyer = partners.filter((item) =>
    item?.name?.match(search)
  );
  let data = filterBuyer.reduce((r, e) => {
    let alphabet = e.name[0];

    if (!r[alphabet])
      r[alphabet] = {
        alphabet,
        record: [],
      };

    r[alphabet].record.push(e);
    return r;
  }, {});
  let result = Object.values(data);

  
    const customStyles = {
        content: {
          
            margin:'5% auto',
            overflow:'hidden',
            maxWidth: 'calc(100vw - 75%)',
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
                    <span className="material-icons"
                        onClick={closeModal}>
                        close
                    </span>
                    <form action="" className="Order_form">
                        <h3>Choose Partner</h3>
                        <div className="lg-form-create">
                            <div className="info_input_slice">
                                <input type="text" placeholder="Search by Busniness name" onChange={(e)=>setsearch(e.target.value)}/>
                            </div>
                        </div>
                        <div style={{
                            height:'100%',
                            overflow:'auto',
                            display:'flex',
                            flexDirection:'column',
                            gap:'16px'
                        }}>
                            {
                                result?.map((res,index)=>(
                                    
                                        <div className="info_input_slice" key={index}>
                                <span className="email_tag">{res.alphabet}</span>
                                {
                                    res.record?.map((item,indexs)=>(
                                        <div className="send_to_order" key={indexs} onClick={()=>{
                                            props.setshow(false)
                                            props.setselecteditems(item)
                                            }} >
                                    <div style={{
                                        display:'flex',
                                        alignItems:'center',
                                        gap:'8px'
                                    }}>
                                    <div className="inital_name">
                                        {item.name?.slice(0,2)}
                                    </div>
                                    <div className="name_tag_lg">
                                        <div className="name_main_tag">
                                          {item.name}
                                        </div>
                                        <span className="email_tag">
                                            {item?.user?.firstName}{" "} {item?.user?.lastName}

                                        </span>

                                    </div>
                                    </div>


                                </div>

                                    ))
                                }
                                
                            </div>
                                ))
                            }
                        </div>
                            
                        
                    </form>
                    
            </Modal>
            
    );
};

export default UserModal;
