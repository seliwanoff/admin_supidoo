import axios from "axios";
import Loading from "./loading";
import mark  from '../assets/images/bluesuccess.svg'
import colorupload from '../assets/images/colorupload.svg'
import { useState } from "react";

const UploadInvoice = (props) => {
    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        props.setInterest()
    }
    const paymentterms = ["Cash","Credit Line","Invoice Factoring"]
    const [selectedindex,setselectedindex] = useState(0)
   // console.log(props.file.length)

  return (
    <>
    {
        props.show && <>
      <div className="wrapper" onClick={()=>{
        props.setshow(false)
      }}>Modal</div>
      <div id="demo-modal" className="modal" style={{
        zIndex:'999'
      }}>

        <div className="modal__content"  style={{
            background:'#F6F6F6',
            padding:'8px 24px',
            zIndex:'999999',
            maxWidth: 'calc(100vw - 40%)',

        }}>
            <div className="header-modal-content">
                <span className="material-icons" style={{cursor:'pointer'}} onClick={()=>props.setshow(false)}>close</span>

            </div>
            <div className="modal-body-top">
                <h4>Purchase Order</h4>
                {
                    props.file.length === 0&&
                
                <div className="modal_drop_down lg_p_hj" style={{
                    background:'rgb(236, 239, 243)',
                    padding:'24px 16px',
                    position:'relative',


                }}>
                    <input type="file" style={{
                        position:'absolute',
                        width:'100%',
                        height:'100%',
                        opacity:'0'
                    }} onChange={(e)=>{
                        props.setfile(e.target.files[0])
                    }}/>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                    }}>
                        <img src={colorupload} alt=""  style={{width:'30px'}}/>
                        <div style={{
                            display:'flex',
                            flexDirection:'column'
                        }}>
                            <span className="upload_invoice">Drag or Upload Purchase Order</span>
                            <span className="hh">JPEG,PNG,JPG,PDF</span>
                            <span className="hh">Max. file size 20MB</span>


                        </div>
                    </div>
                   
                </div>

                    }
                    {
                        props.file.length !== 0 &&  <div className="modal_drop_down lg_p_hj" style={{
                            background:'rgb(192, 202, 216)',
                            padding:'24px 16px',
                            position:'relative',
                            color:'rgb(111, 0, 255)',
                            fontWeight:'500',
                            marginBottom:'70px'
        
        
                        }}>
                            {props.file.name} {"-"} {parseFloat(props.file.size/1024).toFixed(2)}KB
                           
                          
                        </div>
                    }
                <button className="btn_upload" disabled={props?.file?.name!== "" ? false : true} style={{
                    background : props?.file?.name !== "" && 'rgb(111, 0, 255)',
                    marginBottom:'15px'
                }} onClick={
                    ()=>props.setshow(false)
                }>
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

export default UploadInvoice;
