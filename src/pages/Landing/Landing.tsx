import React, { useEffect, useState } from "react";
// import { useRef } from "react";
import { Box, useMediaQuery, Fade, Zoom } from "@mui/material";
// import { Grow } from "@mui/material";
import { useNavigate } from "react-router";
// import { Card, CardActionArea } from "@mui/material";
// import Marquee from "@/components/Landing/Marquee";
import SecondaryButton from "@/components/common/SecondaryButton";
import CounselorSwiper from "@/components/Landing/Swiper.tsx";
import RoadMap from "@/components/Landing/RoadMap";
import Logo from "@/assets/landing_banner_logo.png";
import ChatImage from "@/assets/chat_screen.jpg";
import RecImage from "@/assets/recruit_screen.jpg";
import './Landing.css';


const Landing: React.FC = () => {
    const [firstTextVisible, setFirstTextVisible] = useState(false);
    const [secondTextVisible, setSecondTextVisible] = useState(false);
    const [imagesVisible, setImagesVisible] = useState({
        row3ImageVisible: false,
        row4ImageVisible: false,
    });
    // const small_screen = useMediaQuery("(min-width: 600px) and (max-width: 749px)");
    const medium_screen = useMediaQuery("(min-width: 750px)");
    const navigate = useNavigate();
    // const not_mobile = small_screen || medium_screen;
    // const reduced_motion = useMediaQuery("(prefers-reduced-motion)");

    const fade_sx = {
        timeout: 800,     // timeout in millisecond
        in: true,
    }

    const zoom_timeout = 600;     // timeout in millisecond

    const our_counselor_marquee_text = "مشاوران ما";
    const our_counselor_motto_text = "همین امروز مشاور خودت رو انتخاب کن و اولین قدم برای آینده‌ی روشن‌تر رو بردار!";
    // const why_our_site_marquee_text = "چرا مشاوریوم؟";
    const banner_h = "تحصیل بهتر، با همراهی مشاوران حرفه‌ای";
    const banner_p = "دوره‌های اختصاصی مشاوره تحصیلی، همراه با ارتباط مستقیم و روزانه با مشاور شخصی شما.";
    const chat_promo_title = "چت آنلاین و ارتباط مستقیم با مشاور";
    const chat_promo_text = `ارتباط بدون واسطه با مشاور، امکان دریافت راهنمایی روزانه، رفع اشکال در برنامه‌ریزی
                            و حتی دریافت انگیزه‌بخشی شخصی، همه از طریق چت اختصاصی در طول مسیر تحصیل.`;
    const recruitment_promo_title = "به جمع مشاوران ما بپیوندید";
    const recruitment_promo_text = `اگر تجربه مشاوره تحصیلی دارید و به پیشرفت دانش‌آموزان علاقه‌مندید، مشاوریوم جای شماست!
                                    با ثبت‌نام به عنوان مشاور، می‌توانید با دانش‌آموزان پرتلاش کار کنید،
                                    درآمد کسب کنید و تاثیر واقعی بسازید.`;
    const road_map_header = "چطور با مشاوریوم شروع کنم؟";
    const road_map_text = "تمام مراحل فقط در چند دقیقه و کاملاً آنلاین!";

    useEffect(() => {
        const firstText = document.querySelectorAll(`[id="firstText"]`);

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry.isIntersecting && entries[0].target === firstText[0]) {
                setFirstTextVisible(true);
                observer.unobserve(firstText[0]);
            }
        }, {
            threshold: 0.3,
        });

        observer.observe(firstText[0]);
    }, []);

    useEffect(() => {
        const secondText = document.querySelectorAll(`[id="secondText"]`);

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry.isIntersecting && entries[0].target === secondText[0]) {
                setSecondTextVisible(true);
                observer.unobserve(secondText[0]);
            }
        }, {
            threshold: 0.3,
        });

        observer.observe(secondText[0]);
    }, []);

    useEffect(() => {
        const images = document.querySelectorAll(".l-row-img");

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (entry.target.id === "row3-img") {
                        setImagesVisible((prev) => ({
                            ...prev,
                            row3ImageVisible: true,
                        }));
                    }
                    if (entry.target.id === "row4-img") {
                        setImagesVisible((prev) => ({
                            ...prev,
                            row4ImageVisible: true,
                        }));
                    }

                    observer.unobserve(entry.target);
                }
            }
        }, {
            threshold: 0.3,
        });

        observer.observe(images[0]);
        observer.observe(images[1]);
    }, []);

    const description_box_sx = {
        display: "flex",
        justifyContent: "center",
        padding: "100px 0px",
        alignItems: "center",
    }

    const text_box_sx = {
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        boxSizing: "border-box",
        rowGap: "20px",
        direction: "rtl"
    };

    return (
        <div style={{width: "100%",}}>
            <main>
                <section className="l-banner">
                    <div className="l-banner-bg">
                        <img className="l-banner-bg-img" src={Logo}/>
                    </div>
                    <Fade {...fade_sx}>
                        <h1 className="l-banner-h">{banner_h}</h1>
                    </Fade>
                    <Fade {...fade_sx}>
                            <p className="l-banner-p">{banner_p}</p>
                    </Fade>
                </section>
                <section id={"RoadMap"} className="l-container l-road-map-container">
                    <h2 className="l-road-map-h">{road_map_header}</h2>
                    <p className="l-road-map-p">{road_map_text}</p>
                    <RoadMap/>
                </section>
                {/* <section id="l-marquee1">
                    <Marquee count={4} text={our_counselor_marquee_text}/>
                </section> */}
                <section className="l-container">
                    <div
                        className="l-swiper-bg-wrapper l-swiper-container"
                    >
                        {/* <div
                            className="l-swiper-bg"
                        />
                        <div
                            className="l-swiper-bg-circle-container"
                        >
                            <div
                                className="l-swiper-bg-circle-wrapper"
                            >
                            </div>
                        </div> */}
                        <div className="l-our-counselor-title-wrapper">
                            <div className="l-our-counselor-title">
                                <p>{our_counselor_marquee_text}</p>
                                <p className="l-our-counselor-motto">{our_counselor_motto_text}</p>
                            </div>
                        </div>
                        <CounselorSwiper/>
                    </div>
                </section>
                {/* <section id="l-marquee2">
                    <Marquee count={3} text={why_our_site_marquee_text}/>
                </section> */}
                <section className="l-row3">
                    <Box sx={{
                        display: "flex",
                        flexDirection: medium_screen ? "row" : "column",
                    }}>
                        <Box
                            height={medium_screen ? "100vh" : "70vh"}
                            minHeight={"450px"}
                            width={medium_screen ? "50%" : "100%"}
                            boxSizing={"border-box"}
                            sx={description_box_sx}
                        >
                            <Fade {...fade_sx} in={firstTextVisible}>
                                <Box sx={text_box_sx}>
                                    <h1 className="l-text-box-h">{chat_promo_title}</h1>
                                    <p id={"firstText"} className="l-text-box-p">{chat_promo_text}</p>
                                    <SecondaryButton
                                        name="خدمات ما"
                                        borderRadius={{xs: "6px", sm: "8px", md: "8px"}}
                                        backgroundColor="primary"
                                        fontSize="1rem"
                                        width={"150px"}
                                        onClick={() => {navigate('./services')}}
                                    />
                                </Box>
                            </Fade>
                        </Box>
                        <Box
                            height={medium_screen ? "100vh" : "50vh"}
                            minHeight={"300px"}
                            width={medium_screen ? "50%" : "100%"}
                            boxSizing={"border-box"}
                            bgcolor={" #1a49ba"}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                            }}
                        >
                            <div style={{
                                overflow: "hidden",
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                            }}>
                                <div 
                                    style={{
                                        backgroundColor: "#09f",
                                        borderRadius: "50%",
                                        width: medium_screen ? "calc(61.94444 * 1vw)" : "calc(124.26667 * 1vw)",
                                        height: medium_screen ? "calc(61.94444 * 1vw)" : "calc(124.26667 * 1vw)",
                                        left: "0",
                                        top: "0",
                                        position: "absolute",
                                        transform: medium_screen ?
                                            "translate(-50%,-50%) translateX(calc(3.75*1vw))" :
                                            "translate(-50%,-50%) translateY(-10px)",
                                    }}
                                />
                            </div>
                            <div className="l-row3-img-wrapper">
                                <Zoom
                                    timeout={zoom_timeout}
                                    in={imagesVisible.row3ImageVisible}
                                    style={{transformOrigin: "center"}}
                                >
                                    <img className="l-row-img" src={ChatImage} id={"row3-img"}/>
                                </Zoom>
                            </div>
                        </Box>
                    </Box>
                </section>
                <section className="l-row4">
                    <Box sx={{
                        display: "flex",
                        flexDirection: medium_screen ? "row" : "column",
                        direction: "rtl"
                    }}>
                        <Box 
                            height={medium_screen ? "100vh" : "70vh"}
                            minHeight={"450px"}
                            width={medium_screen ? "50%" : "100%"}
                            boxSizing={"border-box"}
                            sx={description_box_sx}
                        >
                            <Fade {...fade_sx} in={secondTextVisible}>
                                <Box sx={text_box_sx}>
                                    <h1 className="l-text-box-h">{recruitment_promo_title}</h1>
                                    <p id={"secondText"} className="l-text-box-p">{recruitment_promo_text}</p>
                                    <SecondaryButton
                                        name="استخدام"
                                        borderRadius={{xs: "6px", sm: "8px", md: "8px"}}
                                        backgroundColor="primary"
                                        fontSize="1rem"
                                        width={"150px"}
                                        onClick={() => {navigate('./recruitment')}}
                                    />
                                </Box>
                            </Fade>
                        </Box>
                        <Box
                            height={medium_screen ? "100vh" : "50vh"}
                            minHeight={"300px"}
                            width={medium_screen ? "50%" : "100%"}
                            boxSizing={"border-box"}
                            bgcolor={" #ffda54"}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                            }}
                        >
                            <div style={{
                                overflow: "hidden",
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                            }}>
                                <div 
                                    style={{
                                        backgroundColor: " #ffad42",
                                        borderRadius: "50%",
                                        width: medium_screen ? "calc(61.94444 * 1vw)" : "calc(124.26667*1vw)",
                                        height: medium_screen ? "calc(61.94444 * 1vw)" : "calc(124.26667*1vw)",
                                        right: medium_screen ? "calc(50*1vw)" : "0",
                                        top: "0",
                                        position: "absolute",
                                        transform: medium_screen ? 
                                            "translate(50%,-50%) translate(calc(1.52778*1vw),calc(-3.125*1vw))" :
                                            "translate(50%,-50%)",
                                    }}
                                />
                            </div>
                            <div className="l-row4-img-wrapper">
                                <Zoom
                                    timeout={zoom_timeout}
                                    in={imagesVisible.row4ImageVisible}
                                    style={{transformOrigin: "center"}}
                                >
                                    <img className="l-row-img" src={RecImage} id={"row4-img"}/>
                                </Zoom>
                            </div>
                        </Box>
                    </Box>
                </section>
            </main>
        </div>
    )
}

export default Landing;
