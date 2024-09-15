import { Bars } from "react-loader-spinner";
const Loading = () => {
  return (
    <>
      <Bars
        height="15px"
        radius="9"
        color="#ffffff"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </>
  );
};

export default Loading;
