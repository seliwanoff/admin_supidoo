import Header from "../components/header";
// import sech from '../assets/images/search-lg.svg'
// import download from '../assets/images/download.svg'
import logo from '../assets/images/iconsd.svg'
import linecheckbox from '../assets/images/line_checkbox.svg'
import maek from '../assets/images/mark_checkbox.svg'
import {useState} from "react";
import {useNavigate} from "react-router";

const UserDocument = () => {
    const [isChecked, setisChecked] = useState(false)
    const navigate = useNavigate()
    return (
        <>
            <div className="main">
                <Header/>
                <div className="info-cl">
                    <div style={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px'
                        }
                    }>
                        <div style={
                            {
                                color: '#475467',
                                fontSize: '14px',
                                fontWeight: '500',
                                lineHeight: '20px',
                                display: 'flex',
                                alignItems: 'center'
                            }
                        }>
                            <span onClick={
                                    () => {
                                        navigate(-1)
                                    }
                                }
                                style={
                                    {cursor: 'pointer'}
                            }>Plivio Nkiru</span>
                            <span className="material-icons">chevron_right</span>
                            <span style={
                                {
                                    color: '#344054',
                                    fontWeight: '700',
                                    borderRadius: '6px',
                                    background: '#F2F4F7',
                                    padding: '4px 8px 4px 8px'
                                }
                            }>Document</span>

                        </div>
                        <h2 className="bg-2">Accounts</h2>


                    </div>
                    <div className="each-card">
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Total Documents</span>

                            </div>
                            <div className="info">24</div>
                        </div>
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Accepted Documents</span>

                            </div>
                            <div className="info">2</div>
                        </div>
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Pending Documents</span>

                            </div>
                            <div className="info">8</div>
                        </div>
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Rejected Documents</span>

                            </div>
                            <div className="info">2</div>
                        </div>
                    </div>
                </div>

                <div className="info-cl2">
                    <div className="lg-card">
                        <div className="lg-title">
                            <div className="mtc-cl2"
                                style={
                                    {
                                        marginTop: '10px',
                                        marginBottom: '10px'
                                    }
                            }>
                                <div className="mtc-cl">Compliance Documents</div>


                            </div>

                        </div>

                        <table style={
                            {width: '100%'}
                        }>
                            <thead className="theads"
                                style={
                                    {
                                        background: '#FCFCFD',
                                        padding: '12px 24px 12px 24px',
                                        border: '1px solid #EAECF0',
                                        gap: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }
                            }>
                                <th>
                                    <img src={linecheckbox}
                                        alt=""/>
                                </th>
                                <th className="nn"
                                    style={
                                        {
                                            minWidth: '452px',
                                            width: '100%'
                                        }
                                }>Proof of Address</th>
                                <th className="nn">DATE UPLOADED</th>
                                <th className="nn">STATUS</th>
                                <th className="nn"
                                    style={
                                        {
                                            opacity: '0',
                                            visibility: '0'
                                        }
                                }>STATUS</th>
                                <th className="nn"
                                    style={
                                        {
                                            opacity: '0',
                                            visibility: '0'
                                        }
                                }>STATUS</th>


                            </thead>
                            <tbody>
                                <tr style={
                                    {
                                        padding: '12px 24px 12px 24px',
                                        borderBottom: '1px solid #EAECF0',
                                        gap: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }
                                }>
                                    <td> {
                                        isChecked ? <img src={maek}
                                            style={
                                                {marginTop: '10px'}
                                            }
                                            alt=""
                                            onClick={
                                                (e) => {
                                                    setisChecked(false)
                                                }
                                            }/> : <input type="checkbox" name="" id=""
                                            style={
                                                {marginTop: '10px'}
                                            }
                                            onChange={
                                                (e) => {
                                                    setisChecked(e.target.value)
                                                }
                                            }/>
                                    } </td>
                                    <td className="mms"
                                        style={
                                            {
                                                minWidth: '452px',
                                                width: '100%',
                                                display: 'flex',
                                                gap: '12px',
                                                alignItems: 'center'

                                            }
                                    }>
                                        <img src={logo}
                                            alt=""/>
                                        <div style={
                                            {
                                                display: 'flex',
                                                flexDirection: 'column'

                                            }
                                        }>
                                            <span style={
                                                {
                                                    color: '#101828',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    lineHeight: '19.6px'
                                                }
                                            }>Certificate of Incorporation</span>
                                            <span style={
                                                {
                                                    color: '#101828',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    lineHeight: '19.6px'
                                                }
                                            }>2 pages . 2mb</span>

                                        </div>
                                    </td>

                                    <td className="mm">
                                        5th Nov, 2023
                                    </td>
                                    <td className="mm">
                                        <div style={
                                            {
                                                padding: '2px 8px 2px 8px',
                                                borderRadius: '16px',
                                                background: '#ECFDF3',
                                                color: '#027A48',
                                                fontWeight: 500,
                                                letterSpacing: '2%',
                                                lineHeight: '16.2px',
                                                textAlign: 'center',
                                                maxWidth: '59px',
                                                margin: '0px auto',
                                                float: 'left'

                                            }
                                        }>
                                            Verified

                                        </div>
                                    </td>
                                    <td className="mm">
                                        <div className="see-all"
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    maxWidth: '89px'
                                                }
                                        }>View</div>

                                    </td>
                                    <td className="mm">
                                        <div className="see-all"
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    maxWidth: '89px'
                                                }
                                        }>Download</div>

                                    </td>


                                </tr>


                            </tbody>
                            <thead className="theads"
                                style={
                                    {
                                        background: '#FCFCFD',
                                        padding: '12px 24px 12px 24px',
                                        border: '1px solid #EAECF0',
                                        gap: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }
                            }>
                                <th style={
                                    {
                                        opacity: '0',
                                        visibility: '0'
                                    }
                                }>
                                    <img src={linecheckbox}
                                        alt=""/>
                                </th>
                                <th className="nn"
                                    style={
                                        {
                                            minWidth: '452px',
                                            width: '100%'
                                        }
                                }>Certificate of Incorporation</th>
                                <th className="nn"
                                    style={
                                        {
                                            opacity: '0',
                                            visibility: '0'
                                        }
                                }>DATE UPLOADED</th>
                                <th className="nn"
                                    style={
                                        {
                                            opacity: '0',
                                            visibility: '0'
                                        }
                                }>STATUS</th>
                                <th className="nn"
                                    style={
                                        {
                                            opacity: '0',
                                            visibility: '0'
                                        }
                                }>STATUS</th>
                                <th className="nn"
                                    style={
                                        {
                                            opacity: '0',
                                            visibility: '0'
                                        }
                                }>STATUS</th>


                            </thead>
                            <tbody>
                                <tr style={
                                    {
                                        padding: '12px 24px 12px 24px',
                                        borderBottom: '1px solid #EAECF0',
                                        gap: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }
                                }>
                                    <td> {
                                        isChecked ? <img src={maek}
                                            style={
                                                {marginTop: '10px'}
                                            }
                                            alt=""
                                            onClick={
                                                (e) => {
                                                    setisChecked(false)
                                                }
                                            }/> : <input type="checkbox" name="" id=""
                                            style={
                                                {marginTop: '10px'}
                                            }
                                            onChange={
                                                (e) => {
                                                    setisChecked(e.target.value)
                                                }
                                            }/>
                                    } </td>
                                    <td className="mms"
                                        style={
                                            {
                                                minWidth: '452px',
                                                width: '100%',
                                                display: 'flex',
                                                gap: '12px',
                                                alignItems: 'center'

                                            }
                                    }>
                                        <img src={logo}
                                            alt=""/>
                                        <div style={
                                            {
                                                display: 'flex',
                                                flexDirection: 'column'

                                            }
                                        }>
                                            <span style={
                                                {
                                                    color: '#101828',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    lineHeight: '19.6px'
                                                }
                                            }>Certificate of Incorporation</span>
                                            <span style={
                                                {
                                                    color: '#101828',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    lineHeight: '19.6px'
                                                }
                                            }>2 pages . 2mb</span>

                                        </div>
                                    </td>

                                    <td className="mm">
                                        5th Nov, 2023
                                    </td>
                                    <td className="mm">
                                        <div style={
                                            {
                                                padding: '2px 8px 2px 8px',
                                                borderRadius: '16px',
                                                background: '#ECFDF3',
                                                color: '#027A48',
                                                fontWeight: 500,
                                                letterSpacing: '2%',
                                                lineHeight: '16.2px',
                                                textAlign: 'center',
                                                maxWidth: '59px',
                                                margin: '0px auto',
                                                float: 'left'

                                            }
                                        }>
                                            Verified

                                        </div>
                                    </td>
                                    <td className="mm">
                                        <div className="see-all"
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    maxWidth: '89px'
                                                }
                                        }>View</div>

                                    </td>
                                    <td className="mm">
                                        <div className="see-all"
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    maxWidth: '89px'
                                                }
                                        }>Download</div>

                                    </td>


                                </tr>


                            </tbody>
                            <thead className="theads"
                                style={
                                    {
                                        background: '#FCFCFD',
                                        padding: '12px 24px 12px 24px',
                                        border: '1px solid #EAECF0',
                                        gap: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }
                            }>
                                <th style={
                                    {
                                        opacity: '0',
                                        visibility: '0'
                                    }
                                }>
                                    <img src={linecheckbox}
                                        alt=""/>
                                </th>
                                <th className="nn"
                                    style={
                                        {
                                            minWidth: '452px',
                                            width: '100%'
                                        }
                                }>CAC Status Report</th>
                                <th className="nn"
                                    style={
                                        {
                                            opacity: '0',
                                            visibility: '0'
                                        }
                                }>DATE UPLOADED</th>
                                <th className="nn"
                                    style={
                                        {
                                            opacity: '0',
                                            visibility: '0'
                                        }
                                }>STATUS</th>
                                <th className="nn"
                                    style={
                                        {
                                            opacity: '0',
                                            visibility: '0'
                                        }
                                }>STATUS</th>
                                <th className="nn"
                                    style={
                                        {
                                            opacity: '0',
                                            visibility: '0'
                                        }
                                }>STATUS</th>


                            </thead>
                            <tbody>
                                <tr style={
                                    {
                                        padding: '12px 24px 12px 24px',
                                        borderBottom: '1px solid #EAECF0',
                                        gap: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }
                                }>
                                    <td> {
                                        isChecked ? <img src={maek}
                                            style={
                                                {marginTop: '10px'}
                                            }
                                            alt=""
                                            onClick={
                                                (e) => {
                                                    setisChecked(false)
                                                }
                                            }/> : <input type="checkbox" name="" id=""
                                            style={
                                                {marginTop: '10px'}
                                            }
                                            onChange={
                                                (e) => {
                                                    setisChecked(e.target.value)
                                                }
                                            }/>
                                    } </td>
                                    <td className="mms"
                                        style={
                                            {
                                                minWidth: '452px',
                                                width: '100%',
                                                display: 'flex',
                                                gap: '12px',
                                                alignItems: 'center'

                                            }
                                    }>
                                        <img src={logo}
                                            alt=""/>
                                        <div style={
                                            {
                                                display: 'flex',
                                                flexDirection: 'column'

                                            }
                                        }>
                                            <span style={
                                                {
                                                    color: '#101828',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    lineHeight: '19.6px'
                                                }
                                            }>Certificate of Incorporation</span>
                                            <span style={
                                                {
                                                    color: '#101828',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    lineHeight: '19.6px'
                                                }
                                            }>2 pages . 2mb</span>

                                        </div>
                                    </td>

                                    <td className="mm">
                                        5th Nov, 2023
                                    </td>
                                    <td className="mm">
                                        <div style={
                                            {
                                                padding: '2px 8px 2px 8px',
                                                borderRadius: '16px',
                                                background: '#ECFDF3',
                                                color: '#027A48',
                                                fontWeight: 500,
                                                letterSpacing: '2%',
                                                lineHeight: '16.2px',
                                                textAlign: 'center',
                                                maxWidth: '59px',
                                                margin: '0px auto',
                                                float: 'left'

                                            }
                                        }>
                                            Verified

                                        </div>
                                    </td>
                                    <td className="mm">
                                        <div className="see-all"
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    maxWidth: '89px'
                                                }
                                        }>View</div>

                                    </td>
                                    <td className="mm">
                                        <div className="see-all"
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    maxWidth: '89px'
                                                }
                                        }>Download</div>

                                    </td>


                                </tr>


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDocument;
