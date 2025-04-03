import { useState } from "react";
import { postDataAPI } from "@/utils/API_Instance";
import { CustomButton, FormInput } from "../common/CustomInput";
import CustomModal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import GlobalTypes from "../../redux/actions/GlobalTypes"
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "../Toast/Toast";
import * as Yup from "yup";

const validateEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const CheckUserModal = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
//   const dispatch = useDispatch();
  const router = useRouter();

  const validateUser = async () => {
    try {
      setErrors({}); 
      if (!email) {
        notifyError("Email is required");
        return;
      }


      await validateEmailSchema.validate({ email }, { abortEarly: false });

      setLoading(true);
    //   dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

      const res = await postDataAPI("/user/validate-user", { email });

      if (res.status === 200) {
        localStorage.setItem("isRegister", true);
        notifySuccess("Email verified successfully!");
        closeModal();
      }
    } catch (err) {
      if (err.inner) {
      
        const newErrors = err.inner.reduce(
          (acc, error) => ({ ...acc, [error.path]: error.message }),
          {}
        );
        setErrors(newErrors);
      } else {
        
        notifyError(err?.response?.data?.msg || "Something went wrong");
        localStorage.setItem("redirectPage", "project/67c6adbb529cd474d8a4a80b");
        router.push("/register");
      }
      console.error("User validation error:", err);
    } finally {
      setLoading(false);
    //   dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
    }
  };

  return (
    <CustomModal isOpen={isOpen} closeModal={closeModal}>
      <div className="fund_ing">
        <h2>Confirm Your Identity</h2>

        <div className="min-max">
          <span>Email</span>
          {errors.email && <span className="error_message">*{errors.email}</span>}
        </div>

        <FormInput
          Ftype="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: "" });
          }}
          FName="Email"
          placeholder="Enter your email"
        />

        <CustomButton
          className="finish-btn"
          BtnName={loading ? "Verifying..." : "Verify"}
          onClick={validateUser}
          disabled={loading}
        />
      </div>
    </CustomModal>
  );
};

export default CheckUserModal;
