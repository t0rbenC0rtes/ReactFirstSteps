import React, { useState } from "react";

const validationRules = {
  firstName: {
    validate: (value) => value.trim() !== "",
    message: "First name is required.",
  },
  lastName: {
    validate: (value) => value.trim() !== "",
    message: "Last name is required.",
  },
  age: {
    validate: (value) => /^\d+$/.test(value),
    message: "Age must be a number.",
  },
  email: {
    validate: (value) => /\S+@\S+\.\S+/.test(value),
    message: "Invalid email.",
  },
  phoneNumber: {
    validate: (value) => /^\d{10}$/.test(value),
    message: "Phone number must be 10 digits.",
  },
  password: {
    validate: (value) => value.length >= 6,
    message: "Password must be at least 6 characters.",
  },
  repeatPassword: {
    validate: (value, formData) => value === formData.password,
    message: "Passwords do not match.",
  },
};

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return;

    const isValid = rule.validate(value, formData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValid ? "" : rule.message,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const rule = validationRules[key];
      if (rule && !rule.validate(formData[key], formData)) {
        newErrors[key] = rule.message;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="formValidation">
      <h1>Form Validation</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div className="formField" key={field}>
            <label>
              {field.replace(/([A-Z])/g, " $1")}:
              <input
                type={
                  field === "password" || field === "repeatPassword"
                    ? "password"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                style={{
                  borderColor: errors[field]
                    ? "red"
                    : formData[field]
                    ? "green"
                    : "#ccc",
                  borderWidth: "2px",
                }}
                placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1")}`}
              />
            </label>
            {errors[field] && <span>{errors[field]}</span>}
          </div>
        ))}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      {isSubmitted && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Form Data:</h2>
          <ul>
            {Object.entries(formData).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/([A-Z])/g, " $1")}</strong>: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Form;
