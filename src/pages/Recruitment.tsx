// import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import FormItem from "@/components/Recruitment/FormItem";
import React, { useState } from "react";
import './Recruitment.css';
import "react-toastify/dist/ReactToastify.css";
import background from '../assets/recruitment_background_desktop.jpg';
import mobile_background from '../assets/recruitment_background_mobile.jpg';
import background_logo from '../assets/background_logo.jpg';
import { TextField, Box, useMediaQuery, Fade, Grow, Zoom } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";


const Recruitment: React.FC = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        state: "",
        university: "",
        field: "",
        uee_year: "",
        uee_rank: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value)
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
      
        try {
            const response = await fetch("http://localhost:8080/api/Auth/Login", {
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
                navigate("/Landing");
            }, 2000);
      
            setFormData({
                first_name: "",
                last_name: "",
                phone_number: "",
                email: "",
                state: "",
                university: "",
                field: "",
                uee_year: "",
                uee_rank: "",
                description: ""
            });
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

    const mobile = useMediaQuery("(max-width: 550px)");
    const tablet = useMediaQuery("(min-width: 550px) and (max-width: 80em)");

    const rec_header_text1 = "مشاور بشوید";
    const rec_header_text2 = "از طریق فرم زیر درخواست استخدام خود را ثبت کنید";

    const form_transition_probs = {
        timeout: 600,     // timeout in millisecond
        in: true,
        style: {transformOrigin: mobile ? "top" : "center"}
    };

    let form_width_percent = "60%";
    if (tablet) {
        form_width_percent = "70%";
    }
    if (mobile) {
        form_width_percent = "100%";
    }

    let form_box_sx = {
        display: "grid",
        gridAutoRows: '1fr',
        gridAutoColumns: '1fr',
        columnGap: "25px",
        rowGap: "5px",
        width: "100%",
        backgroundColor: "#ffffff80",
        borderRadius: "12px",
        padding: "30px 50px",
        boxSizing: "border-box",
        boxShadow: 5
    };
    let form_box_sx_mobile = {
        width: "100%",
        padding: "0px 9%",
        boxSizing: "border-box",
        display: "grid",
        gridAutoRows: '1fr',
        gridAutoColumns: '1fr',
        columnGap: "20px",
        rowGap: "20px",
        borderRadius: "12px",
    };

    let description_label_sx = {
        display: "block",
        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
        fontWeight: "500",
        marginBottom: "7px",
        marginRight: "5px",
        color: "black",
        textAlign: "right",
        direction: "rtl",
    };

    let submit_button_box_sx = {
        gridRow: '8', gridColumn: '2 / 4', padding: '35px 0px',
        display: "flex", justifyContent: "center", alignItems: "center"
    };
    let submit_button_box_sx_mobile = {
        gridRow: '12', display: "flex",
        width: '100%', justifySelf: 'center',
        padding: '0px 30px',
        justifyContent: "center", alignItems: "center"
    };

    let form_items = {
        item_types: [
            "i", "i", "i", "i", "i", "i", "i", "i", "i", "t",
        ],
        rows: [
            { m: '1', d: '1' },
            { m: '2', d: '1' },
            { m: '3', d: '2' },
            { m: '4', d: '2' },
            { m: '5', d: '3' },
            { m: '6', d: '3' },
            { m: '7', d: '4' },
            { m: '8', d: '4' },
            { m: '9', d: '5' },
            { m: '10 / 12', d: '6 / 8' },
        ],
        columns: [
            { m: '1', d: '3 / 5' },
            { m: '1', d: '1 / 3' },
            { m: '1', d: '3 / 5' },
            { m: '1', d: '1 / 3' },
            { m: '1', d: '3 / 5' },
            { m: '1', d: '1 / 3' },
            { m: '1', d: '3 / 5' },
            { m: '1', d: '1 / 3' },
            { m: '1', d: '2 / 4' },
            { m: '1', d: '1 / 5' },
        ],
        labels: [
            "نام",
            "نام خانوادگی",
            "شماره تماس (موبایل)",
            "ایمیل",
            "دانشگاه",
            "رشته تحصیلی",
            "سال ورود به دانشگاه",
            "رتبه کشوری کنکور",
            "استان",
            "سابقه کار",
        ],
        values: [
            formData.first_name,
            formData.last_name,
            formData.phone_number,
            formData.email,
            formData.university,
            formData.field,
            formData.uee_year,
            formData.uee_rank,
            formData.state,
            formData.description,
        ],
        names: [
            "first_name",
            "last_name",
            "phone_number",
            "email",
            "university",
            "field",
            "uee_year",
            "uee_rank",
            "state",
            "description",
        ],
        types: [
            "text",
            "text",
            "number",
            "email",
            "text",
            "text",
            "number",
            "number",
            "text",
            "text",
        ],
        placeholders: [
            "نام",
            "نام خانوادگی",
            "09123456789",
            "ایمیل",
            "دانشگاه",
            "رشته",
            "1404",
            "رتبه",
            "استان",
            "",
        ],
        directions: [
            "rtl",
            "rtl",
            "ltr",
            "ltr",
            "rtl",
            "rtl",
            "ltr",
            "ltr",
            "rtl",
            "rtl",
        ],
        heights: [
            "10px",
            "10px",
            "10px",
            "10px",
            "10px",
            "10px",
            "10px",
            "10px",
            "10px",
            "10px",
        ]
    };

    return (
        <>
            <div
                className="rec-bg"
                style={{ backgroundImage: `url(${ mobile ? mobile_background : background })` }}
            >
            </div>
            <div
                className="rec-bg-logo"
                style={{ backgroundImage: `url(${ background_logo })` }}
            />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* محتوای اصلی */}
            <div className="rec-header">
                <h1 className="rec-header-text1">{ rec_header_text1 }</h1>
                <p className="rec-header-text2">{ rec_header_text2 }</p>
            </div>
            <div className="rec-form">
                <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: form_width_percent}}>
                <Zoom {...form_transition_probs}>
                    <Box sx={ mobile ? form_box_sx_mobile : form_box_sx }>
                        {form_items.item_types.map(
                            (item, index) =>
                            <FormItem
                                isMobile={mobile}
                                gridRow={form_items.rows[index]} 
                                gridColumn={form_items.columns[index]}
                                itemType={item}
                                key={index}
                            >
                                {form_items.labels[index]}
                                {form_items.values[index]}
                                {form_items.names[index]}
                                {form_items.types[index]}
                                {form_items.placeholders[index]}
                                {form_items.directions[index]}
                                {form_items.heights[index]}
                                {handleInputChange}
                            </FormItem>
                        )}

                        {/* First Name Field */}
                        {/* <Box sx={mobile ? { gridRow: '1' } : { gridRow: '1', gridColumn: '3 / 5' }}>
                            <InputBox
                                label="نام"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="نام"
                                direction="rtl"
                                height={"10px"}
                            />
                        </Box> */}

                        {/* Last Name Field */}
                        {/* <Box sx={mobile ? { gridRow: '2' } : { gridRow: '1', gridColumn: '1 / 3' }}>
                            <InputBox
                                label="نام خانوادگی"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="نام خانوادگی"
                                direction="rtl"
                                height={"10px"}
                            />
                        </Box> */}

                        {/* Phone Number Field */}
                        {/* <Box sx={mobile ? { gridRow: '3' } : { gridRow: '2', gridColumn: '3 / 5' }}>
                            <InputBox
                                label="شماره تماس (موبایل)"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                type="tel"
                                placeholder="09123456789"
                                height={"10px"}
                            />
                        </Box> */}

                        {/* Email Field */}
                        {/* <Box sx={mobile ? { gridRow: '4' } : { gridRow: '2', gridColumn: '1 / 3' }}>
                            <InputBox
                                label="ایمیل"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder="example@mail.com"
                                height={"10px"}
                            />
                        </Box> */}

                        {/* University Field */}
                        {/* <Box sx={mobile ? { gridRow: '5' } : { gridRow: '3', gridColumn: '3 / 5' }}>
                            <InputBox
                                label="دانشگاه"
                                name="university"
                                value={formData.university}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="دانشگاه"
                                direction="rtl"
                                height={"10px"}
                            />
                        </Box> */}

                        {/* Field Field */}
                        {/* <Box sx={mobile ? { gridRow: '6' } : { gridRow: '3', gridColumn: '1 / 3' }}>
                            <InputBox
                                label="رشته تحصیلی"
                                name="field"
                                value={formData.field}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="رشته"
                                direction="rtl"
                                height={"10px"}
                            />
                        </Box> */}

                        {/* UEE Year Field */}
                        {/* <Box sx={mobile ? { gridRow: '7' } : { gridRow: '4', gridColumn: '3 / 5' }}>
                            <InputBox
                                label="سال ورود به دانشگاه"
                                name="uee_year"
                                value={formData.uee_year}
                                onChange={handleInputChange}
                                type="number"
                                placeholder="1404"
                                height={"10px"}
                            />
                        </Box> */}

                        {/* UEE Rank Field */}
                        {/* <Box sx={mobile ? { gridRow: '8' } : { gridRow: '4', gridColumn: '1 / 3' }}>
                            <InputBox
                                label="رتبه کشوری کنکور"
                                name="uee_rank"
                                value={formData.uee_rank}
                                onChange={handleInputChange}
                                type="number"
                                placeholder="رتبه"
                                height={"10px"}
                            />
                        </Box> */}

                        {/* State Dropdown */}
                        {/* <Box sx={mobile ? { gridRow: '9' } : { gridRow: '5', gridColumn: '2 / 4' }}>
                            <InputBox
                                label="استان"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="استان"
                                direction="rtl"
                                height={"10px"}
                            />
                        </Box> */}

                        {/* Description Field */}
                        {/* <Box sx={mobile ? { gridRow: '10 / 12' } : { gridRow: '6 / 8', gridColumn: '1 / 5' } }>
                            <Box component="label" sx={ description_label_sx }>
                                سابقه کار
                            </Box>
                            <TextField
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                multiline
                                rows={mobile ? 4 : 6}
                                fullWidth
                                variant="outlined"
                                margin="none"
                                sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "white",
                                    borderRadius: { xs: "6px", sm: "8px", md: "8px" },
                                    transition: "border-color 0.3s ease",
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgb(204, 207, 209)",
                                    borderWidth: "2px",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1976d2",
                                    borderWidth: "2.3px",
                                    },
                                },
                                "& .MuiOutlinedInput-input": {
                                    textAlign: "right",
                                    direction: "rtl",
                                },
                                }}
                            />
                        </Box> */}

                        {/* Submit Button */}
                        <Box
                            sx={mobile ? submit_button_box_sx_mobile : submit_button_box_sx}
                        >
                            <ConfirmButton name="ارسال فرم" type="submit"/>
                        </Box>
                    </Box>
                    </Zoom>
                </form>
            </div>
        </>
    );
};

export default Recruitment;