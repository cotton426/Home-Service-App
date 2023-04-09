import React, { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    length: false,
  });
  const [isFocused, setIsFocused] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,}$/;
    setPasswordValidation({
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      length: password.length >= 8,
    });
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }
    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    } else {
      if (!validatePassword(formData.password)) {
        newErrors.password =
          "Password must have at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long";
      }
    }
    if (formData.phone.trim() === "") {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log(formData);
    } else {
      console.log("Form has errors, cannot submit");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      validatePassword(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    const formattedValue = value.replace(/\D/g, "");
    if (formattedValue.length <= 10) {
      setFormData({ ...formData, [name]: formattedValue });
    }
  };

  const formFields = [
    {
      label: "ชื่อ นามสกุล",
      name: "username",
      placeholder: "กรุณากรอกชื่อ นามสกุล",
      type: "text",
    },
    {
      label: "เบอร์โทรศัพท์",
      name: "phone",
      placeholder: "กรุณากรอกเบอร์โทรศัพท์",
      type: "tel",
      onChange: handlePhoneChange,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "กรุณากรอกอีเมล",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "กรุณากรอกรหัสผ่าน",
      type: "password",
    },
    {
      label: "Password is a required field",
      name: "password-criteria",
      type: "none",
    },
  ];
  return (
    <div className="flex w-screen justify-center pt-[1%] ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white w-[45%] px-[5%] py-[2%] border border-gray-300 rounded-lg"
      >
        <h1 className="text-center font-medium text-blue-950 text-4xl">
          ลงทะเบียน
        </h1>
        {formFields.map((field, index) => (
          <div key={index} className="flex flex-col">
            {field.name === "password-criteria" && isFocused && (
              <div className="password-criteria text-sm font-normal">
                {field.label}
                <ul>
                  <li className="text-sm font-normal "
                    style={{
                      color: passwordValidation.uppercase ? "green" : "red",
                    }}
                  >
                    Uppercase letter
                  </li>
                  <li className="text-sm font-normal "
                    style={{
                      color: passwordValidation.lowercase ? "green" : "red",
                    }}
                  >
                    Lowercase letter
                  </li>
                  <li className="text-sm font-normal"
                    style={{
                      color: passwordValidation.number ? "green" : "red",
                    }}
                  >
                    Number
                  </li>
                  <li className="text-sm font-normal"
                    style={{
                      color: passwordValidation.special ? "green" : "red",
                    }}
                  >
                    Special character e.g. !?@#$%
                  </li>
                  <li className="text-sm font-normal"
                    style={{
                      color: passwordValidation.length ? "green" : "red",
                    }}
                  >
                    {" "}
                    7 characters
                  </li>
                </ul>
              </div>
            )}
            {field.name !== "password-criteria" && (
              <>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  className="input-default"
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={field.onChange ? field.onChange : handleChange}
                  onFocus={field.name === "password" ? handleFocus : null}
                  onBlur={field.name === "password" ? handleBlur : null}
                />
                {errors[field.name] && (
                  <p className="error-massage">{errors[field.name]}</p>
                )}
              </>
            )}
          </div>
        ))}

        <button type="submit" className="btn-primary mt-6">
          ลงทะเบียน
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
