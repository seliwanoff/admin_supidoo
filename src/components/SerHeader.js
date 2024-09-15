import { useNavigate } from "react-router-dom";

const SerHeader = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="myborder-slixe "
        style={{
          height: "70px",
          padding: "10px 30px 10px 30px",
          width:'100%',
          boxSizing:'border-box'

        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div
            className=""
            style={{
              width: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              fontWeight:'600'
            }}
          >
            <span
              className="material-icons"
              style={{ color: "#344054",cursor:'pointer' }}
              onClick={() => navigate(-1)}
            >
              close
            </span>
            {props.header}
          </div>
         
        </div>
      </div>
     
    </>
  );
};

export default SerHeader;
