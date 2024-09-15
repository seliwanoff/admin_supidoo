import Header from "../components/header";
// import sech from '../assets/images/search-lg.svg'
// import download from '../assets/images/download.svg'
// import logo from '../assets/images/iconsd.svg'
// import linecheckbox from '../assets/images/line_checkbox.svg'
// import maek from '../assets/images/mark_checkbox.svg'
// import {useState} from "react";
import sech from '../assets/images/search-lg.svg'
import ngn from '../assets/images/nndn.svg'

import {useNavigate} from "react-router";

const Transaction = () => { // const [isChecked, setisChecked] = useState(false)
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
                                    fontWeight: '700'
                                }
                            }>Transactions</span>

                        </div>
                        <h2 className="bg-2">Transactions</h2>


                    </div>
                    <div className="each-card">
                        <div className="card"
                            style={
                                {
                                    background: 'inherit',
                                    gap: '4px',
                                    padding: '0px'
                                }
                        }>
                            <div className="data-c">
                                <span className="small-c">Available balance</span>

                            </div>
                            <div className="naira-dl">
                                <img src={ngn}
                                    alt=""/>
                                <span className="info">₦102,209.04</span>
                            </div>
                        </div>
                        <div className="card"
                            style={
                                {
                                    background: 'inherit',
                                    gap: '4px',
                                    padding: '0px'
                                }
                        }>
                            <div className="data-c">
                                <span className="small-c">Total money spent</span>

                            </div>
                            <div className="naira-dl">
                                <img src={ngn}
                                    alt=""/>
                                <span className="info">₦102,209.04</span>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="info-cl2"
                    style={
                        {border: '1px solid red'}
                }>
                    dij
                </div>

                <div className="info-cl2">
                    <div className="lg-card">
                        <div className="lg-title">
                            <div className="mtc-cl2">
                                <div className="mtc-cl">New transfer request</div>
                                <span style={
                                    {
                                        color: '#475467',
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        fontWeight: '400'
                                    }
                                }>Keep track of vendor and their security ratings.</span>


                            </div>
                            <div className="see-all">See all</div>

                        </div>
                        <div className="md-cl">
                            <div className="search-ls">
                                <div className="snd-l">Trade</div>
                                <div className="snd-l">Bank transfer</div>
                                <div className="snd-l">Card</div>
                                <div className="snd-l">Deposit</div>
                            </div>

                            <div className="search-dl">

                                <div className="search-l"
                                    style={
                                        {
                                            display: 'flex',
                                            gap: '6px',
                                            alignItems: 'center',
                                            padding: '10px 14px 10px 14px',
                                            background: '#fff',
                                            borderRadius: '8px',
                                            width: '320px',
                                            border: '1px solid #D0D5DD'


                                        }
                                }>
                                    <img src={sech}
                                        alt=""/>
                                    <input type="text" placeholder='Search'
                                        style={
                                            {
                                                outline: 'none',
                                                border: 'none'
                                            }
                                        }/>
                                </div>
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
                                <th className="nn">Transaction ID</th>
                                <th className="nn">Bank
                                </th>
                                <th className="nn">ACCOUNT NUMBER</th>
                                <th className="nn">ACCOUNT NAME</th>
                                <th className="nn">Amount</th>
                                <th className="nn">Date and time</th>
                                <th className="nn">Status</th>


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
                                    <td className="mm">#123456</td>
                                    <td className="mm">Access Bank</td>
                                    <td className="mm">Mo Ogbeh</td>
                                    <td className="mm">0019741974</td>
                                    <td className="mm">$1,750.02</td>
                                    <td className="mm">5th Nov, 2023 • 5:30</td>
                                    <td className="mm">
                                        <div style={
                                            {
                                                padding: '2px 8px 2px 8px',
                                                borderRadius: '16px',
                                                background: '#FEF3F2',
                                                color: '#B42318',
                                                fontWeight: 500,
                                                letterSpacing: '2%',
                                                lineHeight: '16.2px',
                                                textAlign: 'center',
                                                maxWidth: '59px',
                                                margin: '0px auto',
                                                float: 'left'

                                            }
                                        }>
                                            Unverified

                                        </div>
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

export default Transaction;
