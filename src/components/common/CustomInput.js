import { formatedAddress } from "@/utils/formatters";
import "./customInput.css";
export function CustomButton({ id, BtnName, address, onClick, isLoading }) {
    return (
      <div className="dashbtn">
        <button
          id={id}
          className="btn walletBtn"
          onClick={onClick}
          disabled={isLoading ? true : false}
        >
          {address ? formatedAddress(address) : BtnName}
        </button>
      </div>
    );
  }

  export function FormInput({
    isMandatory,
    FNClass,
    FName,
    FType,
    name,
    value,
    onChange,
    disabled,
    onKeyDownCapture,
    icons,
    clickOnIcon,
    readOnly,
    placeholder,
    children
  }) {
    return (
      <div className={`${FNClass ? " FundForm" : "FundForm"}`}>
        <label htmlFor="exampleInputEmail1" className="form-label">
          {FName} {isMandatory && <span className="star_important">*</span>}
        </label>
      {
      children ? children :  <input
          type={FType}
          name={name}
          value={value}
          onChange={onChange}
          className="form-control inputForm"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          disabled={disabled}
          autoComplete="off"
          onKeyDownCapture={onKeyDownCapture}
          // autoComplete="off"
          placeholder={placeholder}
          readOnly={readOnly}
        />
      }
        <i className={icons} onClick={clickOnIcon}></i>
      </div>
    );
  }


export function GreenButton({ id, BtnName, address, onClick, isLoading }) {
    return (
      <div className="dashbtn">
        <button
          id={id}
          className="btn greentbtn"
          onClick={onClick}
          disabled={isLoading ? true : false}
        >
          {address ? formatedAddress(address) : BtnName}
        </button>
      </div>
    );
  }
  export function BlueButton({ id, BtnName, address, onClick, isLoading }) {
    return (
      <div className="dashbtn">
        <button
          id={id}
          className="btn bluebtn"
          onClick={onClick}
          disabled={isLoading ? true : false}
        >
          {address ? formatedAddress(address) : BtnName}
        </button>
      </div>
    );
  }