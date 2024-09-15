import ApproveHeade from "../components/approveHeader";

const ApproveRequest = () => {
    return ( <>
    <ApproveHeade/>
    <div className="main-body-request">

        <div className="modal_request_big_form">
            <div className="password-lg-htg">
                <h2 className="sendfundztitle" style={{
                    margin:'0px',
                    padding:'0px'
                }}>Send funds to supplier</h2>
                <span className="spantitle">Confirm amount below</span>
            </div>
            <form action="" className="formtitle_funds">
                <div className="eachform-lg">
                    <div className="each_profile_lg_mhg">
                        <span htmlFor="Amount">Amount</span>
                    </div>

                </div>
            </form>

        </div>

    </div>
    </> );
}
 
export default ApproveRequest;