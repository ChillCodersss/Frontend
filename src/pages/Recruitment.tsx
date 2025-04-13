// import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import FormItem from "@/components/Recruitment/FormItem";
import React, { useState } from "react";
import './Recruitment.css';
import "react-toastify/dist/ReactToastify.css";
import background from '../assets/recruitment_background_desktop.jpg';
import mobile_background from '../assets/recruitment_background_mobile.jpg';
import background_logo from '../assets/background_logo.jpg';
import { Box, useMediaQuery, Zoom } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";


const Recruitment: React.FC = () => {
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Email: "",
        Province: "",
        SchoolMajor: "",
        UniName: "",
        Major: "",
        EntranceYear: "",
        CountryRanking: "",
        Employmenthistory: "",
        StudentCardPic: "",
        EntranceExamYear: ""
    });
    //const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    // const fetchProvinces = async () => {
    //     try {
    //         const response = await fetch(
    //             `http://localhost:8080/api/Provinces/Dropdown?Text=${encodeURIComponent(formData.Province)}`
    //         );
    //         const data = await response.json();
    //         if (data.isSuccess) {
    //             console.log(data.value)
    //         }
    //     } catch (error) {
    //         console.error("Error fetching provinces:", error);
    //     }
    // };
    // fetchProvinces();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //setIsSubmitting(true);

        const newFormData = new FormData();
        newFormData.append("FirstName", formData.FirstName);
        newFormData.append("LastName", formData.LastName);
        newFormData.append("PhoneNumber", formData.PhoneNumber);
        newFormData.append("Email", formData.Email);
        newFormData.append("Province", formData.Province);
        newFormData.append("UniName", formData.UniName);
        newFormData.append("Major", formData.Major);
        newFormData.append("EntranceYear", formData.EntranceYear);
        newFormData.append("CountryRanking", formData.CountryRanking);
        newFormData.append("Employmenthistory", formData.Employmenthistory);
        newFormData.append("StudentCardPic", formData.StudentCardPic);
        newFormData.append("EntranceExamYear", formData.EntranceExamYear);

        try {
            const response = await fetch("http://localhost:8080/api/CounselorRecruitments/Recruitment", {
                method: "POST",
                body: newFormData,
            });

            const data = await response.json();

            if (!response.ok || data.IsFailure) {
                // اگر errors نبود، ولی فیلد Error وجود داشت
                if (data.message) {
                    const messageFromServer = data.message.split("|")[0]; // فقط پیام اول
                    toast.error(messageFromServer, {
                        position: "bottom-right",
                        autoClose: 5000,
                        rtl: true,
                    });
                }

                //setIsSubmitting(false);
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
                FirstName: "",
                LastName: "",
                PhoneNumber: "",
                Email: "",
                Province: "",
                SchoolMajor: "",
                UniName: "",
                Major: "",
                EntranceYear: "",
                CountryRanking: "",
                Employmenthistory: "",
                StudentCardPic: "",
                EntranceExamYear: ""
            });
        } catch {
            toast.error("خطا در ارتباط با سرور", {
                position: "bottom-right",
                autoClose: 5000,
                rtl: true,
            });
        } finally {
            //setIsSubmitting(false);
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

    const form_box_sx = {
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
    const form_box_sx_mobile = {
        width: "100%",
        padding: "0px 9%",
        boxSizing: "border-box",
        display: "grid",
        gridAutoRows: '1fr',
        gridAutoColumns: '1fr',
        columnGap: "20px",
        rowGap: "20px",
        borderRadius: "12px",
        overflowX: "hidden"
    };

    // const description_label_sx = {
    //     display: "block",
    //     fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
    //     fontWeight: "500",
    //     marginBottom: "7px",
    //     marginRight: "5px",
    //     color: "black",
    //     textAlign: "right",
    //     direction: "rtl",
    // };

    const submit_button_box_sx = {
        gridRow: '8', gridColumn: '2 / 4', padding: '35px 0px',
        display: "flex", justifyContent: "center", alignItems: "center"
    };
    const submit_button_box_sx_mobile = {
        gridRow: '12', display: "flex",
        width: '100%', justifySelf: 'center',
        padding: '0px 30px',
        justifyContent: "center", alignItems: "center"
    };

    const form_items = [
        {
            item_type: "i",
            row: { m: '1', d: '1' }, column: { m: '1', d: '3 / 5' },
            label: "نام", value: formData.FirstName, name: "FirstName",
            type: "text", placeholder: "نام", direction: "rtl", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '2', d: '1' }, column: { m: '1', d: '1 / 3' },
            label: "نام خانوادگی", value: formData.LastName, name: "LastName",
            type: "text", placeholder: "نام خانوادگی", direction: "rtl", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '3', d: '2' }, column: { m: '1', d: '3 / 5' },
            label: "شماره تماس (موبایل)", value: formData.PhoneNumber, name: "PhoneNumber",
            type: "number", placeholder: "09123456789", direction: "ltr", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '4', d: '2' }, column: { m: '1', d: '1 / 3' },
            label: "ایمیل", value: formData.Email, name: "Email",
            type: "email", placeholder: "example@mail.com", direction: "ltr", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '5', d: '3' }, column: { m: '1', d: '3 / 5' },
            label: "استان", value: formData.Province, name: "Province",
            type: "text", placeholder: "استان", direction: "rtl", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '6', d: '3' }, column: { m: '1', d: '1 / 3' },
            label: "رشته تحصیلی", value: formData.SchoolMajor, name: "SchoolMajor",
            type: "text", placeholder: "رشته", direction: "rtl", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '7', d: '4' }, column: { m: '1', d: '3 / 5' },
            label: "دانشگاه", value: formData.UniName, name: "UniName",
            type: "text", placeholder: "دانشگاه", direction: "rtl", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '8', d: '4' }, column: { m: '1', d: '1 / 3' },
            label: "رشته دانشگاهی", value: formData.Major, name: "Major",
            type: "text", placeholder: "رشته", direction: "rtl", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '9', d: '5' }, column: { m: '1', d: '3 / 5' },
            label: "سال ورود به دانشگاه", value: formData.EntranceYear, name: "EntranceYear",
            type: "number", placeholder: "1404", direction: "ltr", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '10', d: '5' }, column: { m: '1', d: '1 / 3' },
            label: "رتبه کشوری کنکور", value: formData.CountryRanking, name: "CountryRanking",
            type: "number", placeholder: "رتبه", direction: "ltr", height: "10px",
        },
        {
            item_type: "t",
            row: { m: '11 / 13', d: '6 / 8' }, column: { m: '1', d: '1 / 5' },
            label: "سابقه کار", value: formData.Employmenthistory, name: "Employmenthistory",
            type: "text", placeholder: "", direction: "rtl", height: "",
        },
    ];

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
                        {form_items.map(
                            (item, index) =>
                            <FormItem
                                isMobile={mobile}
                                gridRow={item.row} 
                                gridColumn={item.column}
                                itemType={item.item_type}
                                key={index}
                            >
                                {item.label}
                                {item.value}
                                {item.name}
                                {item.type}
                                {item.placeholder}
                                {item.direction}
                                {item.height}
                                {handleInputChange}
                            </FormItem>
                        )}

                        {/* Submit Button */}
                        <Box
                            sx={mobile ? submit_button_box_sx_mobile : submit_button_box_sx}
                        >
                            <ConfirmButton name="ارسال فرم" type="submit"/>
                        </Box>

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
                    </Box>
                </Zoom>
                </form>
            </div>
        </>
    );
};

export default Recruitment;