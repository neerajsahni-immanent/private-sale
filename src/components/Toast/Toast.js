import { CircularProgress } from "@mui/material";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

export const notifySuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const notifyError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const notify=()=>{

}
export const Loading = () => {
  const { notify, auth } = useSelector((state) => state);
  return (
    <>
      {notify.loading && (
        <div
          className="loader"
          style={{
            color: "white",
            top: "0",
            left: "0",
            right: "0",
            margin: "0 auto",
            zIndex: 50,
            position: "fixed",
            height: "100%",
            width: "100%",
            background: "rgba(0, 0, 0, .5)",
            bottom: 0,
            display: "grid",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
        
          <CircularProgress color="secondary" />
        </div>
      )}
    </>
  );
};
