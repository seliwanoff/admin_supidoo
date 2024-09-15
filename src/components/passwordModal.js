import {useEffect, useState} from "react";
import "../style/index.css";
import pick from "../assets/images/pick.svg";

import Modal from "react-modal";
import { useLocation, useNavigate } from "react-router";

const PasswordModal = (props) => {
    const [show, setshow] = useState(false);
    const [selectedIndex, setselectedIndex] = useState(-1);
    const [ setselectedReason] = useState('')
    const [isdisabled, setisdisabled] = useState(true)
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    const {state} = useLocation()

    const closeModal = () => {
        props.setmodal(false);
    };
    useEffect(() => {
        if (password !== '') {
            setisdisabled(false)
        } else {
            setisdisabled(true)
        }
    }, [password])
    const submitPassword = (e) =>{
        e.preventDefault();
        const data = {
            password: password
        }
        console.log(data)
        navigate('/finance/approve_factoring_request', {
            state:{
            ...state
        }})
        
    }
    const reasons = ["Document is blurry", "Document number is not visible", "Incorrect document", "Name is not visible",];
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)"
        }
    };

    return (
        <>
            <div>
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
                    <form className="form_w_gl" onSubmit={submitPassword}>
                        <div className="password-lg-htg">
                        <h3 className="reaseon_gl">Enter your password</h3>
                        <span className="pass_content-jg">Enter your password to approve this request.</span>
                        </div>
                      
                        <div className="form_lg_hj">
                           
                            <input type="password" className="select_option" placeholder="Enter Password"
                                onChange={
                                    (e) => {
                                        setpassword(e.target.value)
                                    }
                            }/>
                    </div>
                    <button className="btn-submit" type="submit"
                        style={
                            {
                                background: isdisabled === false ? '#6F00FF' : '#ebe4ff',
                                color: isdisabled === false ? '#fff' : '#bfa6ff'
                            }
                        }
                        disabled={isdisabled}>SEND</button>
                </form>
            </Modal>
            {
            show === true && <Modal ariaHideApp={false}
                isOpen={show}
                style={customStyles}
                contentLabel="Example Modal">
                <span className="material-icons"
                    style={
                        {cursor: 'pointer'}
                    }
                    onClick={
                        () => {
                            setshow(false)
                        }
                }>
                    arrow_back
                </span>
                <div className="form_w_gl">
                    <h3 className="reaseon_gl">Pick a reason</h3>
                    <div className="reason_each_mg_lf">
                        {
                        reasons.map((reason, index) => (
                            <div className="reason_mian"
                                style={
                                    {
                                        background: selectedIndex === index ? '#F4F0FF' : ''

                                    }
                                }
                                key={index}
                                onClick={
                                    () => {

                                        setselectedReason(reason)
                                        setselectedIndex(index);
                                        setshow(false)


                                    }
                            }>
                                {reason}
                                {
                                selectedIndex === index && <>
                                    <img src={pick}
                                        alt=""/></>
                            } </div>
                        ))
                    }
                        {" "} </div>
                </div>
            </Modal>
        } </div>
    </>
    );
};

export default PasswordModal;
