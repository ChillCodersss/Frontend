
import CounselorSwiper from "@/components/Landing/Swiper.tsx";

import React, { useEffect, useRef, useState } from "react";
import { Box, Paper, Grow, useMediaQuery, Fade, Card, CardActionArea } from "@mui/material";
import Marquee from "@/components/Landing/Marquee";
import SecondaryButton from "@/components/common/SecondaryButton";
// import Footer from "@/components/Footer/Footer";
import './Landing.css';


import "./Landing.css";

const Landing: React.FC = () => {

    const [firstRowVisible, setFirstRowVisible] = useState(false);
    const [lastRowVisible, setLastRowVisible] = useState(false);
    const [firstTextVisible, setFirstTextVisible] = useState(false);
    const [secondTextVisible, setSecondTextVisible] = useState(false);
    const small_screen = useMediaQuery("(min-width: 600px) and (max-width: 749px)");
    const medium_screen = useMediaQuery("(min-width: 750px)");
    const not_mobile = small_screen || medium_screen;
    // const reduced_motion = useMediaQuery("(prefers-reduced-motion)");

    const paper_transition_props = {
        timeout: 600,     // timeout in millisecond
        in: firstRowVisible,
    };

    const card_transition_props = {
        timeout: 600,     // timeout in millisecond
        in: lastRowVisible,
    };

    const fade_sx = {
        timeout: 600,     // timeout in millisecond
        in: true,
    }

    // const test_text =  `Lorem ipsum dolor sit amet consectetur, 
    //                     adipisicing elit. Odit vero minus sed soluta. 
    //                     Necessitatibus non porro quidem consequuntur,
    //                     perspiciatis iste laborum tempora quas sapiente, ut amet.`;
    const test_text_fa =   `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، 
                            و با استفاده از طراحان گرافیک است، چاپگرها ون و سطرآنچنان که لازم است،
                            و برای شرایط فعلی تکنولوژی مورد نیاز، و متخصصان را می طلبد.`;
    const our_counselor_marquee_text = "مشاوران ما";
    const why_our_site_marquee_text = "چرا مشاوریوم؟";
    const banner_h = "مشاوریوم";
    const banner_p = "همراه شما در مسیر موفقیت";

    const firstRowRef = useRef(null);

    useEffect(() => {
        const firstRow = document.querySelectorAll(".l-first-row");

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry.isIntersecting) {
                setFirstRowVisible(true);
                observer.unobserve(firstRow[0]);
            }
        }, {
            threshold: 0.5,
        });

        observer.observe(firstRow[0]);
    }, []);

    useEffect(() => {
        const lastRow = document.querySelectorAll(".l-last-row");

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry.isIntersecting) {
                setLastRowVisible(true);
                observer.unobserve(lastRow[0]);
            }
        }, {
            threshold: 0.5,
        });

        observer.observe(lastRow[0]);
    }, []);

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

    let paper_sx = {
        direction: "rtl",
        fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1rem" },
        borderRadius: {xs: "6px", sm: "8px", md: "8px"},
        width: "230px", height: "230px", padding: { xs: "1rem", sm: "1rem", md: "1.1rem" },
    };
    const small_screen_paper_sx = {
        width: "190px", height: "190px",
    }
    const medium_screen_paper_sx = {
        width: "23vw", height: "23vw",
    };
    if (small_screen) {
        paper_sx = {...paper_sx, ...small_screen_paper_sx};
    } else if (medium_screen) {
        paper_sx = {...paper_sx, ...medium_screen_paper_sx};
    }

    const left_card_sx = {
        position: "absolute",
        left: (not_mobile) ? "15%" : "unset",
        bottom: (not_mobile) ? "unset" : "50px",
        height: (not_mobile) ? "30vw" : "230px",
        width: (not_mobile) ? "30vw" : "230px",
        boxShadow: "5",
        fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1rem" },
        borderRadius: {xs: "6px", sm: "8px", md: "8px"},
        "&:hover": {
            height: (not_mobile) ? "32vw" : "240px",
            width: (not_mobile) ? "32vw" : "240px",
            boxShadow: "7",
        }
    };

    const right_card_sx = {
        position: "absolute",
        right: (not_mobile) ? "15%" : "unset",
        bottom: (not_mobile) ? "unset" : "50px",
        height: (not_mobile) ? "30vw" : "230px",
        width: (not_mobile) ? "30vw" : "230px",
        boxShadow: "5",
        fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1rem" },
        borderRadius: {xs: "6px", sm: "8px", md: "8px"},
        "&:hover": {
            height: (not_mobile) ? "32vw" : "240px",
            width: (not_mobile) ? "32vw" : "240px",
            boxShadow: "7",
        }
    };

    // const text_max_width = "260px";
    // const text_font_size = "1rem";

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
        alignItems: "center",
        boxSizing: "border-box",
        rowGap: "15px"
    };

    return (
        <div style={{width: "100%",}}> {/*overflowX: "hidden"*/}
            <header style={{
                backgroundColor: "gray", height: "70px", 
                // position: "sticky", top: "0px",
                display: "flex", alignItems: "center", justifyContent:"center"
                }}
            >
                Header
            </header>
            <main>
                <section className="l-banner">
                    <div className="l-banner-bg"/>
                    <div className="l-banner-bg-circle"/>
                    <div className="l-banner-bg-circle2"/>
                    <h1 className="l-banner-h">{banner_h}</h1>
                    <p className="l-banner-p">{banner_p}</p>
                </section>
                <section id={"firstRow"} ref={firstRowRef} className="l-container l-first-row">
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
                </section>
                <section id="l-marquee1">
                    <Marquee count={4} text={our_counselor_marquee_text}/>
                    {/* <div className="l-marquee-wrapper">
                        <Marquee count={4} text={our_counselor_marquee_text}/>
                        { reduced_motion ? 
                        <div className="l-marquee-item">
                            <p>{our_counselor_marquee_text}</p>
                        </div>
                        :
                        <>
                        <div className="l-marquee-item" style={{animationDelay: "calc(30s / 4 * (4 - 1) * -1)"}}>
                            <p>{our_counselor_marquee_text}</p>
                        </div>
                        <div className="l-marquee-item" style={{animationDelay: "calc(30s / 4 * (4 - 2) * -1)"}}>
                            <p>{our_counselor_marquee_text}</p>
                        </div>
                        <div className="l-marquee-item" style={{animationDelay: "calc(30s / 4 * (4 - 3) * -1)"}}>
                            <p>{our_counselor_marquee_text}</p>
                        </div>
                        <div className="l-marquee-item" style={{animationDelay: "calc(30s / 4 * (4 - 4) * -1)"}}>
                            <p>{our_counselor_marquee_text}</p>
                        </div>
                        </>
                        }
                    </div> */}
                </section>
                <section className="l-container">
                    <div
                        className="l-swiper-bg-wrapper"
                    >
                        <div
                            className="l-swiper-bg"
                        />
                        <div
                            className="l-swiper-bg-circle-container"
                        >
                            <div
                                className="l-swiper-bg-circle-wrapper"
                            >
                                {/* <div className="l-swiper-bg-circle"/> */}
                            </div>
                        </div>
                    </div>
                </section>
                <section id="l-marquee2">
                    <Marquee count={3} text={why_our_site_marquee_text}/>
                </section>
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
                                    <h1 className="l-text-box-h">لورم ایپسوم متن ساختگی نامفهوم از صنعت چاپ</h1>
                                    <p id={"firstText"} className="l-text-box-p">{test_text_fa}</p>
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
                                    <h1 className="l-text-box-h">لورم ایپسوم متن ساختگی نامفهوم از صنعت چاپ</h1>
                                    <p id={"secondText"} className="l-text-box-p">{test_text_fa}</p>
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
                        </Box>
                    </Box>
                </section>
                <section className="l-container l-last-row">
                    <Grow {...card_transition_props} timeout={card_transition_props.timeout + 400}>
                        <Card sx={left_card_sx}>
                            <CardActionArea>

                            </CardActionArea>
                        </Card>
                    </Grow>
                    <Grow {...card_transition_props}>
                        <Card sx={right_card_sx}>
                            <CardActionArea>

                            </CardActionArea>
                        </Card>
                    </Grow>
                </section>
            </main>
            <footer style={{
                backgroundColor: "gray", height: "70px",
                display: "flex", alignItems: "center", justifyContent:"center"
                }}
            >
                Footer
            </footer>
        </div>
    )
}

export default Landing;
