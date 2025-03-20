import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    const errors: string[] = [];

    if (!email) {
      errors.push("ایمیل را وارد کنید");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("ایمیل معتبر نیست");
    }

    if (!firstName) {
      errors.push("نام را وارد کنید");
    }

    if (!lastName) {
      errors.push("نام خانوادگی را وارد کنید");
    }

    if (!password) {
      errors.push("رمز عبور را وارد کنید");
    } else if (password.length < 8) {
      errors.push("رمز عبور باید حداقل 8 کاراکتر باشد");
    }

    if (!confirmPassword) {
      errors.push("تکرار رمز عبور را وارد کنید");
    } else if (password !== confirmPassword) {
      errors.push("رمز عبور و تکرار آن مطابقت ندارند");
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          rtl: true, 
        });
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Form Data:", formData); 
      toast.success("ثبت نام با موفقیت انجام شد", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: true, 
      });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "5px", sm: "10px" },
          width: "100%",
          direction: "rtl",
        }}
      >
        <Box
          component="h1"
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            marginBottom: { xs: "5px", sm: "5px" },
            textAlign: "center",
            direction: "rtl",
            color: "black",
          }}
        >
          فرم ثبت نام
        </Box>

        <InputBox
          label="ایمیل"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          placeholder="example@gmail.com"
          icon={<EmailIcon />}
        />

        <InputBox
          label="نام"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="نام خود را وارد کنید"
          icon={<PersonIcon />}
        />

        <InputBox
          label="نام خانوادگی"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="نام خانوداگی خود را وارد کنید"
        />

        <InputBox
          label="رمز عبور"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type={showPassword ? "text" : "password"}
          placeholder="********"
          endAdornment={
            <InputAdornment position="start">
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />

        <InputBox
          label="تکرار رمز عبور"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="********"
          endAdornment={
            <InputAdornment position="start" sx={{ paddingRight: "5px" }}>
              <IconButton
                onClick={handleToggleConfirmPasswordVisibility}
                edge="end"
              >
                {showConfirmPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          }
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: { xs: "5px", sm: "10px" },
          }}
        >
          <ConfirmButton type="submit" children="ثبت نام" />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: { xs: "1px", sm: "5px" },
            marginBottom: { xs: "4px", sm: "10px" },
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
            padding: { xs: "0px 5px", sm: "0px 5px" },
          }}
        >
          <Box
            component="a"
            href="/login"
            sx={{
              color: "black",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            اکانت دارم
          </Box>
          <Box
            component="a"
            href="/go-to-x"
            sx={{
              color: "black",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            فرم استخدام مشاور
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SignUpForm;
