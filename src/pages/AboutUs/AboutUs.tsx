import { useEffect, useState } from "react";
import { Fade, Slide } from '@mui/material';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import image1 from '@/assets/testp1.jpg';
import image2 from '@/assets/testp2.jpg';
import './AboutUs.css'


function AboutUs() {
    const [firstImageVisible, setFirstImageVisible] = useState(false);
    const [secondImageVisible, setSecondImageVisible] = useState(false);

    const fade_sx = {
        timeout: 600,     // timeout in millisecond
        in: true,
    };

    const slide_timeout = 900;     // timeout in millisecond

    const about_banner_h = "درباره ما";
    const about_text1_title = "خانواده بزرگ مشاوریوم";
    const about_text1_p1 = `خانواده بزرگ مشاوریوم در سال ۱۴۰۴ با هدف تحقق عدالت آموزشی
                            و ایجاد بستری نوین برای مشاوره تحصیلی تأسیس شد. هدف ما
                            این بوده که تمام دانش‌آموزان کنکوری، بدون دغدغه‌های مالی، بتوانند
                            با استفاده از سیستم نوآورانه این تیم به اهداف و نتایج دلخواه خود دست یابند.`;
    const about_text1_p2 = `در طی این مدت، به لطف خداوند، این خانواده بزرگ‌تر و موفق‌تر شده است.
                            افتخار داریم که نزدیک به ۲۰۰ هزار دانش‌آموز از محتوای آموزشی کادر حرفه‌ای مشاوریوم بهره‌مند شده‌اند
                            و بیش از ۱۵ هزار نفر از خدمات مشاوره خصوصی ما استفاده کرده‌اند.
                            نتیجه این تلاش‌ها، هزاران رتبه برتر در تمامی رشته‌ها بوده است.`;
    const about_text2_title = "اگه میخوای تو کنکور قبول نشی؛ مشاوریوم رو انتخاب نکن!";
    const about_text2_p1 = `در مشاوریوم، هدف ما این است که تمام نیازهای شما در مسیر کنکور را به بهترین شکل برآورده کنیم
                            تا بتوانید با موفقیت این مسیر را به پایان برسانید.`;
    const about_text2_p2 = `در این مسیر پرپیچ‌وخم، حضور یک راهنمای خبره و کاربلد ضروری است
                            تا با ارائه بهترین استراتژی و برنامه‌ریزی، تلاش‌های ارزشمند شما را در مسیر درست هدایت کند
                            و از هدررفتن زحماتتان جلوگیری شود. ما در مشاوریوم تمام تلاشمان را می‌کنیم
                            تا شما تنها یک بار کنکور دهید و آن‌را با موفقیت پشت سر بگذارید.`;
    const about_text2_p3 = `مشاوران حرفه‌ای ما بهترین منابع کمک‌درسی از جمله کتاب‌ها، کلاس‌ها،
                            ویدیوهای آموزشی و روش‌های مطالعه موثر برای هر درس را به شما معرفی می‌کنند.
                            همچنین، با توجه به اهمیت تکنیک‌های کنکوری،
                            روش‌های خلاصه‌نویسی، مرور، جمع‌بندی، و نحوه آزمون‌دادن را متناسب با شرایط شما آموزش می‌دهند.`;
    const about_text2_p4 = `اما موفقیت تنها با منابع و روش‌ها حاصل نمی‌شود؛ بلکه نیاز به پیوستگی و پشتکار دارد.
                            ما با تماس‌های منظم، پیگیری شبانه گزارش‌های شما و همراهی مستمر،
                            این استمرار را برای شما فراهم می‌کنیم.`;
    const about_text2_p5 = `مشاوران ما مثل یک دوست دلسوز، در تمام لحظات سخت و دشوار کنارتان هستند تا با انگیزه
                            و اعتمادبه‌نفس این مسیر را ادامه دهید.
                            با مشاوریوم، کنکورت را خوب تمام کن!`;

    useEffect(() => {
        const firstImage = document.querySelectorAll(`[id="firstImage"]`);

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry.isIntersecting && entries[0].target === firstImage[0]) {
                setFirstImageVisible(true);
                observer.unobserve(firstImage[0]);
            }
        }, {
            threshold: 0.3,
        });

        observer.observe(firstImage[0]);
    }, []);

    useEffect(() => {
        const secondImage = document.querySelectorAll(`[id="secondImage"]`);

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry.isIntersecting && entries[0].target === secondImage[0]) {
                setSecondImageVisible(true);
                observer.unobserve(secondImage[0]);
            }
        }, {
            threshold: 0.3,
        });

        observer.observe(secondImage[0]);
    }, []);

    return (
        <div style={{width: "100%"}}>
            <Header isWhiteMode={true}/>
            <main>
                <section className='ab-container ab-banner'>
                    <div className='ab-banner-bg'>
                    </div>
                    <Fade {...fade_sx}>
                        <h1 className='ab-banner-h'>{about_banner_h}</h1>
                    </Fade>
                </section>
                <section className='ab-container' style={{marginBottom: "50px", marginTop: "50px"}}>
                    <div className='ab-text-container ab-tc1'>
                        <div className='ab-image-wrapper'>
                            <img className="ab-image" src={image2}/>
                        </div>
                        {/* <Slide direction="left" timeout={slide_timeout} in={firstImageVisible}> */}
                            <div className='ab-text-wrapper' id="firstImage">
                                <Slide direction="left" timeout={slide_timeout} in={firstImageVisible}>
                                <h2>{about_text1_title}</h2>
                                </Slide>
                                <Slide direction="left" timeout={slide_timeout + 150} in={firstImageVisible}>
                                <p>{about_text1_p1}</p>
                                </Slide>
                                <Slide direction="left" timeout={slide_timeout + 300} in={firstImageVisible}>
                                <p>{about_text1_p2}</p>
                                </Slide>
                            </div>
                        {/* </Slide> */}
                    </div>
                </section>
                <section className='ab-container' style={{marginBottom: "50px"}}>
                    <div className='ab-text-container'>
                        <div className='ab-image-wrapper'>
                            <img className="ab-image ab-image2" src={image1}/>
                        </div>
                        {/* <Slide direction="right" timeout={slide_timeout} in={secondImageVisible}> */}
                            <div className='ab-text-wrapper ab-tw2' id="secondImage">
                                <Slide direction="right" timeout={slide_timeout} in={secondImageVisible}>
                                <h2>{about_text2_title}</h2>
                                </Slide>
                                <Slide direction="right" timeout={slide_timeout + 100} in={secondImageVisible}>
                                <p>{about_text2_p1}</p>
                                </Slide>
                                <Slide direction="right" timeout={slide_timeout + 300} in={secondImageVisible}>
                                <p>{about_text2_p2}</p>
                                </Slide>
                                <Slide direction="right" timeout={slide_timeout + 400} in={secondImageVisible}>
                                <p>{about_text2_p3}</p>
                                </Slide>
                                <Slide direction="right" timeout={slide_timeout + 500} in={secondImageVisible}>
                                <p>{about_text2_p4}</p>
                                </Slide>
                                <Slide direction="right" timeout={slide_timeout + 600} in={secondImageVisible}>
                                <p>{about_text2_p5}</p>
                                </Slide>
                            </div>
                        {/* </Slide> */}
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default AboutUs;