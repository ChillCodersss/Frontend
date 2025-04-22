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
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmedPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/api/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok || data.IsFailure) {
        // نمایش ارورهای ولیدیشن (اگر وجود داشته باشن)
        if (Array.isArray(data.errors)) {
          data.errors.forEach((err: { message: string }) => {
            toast.error(err.message, {
              position: "bottom-right",
              autoClose: 5000,
              rtl: true,
            });
          });
        }
  
        // اگر errors نبود، ولی فیلد Error وجود داشت
        else if (data.message) {
          const messageFromServer = data.message.split("|")[0]; // فقط پیام اول
          toast.error(messageFromServer, {
            position: "bottom-right",
            autoClose: 5000,
            rtl: true,
          });
        }
  
        setIsSubmitting(false);
        return;
      }
  
      // موفقیت
      toast.success(data?.message || "با موفقیت وارد شدید", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
  
      setTimeout(() => {
        navigate("/login");
      }, 2000);
  
      setFormData({         email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmedPassword: "", });
    } catch (error) {
      toast.error("خطا در ارتباط با سرور", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "8px", sm: "10px" },
          width: { xs: "90%", sm: "100%" },
          maxWidth: "400px",
          height: "100%",
          justifyContent: "center",
          marginRight: { xs: "30px", sm: "40px" },
          marginLeft: { xs: "15px", sm: "0" },
        }}
      >
        <Box
          component="h1"
          sx={{
            fontSize: { xs: "22px", sm: "18px", md: "28px" },
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
          placeholder="نام خانوادگی خود را وارد کنید"
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
          <ConfirmButton
            type="submit"
            name={isSubmitting ? "...در حال ثبت" : "ثبت نام"}
            height={"35px"}
            disabled={isSubmitting}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: { xs: "10px", sm: "5px" },
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
