import Header from "../components/header";
// import sech from '../assets/images/search-lg.svg'
// import download from '../assets/images/download.svg'
// import {useState} from "react";
import sech from '../assets/images/search-lg.svg'
import download from '../assets/images/download.svg'
import filter from '../assets/images/filter-lines.svg'
import {useNavigate} from "react-router";
import ApproveModal from "../components/approveModal";

const TradeOfCredit = () => {
    const navigate = useNavigate()
    return (
        <>
            <ApproveModal/>

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
                            }>Finance</span>
                            <span className="material-icons">chevron_right</span>
                            <span style={
                                {
                                    color: '#344054',
                                    fontWeight: '700',
                                    borderRadius: '6px',
                                    background: '#F2F4F7',
                                    padding: '4px 8px 4px 8px'
                                }
                            }>Trade Credit</span>

                        </div>
                        <div className="lft-tr">
                            <h2 className="bg-2">Trade credit</h2>


                        </div>


                    </div>
                    <div className="each-card">
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Total No of Trade of Credit</span>

                            </div>
                            <div className="info">24</div>
                        </div>
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Pending Trade of Credit</span>

                            </div>
                            <div className="info">2</div>
                        </div>
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Accepted Trade of Credit</span>

                            </div>
                            <div className="info">8</div>
                        </div>

                    </div>
                </div>

                <div className="info-cl2">
                    <div className="lg-card">
                        <div className="lg-title">
                            <div className="mtc-cl2">
                                <div className="mtc-cl">Trade Credit</div>
                                <span style={
                                    {
                                        color: '#475467',
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        fontWeight: '400'
                                    }
                                }>Manage your team members and their account permissions here.</span>


                            </div>
                            <div style={
                                {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }
                            }>
                                <div className="see-all"
                                    style={
                                        {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }
                                }>
                                    <img src={download}
                                        alt=""/>
                                    Download</div>
                                <div className="see-all">View report</div>


                            </div>

                        </div>
                        <div className="md-cl">
                            <div className="search-ls">
                                <div className="snd-l">All</div>
                                <div className="snd-l">Verified</div>
                                <div className="snd-l">Pending</div>
                                <div className="snd-l">Unverified</div>
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
                                <div className="filter">
                                    <img src={filter}
                                        alt=""/>
                                    Filter
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

                                <th className="nn">ISSUING BANK</th>
                                <th className="nn">REQUESTED AMOUNT</th>
                                <th className="nn">INTEREST</th>
                                <th className="nn">REPAY DATE</th>
                                <th className="nn">QUOTE</th>
                                <th className="nn">TENURE</th>
                                <th className="nn">DOCUMENTS</th>


                            </thead>
                            <tbody>
                                <tr style={
                                    {
                                        padding: '12px 24px 12px 24px',
                                        gap: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }
                                }>
                                    <td className="mm">
                                        Barclays Bank
                                    </td>
                                    <td className="mm">
                                        ₦800,000
                                    </td>
                                    <td className="mm">
                                        15%(₦+50,000)

                                    </td>
                                    <td className="mm">
                                        Oct 15th, 2023
                                    </td>
                                    <td className="mm">
                                        $50.02

                                    </td>
                                    <td className="mm">
                                        90 Days
                                    </td>

                                    <td className="mm">
                                        <div className="see-all"
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    maxWidth: '89px'
                                                }
                                            }
                                            onClick={
                                                () => {
                                                    navigate('/account/transaction/id')
                                                }
                                        }>View</div>
                                    </td>


                                </tr>
                                <tr style={
                                    {
                                        padding: '12px 24px 12px 24px',
                                        gap: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }
                                }>
                                    <td className="mm">
                                        Barclays Bank
                                    </td>
                                    <td className="mm">
                                        ₦800,000
                                    </td>
                                    <td className="mm">
                                        15%(₦+50,000)

                                    </td>
                                    <td className="mm">
                                        Oct 15th, 2023
                                    </td>
                                    <td className="mm">
                                        $50.02

                                    </td>
                                    <td className="mm">
                                        90 Days
                                    </td>

                                    <td className="mm">
                                        <div className="see-all"
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    maxWidth: '89px'
                                                }
                                            }
                                            onClick={
                                                () => {
                                                    navigate('/account/transaction/id')
                                                }
                                        }>View</div>
                                    </td>


                                </tr>


                                <tr style={
                                    {
                                        padding: '12px 24px 12px 24px',
                                        gap: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }
                                }>
                                    <td className="mm">
                                        Barclays Bank
                                    </td>
                                    <td className="mm">
                                        ₦800,000
                                    </td>
                                    <td className="mm">
                                        15%(₦+50,000)

                                    </td>
                                    <td className="mm">
                                        Oct 15th, 2023
                                    </td>
                                    <td className="mm">
                                        $50.02

                                    </td>
                                    <td className="mm">
                                        90 Days
                                    </td>

                                    <td className="mm">
                                        <div className="see-all"
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    maxWidth: '89px'
                                                }
                                            }
                                            onClick={
                                                () => {
                                                    navigate('/account/transaction/id')
                                                }
                                        }>View</div>
                                    </td>


                                </tr>


                                <tr style={
                                    {
                                        padding: '12px 24px 12px 24px',
                                        gap: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }
                                }>
                                    <td className="mm">
                                        Barclays Bank
                                    </td>
                                    <td className="mm">
                                        ₦800,000
                                    </td>
                                    <td className="mm">
                                        15%(₦+50,000)

                                    </td>
                                    <td className="mm">
                                        Oct 15th, 2023
                                    </td>
                                    <td className="mm">
                                        $50.02

                                    </td>
                                    <td className="mm">
                                        90 Days
                                    </td>

                                    <td className="mm">
                                        <div className="see-all"
                                            style={
                                                {
                                                    textAlign: 'center',
                                                    maxWidth: '89px'
                                                }
                                            }
                                            onClick={
                                                () => {
                                                    navigate('/account/transaction/id')
                                                }
                                        }>View</div>
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

export default TradeOfCredit;
