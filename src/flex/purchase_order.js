import { useLocation } from "react-router";

const PurchaseOrderDocument = () => {
    const {state} = useLocation()
   // console.log(state)
    return ( 
    <div style={{
        height:'100vh',
        width:'100%',
        display:'flex',
        justifyContent:'center',
    }}>
        <img src={state.url} alt=""  style={{
            width:'100%',
            height:'100%',
            margin:'0px auto',
            


        }}/>


    </div> );
}
 
export default PurchaseOrderDocument;