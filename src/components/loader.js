import loader from "../assets/images/l.gif";
const Loader = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6F00FF",

          fontSize: "20px",
        }}
      >
        <img src={loader} alt="" />
      </div>
    </>
  );
};

export default Loader;
