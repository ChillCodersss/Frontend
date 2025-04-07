import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from '@mui/material/useMediaQuery';
import './Recruitment.css';
import background from '../assets/reqruitment_background_desktop.jpg';
import mobile_background from '../assets/reqruitment_background_mobile.jpg'

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const mobile = useMediaQuery("(max-width: 50em)");
    const tablet = useMediaQuery("(min-width: 50em) and (max-width: 80em)");

    const rec_header_text1 = "مشاور شوید";
    const rec_header_text2 = "از طریق فرم زیر درخواست استخدام خود را ثبت کنید";
    let form_width_percent = "60%";

    if (tablet || mobile) {
        form_width_percent = "70%";
    }

    let form_box_sx = !mobile ? {
        display: "grid",
        gridAutoRows: '1fr',
        gridAutoColumns: '1fr',
        columnGap: "20px",
        rowGap: "20px",
        width: "100%",
        backgroundColor: "#ffffff80",
        borderRadius: "12px",
        padding: "30px 50px",
        boxSizing: "border-box"
    } : {
        Gap: "20px",
        width: "100%",
        padding: "0px 30px",
        boxSizing: "border-box"
    };

    return (
        <div
            className="rec-bg"
            style={{ backgroundImage: `url(${ mobile ? mobile_background : background })` }}
        >
            {/* محتوای اصلی */}
            <div className="rec-header">
                <h1 className="rec-header-text1">{ rec_header_text1 }</h1>
                <p className="rec-header-text2">{ rec_header_text2 }</p>
            </div>
            <div className="rec-form">
                <form style={{ width: "100%", maxWidth: form_width_percent}}>
                    <Box sx={ form_box_sx }>
                        {/* First Name Field */}
                        <Box sx={{ gridRow: '1', gridColumn: '3 / 5' }}>
                            <InputBox
                                label="نام"
                                name="name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                type="name"
                                placeholder="نام"
                            />
                        </Box>

                        {/* Last Name Field */}
                        <Box sx={{ gridRow: '1', gridColumn: '1 / 3' }}>
                            <InputBox
                                label="نام خانوادگی"
                                name="name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                type="name"
                                placeholder="نام خانوادگی"
                            />
                        </Box>

                        {/* Phone Number Field */}
                        <Box sx={{ gridRow: '2', gridColumn: '3 / 5' }}>
                            <InputBox
                                label="شماره تماس (موبایل)"
                                name="phone number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                type="phone number"
                                placeholder="09123456789"
                            />
                        </Box>

                        {/* Email Field */}
                        <Box sx={{ gridRow: '2', gridColumn: '1 / 3' }}>
                            <InputBox
                                label="ایمیل"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder="example@mail.com"
                            />
                        </Box>

                        {/* State Dropdown */}
                        <Box sx={{ gridRow: '3', gridColumn: '2 / 4' }}>
                            <InputBox
                                label="استان"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                type="state"
                                placeholder="استان"
                            />
                        </Box>

                        {/* University Field */}
                        <Box sx={{ gridRow: '4', gridColumn: '3 / 5' }}>
                            <InputBox
                                label="دانشگاه"
                                name="university"
                                value={formData.university}
                                onChange={handleInputChange}
                                type="university"
                                placeholder="دانشگاه"
                            />
                        </Box>

                        {/* Field Field */}
                        <Box sx={{ gridRow: '4', gridColumn: '1 / 3' }}>
                            <InputBox
                                label="رشته تحصیلی"
                                name="field"
                                value={formData.field}
                                onChange={handleInputChange}
                                type="field"
                                placeholder="رشته"
                            />
                        </Box>

                        {/* UEE Year Field */}
                        <Box sx={{ gridRow: '5', gridColumn: '3 / 5' }}>
                            <InputBox
                                label="سال ورود به دانشگاه"
                                name="year"
                                value={formData.uee_year}
                                onChange={handleInputChange}
                                type="year"
                                placeholder="1404"
                            />
                        </Box>

                        {/* UEE Rank Field */}
                        <Box sx={{ gridRow: '5', gridColumn: '1 / 3' }}>
                            <InputBox
                                label="رتبه کشوری کنکور"
                                name="rank"
                                value={formData.uee_rank}
                                onChange={handleInputChange}
                                type="rank"
                                placeholder="رتبه"
                            />
                        </Box>

                        {/* Description Field */}
                        <Box sx={{ gridRow: '6 / 8', gridColumn: '1 / 5' } }>
                            <InputBox
                                label="سابقه کار"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="توضیحات"
                            />
                        </Box>

                        {/* Submit Button */}
                        <Box
                            sx={{
                                gridRow: '8', gridColumn: '2 / 4',
                                display: "flex", justifyContent: "center",
                            }}
                        >
                            <ConfirmButton name="ارسال فرم" />
                        </Box>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default Recruitment;