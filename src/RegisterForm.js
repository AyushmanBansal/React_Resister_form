import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const validateFile = (fileList) => {
    const file = fileList[0];
    if (!file) return "Profile photo is required.";
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      return "Only JPEG or PNG images are allowed.";
    }
    if (file.size > 2 * 1024 * 1024) {
      return "File size must be under 2MB.";
    }
    return true;
  };

  const onSubmit = (data) => {
    const photoURL = URL.createObjectURL(data.profilePhoto[0]);
    const output = {
      ...data,
      profilePhoto: photoURL,
    };
    setSubmittedData(output);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
          <label>First Name</label>
          <input
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            })}
          />
          <p>{errors.firstName?.message}</p>
        </div>

        <div>
          <label>Last Name</label>
          <input
            {...register("lastName", {
              required: "Last name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            })}
          />
          <p>{errors.lastName?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone must be 10 digits",
              },
            })}
          />
          <p>{errors.phone?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <label>Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            {...register("profilePhoto", {
              validate: validateFile,
            })}
          />
          <p>{errors.profilePhoto?.message}</p>
        </div>

        <button type="submit">Register</button>
      </form>

      {/* Submitted Data Display */}
      {submittedData && (
        <div className="submitted-info">
          <h3>Submitted Info</h3>
          <p><strong>First Name:</strong> {submittedData.firstName}</p>
          <p><strong>Last Name:</strong> {submittedData.lastName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
          <div>
            <strong>Profile Photo:</strong><br />
            <img
              src={submittedData.profilePhoto}
              alt="Profile"
              style={{ width: "150px", marginTop: "10px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;