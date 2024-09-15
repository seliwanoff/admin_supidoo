import Header from "../components/header";
import sech from '../assets/images/search-lg.svg'
import download from '../assets/images/download.svg'
import upward from '../assets/images/arrow-up.svg'
// import logo from '../assets/images/iconsd.svg'
// import {useNavigate} from "react-router";
const Order = () => { // const navigate = useNavigate()
    return (
        <>
            <div className="main">
                <Header/>
                <div className="info-cl">
                    <h2 className="bg-2">Order</h2>
                    <div className="each-card">
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Total Orders</span>

                            </div>
                            <div style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }
                            }>
                                <div className="info">2,420</div>
                                <div style={
                                    {
                                        background: '#ECFDF3',
                                        padding: '2px 10px 2px 8px',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        gap: '4px',
                                        color: '#027A48',
                                        lineHeight: '20px',
                                        fontSize: '14px',
                                        fontWeight: '500'

                                    }
                                }>
                                    <img src={upward}
                                        alt=""/>
                                    100%
                                </div>


                            </div>
                        </div>
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">New Orders</span>

                            </div>
                            <div style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }
                            }>
                                <div className="info">2,420</div>
                                <div style={
                                    {
                                        background: '#ECFDF3',
                                        padding: '2px 10px 2px 8px',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        gap: '4px',
                                        color: '#027A48',
                                        lineHeight: '20px',
                                        fontSize: '14px',
                                        fontWeight: '500'

                                    }
                                }>
                                    <img src={upward}
                                        alt=""/>
                                    100%
                                </div>


                            </div>
                        </div>
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Pending Orders</span>

                            </div>
                            <div style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }
                            }>
                                <div className="info">2,420</div>
                                <div style={
                                    {
                                        background: '#ECFDF3',
                                        padding: '2px 10px 2px 8px',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        gap: '4px',
                                        color: '#027A48',
                                        lineHeight: '20px',
                                        fontSize: '14px',
                                        fontWeight: '500'

                                    }
                                }>
                                    <img src={upward}
                                        alt=""/>
                                    100%
                                </div>


                            </div>
                        </div>
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Delivered order</span>

                            </div>
                            <div style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }
                            }>
                                <div className="info">2,420</div>
                                <div style={
                                    {
                                        background: '#ECFDF3',
                                        padding: '2px 10px 2px 8px',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        gap: '4px',
                                        color: '#027A48',
                                        lineHeight: '20px',
                                        fontSize: '14px',
                                        fontWeight: '500'

                                    }
                                }>
                                    <img src={upward}
                                        alt=""/>
                                    100%
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-cl2">
                    <div className="lg-card">
                        <div className="lg-title">
                            <div className="mtc-cl2">
                                <div className="mtc-cl">All Orders</div>
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
                                <div className="snd-l">Accepted</div>
                                <div className="snd-l">Declined</div>
                                <div className="snd-l">Pending</div>
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
                                <th className="nn">ORDER ID</th>
                                <th className="nn">Customer name</th>
                                <th className="nn">Product</th>
                                <th className="nn">QTY</th>
                                <th className="nn">Price</th>
                                <th className="nn">Order date</th>

                                <th className="nn">Delivery date</th>

                                <th className="nn">status</th>


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
                                        #123456
                                    </td>
                                    <td className="mm">
                                        Nkiru Emina
                                    </td>
                                    <td className="mm">
                                        Deep Freezer
                                    </td>
                                    <td className="mm">
                                        x2
                                    </td>
                                    <td className="mm">
                                        $230.99
                                    </td>
                                    <td className="mm">
                                        Oct 15th, 2023
                                    </td>
                                    <td className="mm">
                                        Oct 15th, 2023
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
                                                margin: '0px auto',
                                                float: 'left'

                                            }
                                        }>
                                            Delivered

                                        </div>
                                    </td>

                                    <td style={
                                        {
                                            position: 'absolute',
                                            right: '50px'
                                        }
                                    }>
                                        <span className="material-icons">more_vert</span>

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

export default Order;
