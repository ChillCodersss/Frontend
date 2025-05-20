// import InputBox from "@/components/common/inputbox";
import ConfirmButton from "@/components/common/ConfirmButton";
import FormItem from "@/components/Recruitment/FormItem";
import DropDown from "@/components/Recruitment/DropDown";
import ImageInput from "@/components/Recruitment/ImageInput";
// import ImageInputButton from "@/components/Recruitment/ImageInputButton";
// import ImageDisplay from "@/components/Recruitment/ImageDisplay";
import React, { useEffect, useState } from "react";
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
        HsMajor: "",
        UniName: "",
        UniMajor: "",
        EntranceExamYear: "",
        CountryRanking: "",
        Employmenthistory: "",
    });
    //const [isSubmitting, setIsSubmitting] = useState(false);
    const [provinceOptions, setProvinceOptions] = useState<string[]>([]);
    const [provinceLoading, setProvinceLoading] = useState(false);
    const [provinceInputValue, setProvinceInputValue] = useState("");

    const HsMajorOptions = ["ریاضی", "تجربی", "انسانی"];
    const [hsMajorInputValue, setHsMajorInputValue] = useState("");

    const navigate = useNavigate();

    const [StudentCardPic, setStudentCardPic] = useState<File>();
    const [picInfo, setPicInfo] = useState({
        URL: "",
        Name: "",
        Size: "",
    });

    const [uploaded, setUplaoded] = useState(false);
    const handleImageDelete = (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
        setStudentCardPic(undefined);

        setUplaoded(false);
        setPicInfo({
            URL: "",
            Name: "",
            Size: "",
        })
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // console.log(name, value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProvinceChange = (province_value: string | null) => {
        // console.log("Province", province_value);
        setFormData((prevData) => ({
            ...prevData,
            Province: province_value || "",
        }));
    };

    const handleHsMajorChange = (hsmajor_value: string | null) => {
        // console.log("HsMajor", hsmajor_value);
        setFormData((prevData) => ({
            ...prevData,
            HsMajor: hsmajor_value || "",
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const f = event.target.files?.[0];
        setStudentCardPic(f);

        if (f) {
            // calculating file size
            let file_size = f?.size;
            let size_unit = "KB";
            if (file_size >= 1000000) {
                size_unit = "MB";
                file_size /= 1000000;
            } else {
                file_size /= 1000;
            }

            setUplaoded(true);
            setPicInfo((prev) => ({
                ...prev,
                Name: f?.name ? f.name : "",
                Size: `${file_size.toFixed(2)} ${size_unit}`,
                URL: URL.createObjectURL(f),
            }));
        }

        event.target.value = "";     // allowing user to choose same file
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            setProvinceLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:8080/api/Provinces/Dropdown?Text=${encodeURIComponent(provinceInputValue)}`
                );
                const data = await response.json();
                if (data.isSuccess) {
                    setProvinceOptions(data.value);
                }
            } catch (error) {
                console.error("Error fetching provinces:", error);
            } finally {
                setProvinceLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchProvinces();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [provinceInputValue]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //setIsSubmitting(true);

        const newFormData = new FormData();
        newFormData.append("FirstName", formData.FirstName);
        newFormData.append("LastName", formData.LastName);
        newFormData.append("PhoneNumber", formData.PhoneNumber);
        newFormData.append("Email", formData.Email);
        newFormData.append("Province", formData.Province);
        if (formData.HsMajor === "ریاضی")
            newFormData.append("HsMajor", "1");
        else if (formData.HsMajor === "تجربی")
            newFormData.append("HsMajor", "2");
        else if (formData.HsMajor === "انسانی")
            newFormData.append("HsMajor", "3");
        else
            newFormData.append("HsMajor", "0");
        newFormData.append("UniName", formData.UniName);
        newFormData.append("UniMajor", formData.UniMajor);
        newFormData.append("EntranceExamYear", formData.EntranceExamYear);
        newFormData.append("CountryRanking", formData.CountryRanking);
        newFormData.append("Employmenthistory", formData.Employmenthistory);
        // newFormData.append("StudentCardPic", formData.StudentCardPic);
        newFormData.append("StudentCardPic", StudentCardPic ? StudentCardPic : "");

        try {
            const response = await fetch("http://localhost:8080/api/CounselorRecruitments/Create", {
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
            toast.success(data?.message || "فرم شما با موفقیت ارسال شد", {
                position: "bottom-right",
                autoClose: 5000,
                rtl: true,
            });

            setTimeout(() => {
                navigate("/Landing");
            }, 5000);

            setFormData({
                FirstName: "",
                LastName: "",
                PhoneNumber: "",
                Email: "",
                Province: "",
                HsMajor: "",
                UniName: "",
                UniMajor: "",
                EntranceExamYear: "",
                CountryRanking: "",
                Employmenthistory: "",
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

    const submit_button_box_sx = {
        gridRow: '10', gridColumn: '2 / 4', padding: '35px 0px',
        display: "flex", justifyContent: "center", alignItems: "center"
    };
    const submit_button_box_sx_mobile = {
        gridRow: '15', display: "flex",
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
            type: "text", placeholder: "example@mail.com", direction: "ltr", height: "10px",
        },
        // {
        //     item_type: "i",
        //     row: { m: '5', d: '3' }, column: { m: '1', d: '3 / 5' },
        //     label: "استان", value: formData.Province, name: "Province",
        //     type: "text", placeholder: "استان", direction: "rtl", height: "10px",
        // },
        // {
        //     item_type: "i",
        //     row: { m: '6', d: '3' }, column: { m: '1', d: '1 / 3' },
        //     label: "رشته تحصیلی", value: formData.HsMajor, name: "HsMajor",
        //     type: "text", placeholder: "ریاضی", direction: "rtl", height: "10px",
        // },
        {
            item_type: "i",
            row: { m: '7', d: '4' }, column: { m: '1', d: '3 / 5' },
            label: "دانشگاه", value: formData.UniName, name: "UniName",
            type: "text", placeholder: "علم و صنعت", direction: "rtl", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '8', d: '4' }, column: { m: '1', d: '1 / 3' },
            label: "رشته دانشگاهی", value: formData.UniMajor, name: "UniMajor",
            type: "text", placeholder: "مهندسی کامپیوتر", direction: "rtl", height: "10px",
        },
        {
            item_type: "i",
            row: { m: '9', d: '5' }, column: { m: '1', d: '3 / 5' },
            label: "سال کنکور", value: formData.EntranceExamYear, name: "EntranceExamYear",
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
            row: { m: '13 / 15', d: '8 / 10' }, column: { m: '1', d: '1 / 5' },
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

                        {/* Province DropDown */}
                        <Box
                            sx={{
                                gridRow: mobile ? "5" : "3", gridColumn: mobile ? "1" : "3 / 5",
                            }}
                        >
                            <DropDown
                                label={"استان"}
                                palceholder={"جستجوی استان..."}
                                value={formData.Province}
                                inputValue={provinceInputValue}
                                options={provinceOptions}
                                optionsLoading={provinceLoading}
                                changeHandler={handleProvinceChange}
                                inputHandler={setProvinceInputValue}
                            />
                        </Box>

                        {/* HsMajor DropDown */}
                        <Box
                            sx={{
                                gridRow: mobile ? "6" : "3", gridColumn: mobile ? "1" : "1 / 3",
                            }}
                        >
                            <DropDown
                                label={"رشته تحصیلی"}
                                palceholder={"جستجوی رشته..."}
                                value={formData.HsMajor}
                                inputValue={hsMajorInputValue}
                                options={HsMajorOptions}
                                optionsLoading={false}
                                changeHandler={handleHsMajorChange}
                                inputHandler={setHsMajorInputValue}
                            />
                        </Box>

                        {/* Image Input */}
                        <Box
                            sx={{
                                gridRow: mobile ? "11 / 13" : "6 / 8", gridColumn: mobile ? "1" : "1 / 5",
                                justifyContent: "center", alignItems: "center",
                            }}
                        >
                            <ImageInput
                                label={"تصویر کارت دانشجویی یا مدرک دانشگاهی"}
                                isMobile={mobile}
                                uploaded={uploaded}
                                imageName={picInfo.Name}
                                imageSize={picInfo.Size}
                                imageURL={picInfo.URL}
                                inputName={"StudentCardPic"}
                                inputID={"image-input"}
                                handleImageDelete={handleImageDelete}
                                onChange={handleImageChange}
                            />
                        </Box>

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