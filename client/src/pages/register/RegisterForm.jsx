import React, { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    // Perform validation on formData and set any errors to newErrors object
    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }
    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    }
    if (formData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Submit the form
      console.log(formData);
    } else {
      console.log("Form has errors, cannot submit");
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex w-screen justify-center pt-[3%] ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white w-[45%] px-[5%] py-[2%] border border-gray-300 rounded-lg"
      >
        <h1 className="text-center font-medium text-blue-950 text-4xl">
          ลงทะเบียน
        </h1>
        <div className="flex flex-col">
          <label htmlFor="username">ชื่อ นามสกุล</label>
          <input
            type="text"
            id="username"
            name="username"
            className="input-default"
            placeholder="กรุณากรอกชื่อ นามสกุล"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-default"
            placeholder="กรุณากรอกชื่อ นามสกุล"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-default"
            placeholder="กรุณากรอกชื่อ นามสกุล"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="input-default"
            placeholder="กรุณากรอกชื่อ นามสกุล"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="btn-primary mt-6">
          ลงทะเบียน
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
