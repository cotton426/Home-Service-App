import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

const Navbar = ({
  title,
  subTitle,
  backLink,
  inputPlaceholder,
  leftButton,
  rightButton,
}) => {
  return (
    <>
      <header className="bg-white h-[80px] px-[5%] py-3 border border-gray-300">
        <nav className="flex items-center justify-between h-full">
          <div className="flex flex-row">
            {backLink && (
              <Link to={backLink}>
                <IoIosArrowBack className="w-10 h-10 text-gray-700 mr-3" />
              </Link>
            )}
            <div className="flex flex-col ">
              {subTitle && (
                <span className="text-gray-700 font-normal text-xs">
                  {subTitle}
                </span>
              )}
              <div
                id="left-container"
                className="font-medium text-xl text-black "
              >
                {title}
              </div>
            </div>
          </div>

          <div className="flex items-center ">
            {/* {inputPlaceholder && (
              <div className="flex flex-row items-center border border-gray-300 px-2 rounded-xl ">
                <GoSearch className="h-5 w-5 text-gray-500 ml-2" />
                <input
                  type="text"
                  placeholder={inputPlaceholder}
                  className=" text-black focus:outline-none  ml-2 px-1 py-2 rounded border-none"
                />
              </div>
            )} */}
            {leftButton && <div className="pl-6">{leftButton}</div>}
            {rightButton && <div className="pl-6">{rightButton}</div>}
          </div>
        </nav>
      </header>
    </>
  );
};

export const ServiceNavbar = () => (
  <Navbar
    title="บริการ"
    inputPlaceholder="ค้นหาบริการ..."
    rightButton={
      <Link to="/add-service">
        <button className="btn-primary">เพิ่มบริการ +</button>
      </Link>
    }
  />
);

export const CategoryNavbar = () => (
  <Navbar
    title="หมวดหมู่"
    inputPlaceholder="ค้นหาหมวดหมู่..."
    rightButton={
      <Link to="/add-category">
        <button className="btn-primary">เพิ่มหมวดหมู่ +</button>
      </Link>
    }
  />
);

export const SubCategoryNavbar = () => (
  <Navbar
    title="หมวดหมู่ย่อย"
    subTitle="หมวดหมู่"
    backLink="/categories"
    leftButton={
      <Link to="/categories">
        <button className="btn-primary">ยกเลิก</button>
      </Link>
    }
    rightButton={<button className="btn-primary">ยืนยัน</button>}
  />
);

export const AddCategoryNavbar = ({ handleSubmit }) => (
  <Navbar
    title="เพิ่มหมวดหมู่"
    leftButton={
      <Link to="/categories">
        <button className="btn-primary">ยกเลิก</button>
      </Link>
    }
    rightButton={
      <button
        className="btn-primary"
        onClick={() => {
          handleSubmit();
        }}
      >
        ยืนยัน
      </button>
    }
  />
);

export const AddServiceNavbar = () => (
  <Navbar
    title="เพิ่มบริการ"
    leftButton={
      <Link to="/services">
        <button className="btn-primary">ยกเลิก</button>
      </Link>
    }
    rightButton={
      <button className="btn-primary" type="submit">
        ยืนยัน
      </button>
    }
  />
);

export const EditServiceNavbar = ({ title }) => (
  <Navbar
    title={title}
    subTitle="บริการ"
    // backLink="/services"
    leftButton={
      <Link to="/services">
        <button className="btn-primary">ยกเลิก</button>
      </Link>
    }
    rightButton={
      <button className="btn-primary" type="submit">
        ยืนยัน
      </button>
    }
  />
);

export const EditCategoryNavbar = ({ onConfirm, title }) => {
  const navigate = useNavigate();
  return (
    <Navbar
      title={title}
      subTitle="หมวดหมู่"
      // backLink="/categories"
      leftButton={
        <button
          className="btn-primary"
          onClick={() => {
            navigate("/categories");
          }}
        >
          ยกเลิก
        </button>
      }
      rightButton={
        <button className="btn-primary" onClick={onConfirm} type="submit">
          ยืนยัน
        </button>
      }
    />
  );
};

export const DetailCategoryNavbar = ({ title }) => {
  const param = useParams();
  return (
    <Navbar
      title={title}
      subTitle="หมวดหมู่"
      backLink="/categories"
      rightButton={
        <Link to={`/edit-category/${param.category_id}`}>
          <button className="btn-primary">แก้ไข</button>
        </Link>
      }
    />
  );
};

export const DetailServiceNavbar = ({ title }) => {
  const param = useParams();
  return (
    <Navbar
      title={title}
      subTitle="บริการ"
      backLink="/services"
      rightButton={
        <Link to={`/edit-service/${param.service_id}`}>
          <button className="btn-primary">แก้ไข</button>
        </Link>
      }
    />
  );
};

export const AddPromotionNavbar = ({ onConfirm }) => (
  <Navbar
    title="เพิ่มบริการ"
    leftButton={
      <Link to="/promotions">
        <button className="btn-primary">ยกเลิก</button>
      </Link>
    }
    rightButton={
      <button className="btn-primary" onClick={onConfirm} type="submit">
        ยืนยัน
      </button>
    }
  />
);

export const PromotionNavbar = () => (
  <Navbar
    title="Promotion Code"
    inputPlaceholder="ค้นหา Promotion Code..."
    rightButton={
      <Link to="/add-promotion">
        <button className="btn-primary">เพิ่ม Promotion Code +</button>
      </Link>
    }
  />
);

export const DetailPromotionNavbar = () => {
  const param = useParams();
  return (
    <Navbar
      title="HOME0202"
      subTitle="Promotion Code"
      backLink="/promotions"
      rightButton={
        <Link to={`/edit-promotion/${param.promotion_id}`}>
          <button className="btn-primary">แก้ไข</button>
        </Link>
      }
    />
  );
};

export const EditPromotionNavbar = ({ onConfirm }) => (
  <Navbar
    title="บริการย่อย"
    subTitle="บริการ"
    // backLink="/services"
    leftButton={
      <Link to="/promotions">
        <button className="btn-primary">ยกเลิก</button>
      </Link>
    }
    rightButton={
      <button className="btn-primary" onClick={onConfirm} type="submit">
        ยืนยัน
      </button>
    }
  />
);
