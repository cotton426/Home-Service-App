import { BsCardText } from "react-icons/bs";
import { MdOutlineModeEditOutline, MdOutlineCreditScore } from "react-icons/md";

const ProgressBar = ({ page }) => {
  //   page = "payment-page";
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 box mt-[3%] px-[15%] py-4">
      <div className="w-full flex justify-between relative z-20 px-1">
        <div
          className={`absolute w-1/2 h-1/2 border-b-[3px] -z-10 ${
            page === "select-page" ? "future-stage" : "present-stage"
          }`}
        />
        <div
          className={`absolute right-1 w-1/2 h-1/2 border-b-[3px] -z-10 ${
            page === "payment-page" ? "present-stage" : "future-stage"
          }`}
        />

        {/* circle of progress */}
        <div className="w-full h-full flex justify-between items-center">
          <div
            className={`progress-icon ${
              page === "select-page" ? "present-stage" : "past-stage"
            }`}
          >
            <BsCardText className="scale-y-150 text-lg" />
          </div>
          <div
            className={`progress-icon ${
              page === "select-page"
                ? "future-stage"
                : page === "address-page"
                ? "present-stage"
                : "past-stage"
            }`}
          >
            <MdOutlineModeEditOutline className="scale-150" />
          </div>
          <div
            className={`progress-icon ${
              page === "payment-page" ? "present-stage" : "future-stage"
            }`}
          >
            <MdOutlineCreditScore className="scale-150" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <p className="present-stage">รายการ</p>
        <p
          className={page === "select-page" ? "future-stage" : "present-stage"}
        >
          กรอกข้อมูลบริการ
        </p>
        <p
          className={page === "payment-page" ? "present-stage" : "future-stage"}
        >
          ชำระเงิน
        </p>
      </div>
    </div>
  );
};
export default ProgressBar;
