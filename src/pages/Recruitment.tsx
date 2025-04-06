import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import './Recruitment.css';
import background from '../assets/reqruitment_background_desktop.jpg';


const Recruitment: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    return (
        //<div className="rec-wrapper">
            <div
                className="rec-bg"
                style={{ backgroundImage: `url(${background})` }}
            >
                {/* محتوای اصلی */}
                <div className="rec-header">
                    <h1 style={{margin: 0}}>مشاور شوید</h1>
                    <p style={{margin: 0}}>از طریق فرم زیر درخواست استخدام خود را ثبت کنید</p>
                </div>
                <div className="rec-form">
                {/* فرم در سمت چپ */}
                    <form style={{ width: "100%", maxWidth: "55%"}}>
                        <Box
                            sx={{
                                display: "grid",
                                gridAutoRows: '1fr',
                                gridAutoColumns: '1fr',
                                columnGap: "20px",
                                rowGap: "20px",
                                width: "100%",
                                backgroundColor: "#ffffff80",
                                borderRadius: "12px",
                                padding: "15px 50px",
                                boxSizing: "border-box",
                            }}
                        >
                            {/* First Name Field */}
                            <Box sx={{ gridRow: '1', gridColumn: '3 / 5' }}>
                            <InputBox
                                label="نام"
                                name="name"
                                value={formData.email}
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
                                value={formData.password}
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
                                value={formData.password}
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
                                value={formData.password}
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
                                value={formData.password}
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
                                value={formData.password}
                                onChange={handleInputChange}
                                type="university"
                                placeholder="دانشگاه"
                            />
                            </Box>

                            {/* Field Field */}
                            <Box sx={{ gridRow: '4', gridColumn: '1 / 3' }}>
                            <InputBox
                                label="رشته کارشناسی"
                                name="field"
                                value={formData.password}
                                onChange={handleInputChange}
                                type="field"
                                placeholder="رشته"
                            />
                            </Box>

                            {/* UEE Year Field */}
                            <Box sx={{ gridRow: '5', gridColumn: '3 / 5' }}>
                            <InputBox
                                label="سال کنکور"
                                name="year"
                                value={formData.password}
                                onChange={handleInputChange}
                                type="year"
                                placeholder="1404"
                            />
                            </Box>

                            {/* UEE Rank Field */}
                            <Box sx={{ gridRow: '5', gridColumn: '1 / 3' }}>
                            <InputBox
                                label="رتبه کنکور"
                                name="rank"
                                value={formData.password}
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
                                value={formData.password}
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
                                <ConfirmButton name="ورود" />
                            </Box>
                        </Box>
                    </form>
                </div>
            </div>
        //</div>
    );
};

export default Recruitment;