import React, { useEffect, useState } from "react";
// import { useRef } from "react";
import { Box, useMediaQuery, Fade } from "@mui/material";
// import { Paper, Grow } from "@mui/material";
import { useNavigate } from "react-router";
// import { Card, CardActionArea } from "@mui/material";
// import Marquee from "@/components/Landing/Marquee";
import SecondaryButton from "@/components/common/SecondaryButton";
import CounselorSwiper from "@/components/Landing/Swiper.tsx";
import Footer from "@/components/Landing/Footer";
import RoadMap from "@/components/Landing/RoadMap";
import Header from "@/components/Header/Header";
import Logo from "@/assets/landing_banner_logo.png";
import './Landing.css';


const Landing: React.FC = () => {
    // const [firstRowVisible, setFirstRowVisible] = useState(false);
    const [firstTextVisible, setFirstTextVisible] = useState(false);
    const [secondTextVisible, setSecondTextVisible] = useState(false);
    // const small_screen = useMediaQuery("(min-width: 600px) and (max-width: 749px)");
    const medium_screen = useMediaQuery("(min-width: 750px)");
    const navigate = useNavigate();
    // const not_mobile = small_screen || medium_screen;
    // const reduced_motion = useMediaQuery("(prefers-reduced-motion)");

    // const paper_transition_props = {
    //     timeout: 600,     // timeout in millisecond
    //     in: firstRowVisible,
    // };

    const fade_sx = {
        timeout: 600,     // timeout in millisecond
        in: true,
    }

    // const test_text_fa =   `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، 
    //                         و با استفاده از طراحان گرافیک است، چاپگرها ون و سطرآنچنان که لازم است،
    //                         و برای شرایط فعلی تکنولوژی مورد نیاز، و متخصصان را می طلبد.`;
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

    // const firstRowRef = useRef(null);

    // useEffect(() => {
    //     const firstRow = document.querySelectorAll(".l-first-row");

    //     const observer = new IntersectionObserver((entries) => {
    //         const entry = entries[0];

    //         if (entry.isIntersecting) {
    //             setFirstRowVisible(true);
    //             observer.unobserve(firstRow[0]);
    //         }
    //     }, {
    //         threshold: 0.5,
    //     });

    //     observer.observe(firstRow[0]);
    // }, []);

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

    // let paper_sx = {
    //     direction: "rtl",
    //     fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1rem" },
    //     borderRadius: {xs: "6px", sm: "8px", md: "8px"},
    //     width: "230px", height: "230px", padding: { xs: "1rem", sm: "1rem", md: "1.1rem" },
    // };
    // const small_screen_paper_sx = {
    //     width: "190px", height: "190px",
    // }
    // const medium_screen_paper_sx = {
    //     width: "23vw", height: "23vw",
    // };
    // if (small_screen) {
    //     paper_sx = {...paper_sx, ...small_screen_paper_sx};
    // } else if (medium_screen) {
    //     paper_sx = {...paper_sx, ...medium_screen_paper_sx};
    // }

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
            {/* <header style={{
                backgroundColor: "gray", height: "70px", 
                // position: "sticky", top: "0px",
                display: "flex", alignItems: "center", justifyContent:"center"
                }}
            >
                Header
            </header> */}
            <Header isWhiteMode={true}/>
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
                {/* <section id={"firstRow"} ref={firstRowRef} className="l-container l-first-row">
                    <Grow {...paper_transition_props} timeout={paper_transition_props.timeout + 800} >
                        <Paper elevation={4} sx={ paper_sx }>
                            {test_text_fa}
                        </Paper>
                    </Grow>
                    <Grow {...paper_transition_props} timeout={paper_transition_props.timeout + 400}>
                        <Paper elevation={4} sx={ paper_sx }>
                            {test_text_fa}
                        </Paper>
                    </Grow>
                    <Grow {...paper_transition_props}>
                        <Paper elevation={4} sx={ paper_sx }>
                            {test_text_fa}
                        </Paper>
                    </Grow>
                </section> */}
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
                                overflow: "hidden",
                            }}
                        >
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
                            <div className="l-row3-img-wrapper">
                                <img className="l-row3-img"/>
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
                                overflow: "hidden",
                            }}
                        >
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
                            <div className="l-row4-img-wrapper">
                                <img className="l-row4-img"/>
                            </div>
                        </Box>
                    </Box>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Landing;
