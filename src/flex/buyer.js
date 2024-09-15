import Header from "../components/header";
import sech from '../assets/images/search-lg.svg'
import download from '../assets/images/download.svg'
// import upward from '../assets/images/arrow-up.svg'
import logo from '../assets/images/iconsd.svg'
import user from '../assets/images/users1.svg'
// import {useNavigate} from "react-router";
const Buyers = () => { // const navigate = useNavigate()
    return (
        <>
            <div className="main">
                <Header/>
                <div className="info-cl">
                    <h2 className="bg-2">Buyers</h2>
                    <div className="each-card">

                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Total Buyers</span>


                            </div>
                            <div style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }
                            }>
                                <div className="info">2,420</div>


                            </div>
                        </div>
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Newer  Buyers</span>


                            </div>
                            <div style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }
                            }>
                                <div className="info">2,420</div>


                            </div>
                        </div>
                        <div className="card">
                            <div className="data-c">
                                <span className="small-c">Active Buyers</span>


                            </div>
                            <div style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }
                            }>
                                <div className="info">2,420</div>


                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-cl2">
                    <div className="lg-card">
                        <div className="lg-title">
                            <div className="mtc-cl2">
                                <div className="mtc-cl">Buyer's Account</div>
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
                                        {
                                            maxWidth: '452px',
                                            width: '100%'
                                        }
                                }>Name</th>
                                <th className="nn">CONTACT INFO</th>
                                <th className="nn">TRANSACTIONS</th>
                                <th className="nn">Accounts</th>


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
                                    <td className="mms"
                                        style={
                                            {
                                                maxWidth: '452px',
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
                                            }>Plivio</span>
                                            <span style={
                                                {
                                                    color: '#101828',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    lineHeight: '19.6px'
                                                }
                                            }>Nkiru Emian</span>

                                        </div>
                                    </td>
                                    <td className="mm"
                                        style={
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
                                        }>emina-nkiru@pivo.com</span>
                                        <span style={
                                            {
                                                color: '#101828',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                lineHeight: '19.6px'
                                            }
                                        }>+234 903-244-1394</span>
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
                                                    maxWidth: '89px',
                                                    gap: '10px',
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }
                                        }>
                                            <img src={user}
                                                alt=""/>
                                            +4
                                        </div>

                                    </td>
                                    <td>
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

export default Buyers;
