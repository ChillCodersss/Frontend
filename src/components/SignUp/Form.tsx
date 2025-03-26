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
    confirmedPassword: "",
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
    const { firstName, lastName, email, password, confirmedPassword } =
      formData;
    const errors: string[] = [];

    if (!email || !firstName || !lastName || !password || !confirmedPassword) {
      errors.push("لطفا همه‌‌ فیلد ها را پر کنید");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("ایمیل معتبر نیست");
    } else if (/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      errors.push("رمز عبور باید انگلیسی باشد");
    } else if (password.length < 8 || !/\d/.test(password)) {
      errors.push("رمز عبور باید حداقل 8 کاراکتر و شامل عدد باشد");
    } else if (password !== confirmedPassword) {
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

  return (
    <form onSubmit={handleSubmit}>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "5px", sm: "10px" }, 
          width: { xs: "90%", sm: "100%" }, 
          maxWidth: "400px", 
          height: "100%",
          justifyContent: "center",
          marginRight : { xs: "auto", sm: "40px" },
          marginLeft : { xs: "auto", sm: "0" },

        }}
      >
        <Box
          component="h1"
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "28px" },
            marginBottom: { xs: "5px", sm: "5px" },
            textAlign: "center",
            direction: "rtl",
            color: "black",
            fontWeight: "bold",
          }}
        >
          ثبت نام
        </Box>

          <InputBox
            label="ایمیل"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@gmail.com"
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon sx={{ marginLeft: "-2px", marginTop: "2px" }} />
              </InputAdornment>
            }
          />
          <InputBox
            label="نام"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="نام خود را وارد کنید"
            startAdornment={
              <InputAdornment position="start">
                <PersonIcon sx={{ marginLeft: "-2px", marginTop: "2px" }} />
              </InputAdornment>
            }
            direction="rtl"
          />

          <InputBox
            label="نام خانوادگی"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="نام خانوداگی خود را وارد کنید"
            startAdornment={
              <InputAdornment position="start">
                <PersonIcon sx={{ marginLeft: "-2px", marginTop: "2px" }} />
              </InputAdornment>
            }
            direction="rtl"
          />

          <InputBox
            label="رمز عبور"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  sx={{ marginLeft: "-10px" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />

          <InputBox
            label="تکرار رمز عبور"
            name="confirmedPassword"
            value={formData.confirmedPassword}
            onChange={handleInputChange}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  sx={{ marginLeft: "-10px" }}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
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
            marginTop: { xs: "15px", sm: "20px" },
          }}
        >
          <ConfirmButton type="submit" name="ثبت نام" height={"35px"} />
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
        </Box>
      </Box>
    </form>

  );
};

export default SignUpForm;
