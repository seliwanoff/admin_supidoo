import Header from "../components/header";
import sech from '../assets/images/search-lg.svg'
import download from '../assets/images/download.svg'
import upward from '../assets/images/arrow-up.svg'
import visa from '../assets/images/visa.svg'
import filter from '../assets/images/filter-lines.svg'

// import logo from '../assets/images/iconsd.svg'
// import {useNavigate} from "react-router";
const Card = () => { // const navigate = useNavigate()
    return (
        <>
            <div className="main">
                <Header/>
                <div className="info-cl">
                    <h2 className="bg-2">Card</h2>
                    <div className="each-card">

                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Total Cards</span>

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
                                <span className="small-c">Pending Cards</span>

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
                                <span className="small-c">Delivered Cards</span>

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
                            <div className="filter">
                                <img src={filter}
                                    alt=""/>
                                Filter
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
                                <th className="nn"
                                    style={
                                        {minWidth: '223px'}
                                }>Card name</th>
                                <th className="nn"
                                    style={
                                        {minWidth: '223px'}
                                }>card number</th>
                                <th className="nn">expiry date</th>
                                <th className="nn">cvv</th>
                                <th className="nn"
                                    style={
                                        {maxWidth: '223px'}
                                }>Billing Address</th>
                                <th className="nn">State</th>

                                <th className="nn">zip code date</th>


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
                                    <td className="mm"
                                        style={
                                            {minWidth: '200px'}
                                    }>
                                        Salahudeen Ahmad Idowu
                                    </td>
                                    <td className="mm"
                                        style={
                                            {minWidth: '223px'}
                                    }>
                                        <div style={
                                            {
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '12px',
                                                width: '100%'
                                            }
                                        }>
                                            <img src={visa}
                                                alt=""/>
                                            <span>1234 5678 **** 7474</span>
                                        </div>

                                    </td>
                                    <td className="mm"
                                        style={
                                            {textAlign: 'center'}
                                    }>
                                        05/23
                                    </td>
                                    <td className="mm"
                                        style={
                                            {textAlign: 'center'}
                                    }>
                                        000
                                    </td>
                                    <td className="mm"
                                        style={
                                            {maxWidth: '223px'}
                                    }>
                                        5, HemmingsWay, Abuja
                                    </td>
                                    <td className="mm">
                                        Kwara
                                    </td>
                                    <td className="mm">
                                        100010
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

export default Card;
