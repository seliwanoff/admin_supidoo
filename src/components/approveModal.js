import '../style/index.css'
import filename from '../assets/images/filename.svg'
import arrowdown from '../assets/images/arrowdown.svg'
import cancel from '../assets/images/cancel.svg'
import success from '../assets/images/markss.svg'

const ApproveModal = () => {
    return (
        <>
            <div className="modal">
                <div className="top-modal-content">

                    <div className='top-c'>
                        <div className="file-con">
                            <img src={filename}
                                alt=""/>
                            <div style={
                                {
                                    display: 'flex',
                                    flexDirection: 'column'

                                }
                            }>
                                <div className='myt'>
                                    INV-123456
                                </div>
                                <div className='mfy'>
                                    1 pages . 2mb
                                </div>

                            </div>

                        </div>
                        <button className='btn-dow'>
                            Download
                            <img src={arrowdown}
                                alt=""/>
                        </button>
                    </div>
                    <div className='bottom-c'>
                        <div className="doc-slide">
                            <div className='doc-m'>Doc 1 of 3</div>
                            <div className='scrollable'>
                                <div className="circular">
                                    <span className='material-icons'>chevron-left</span>
                                </div>
                                <div className="circular">
                                    <span className='material-icons'>chevron-right</span>

                                </div>
                            </div>

                        </div>
                        <div className='side-br'>
                            <button className='btn-c cancel'>
                                <span>Decline</span>
                                <img src={cancel}
                                    alt=""/>
                            </button>
                            <button className='btn-c success'>
                                <span className=''>Approve</span>
                                <img src={success}
                                    alt=""/>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ApproveModal;
