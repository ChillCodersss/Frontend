import { useEffect, useState } from "react";
import { Fade, Slide } from '@mui/material';
import image1 from '@/assets/services1.jpg';
import image2 from '@/assets/services2.jpg';
import Logo from "@/assets/ServicesLogo.svg";
import './Services.css';


function Services() {
    const [firstImageVisible, setFirstImageVisible] = useState(false);
    const [secondImageVisible, setSecondImageVisible] = useState(false);
    const [fifthTextVisible, setFifthTextVisible] = useState(false);
    const [fourthTextVisible, setFourthTextVisible] = useState(false);
    const [listVisible, setListVisible] = useState(false);

    const fade_sx = {
        timeout: 600,     // timeout in millisecond
        in: true,
    };

    const slide_timeout = 900;     // timeout in millisecond

    const services_banner_h = "خدمات";
    const services_text1_title = "مشاوره کنکور با مشاوران حرفه‌ای در مشاوریوم";
    const services_text1_p1 =  `اگر به دنبال مشاوره کنکور با رتبه برترها هستید، جای درستی آمده‌اید!
                                گروه مشاوره تحصیلی کنکور مشاوریوم در حال حاضر دارای تعداد زیادی مشاور کنکور رتبه برتر است.
                                نتیجه تلاش این مشاوران در طی سال‌های اخیر بیشتر از پانزده هزار نفر قبولی و
                                بیش از سه هزار نفر رتبه برتر بوده است. خدمات مشاوره‌ای ما برای رشته‌های ریاضی،
                                تجربی و انسانی در قالب طرح مشاوره یک ماهه ارائه می‌شود.`;
    const services_text2_title = "ویژگی های طرح‌ مشاوره کنکور مشاوریوم";
    const services_text2_p1 =  `ویژگی‌های اصلی طرح‌های مشاوره کنکور مشاوریوم را می‌توان برنامه ریزی درسی اصولی و اختصاصی
                                برای هر دانش‌آموز، ارتباط پیوسته مشاور و چک گزارش کار نام برد.
                                همچنین شارژ دائمی انگیزه، پاسخ به تمام مشکلات و سوالات مشاوره‌ای از دیگر ویژگی‌های
                                این طرح‌ها می‌باشند. حال به بررسی کامل خدمات مشاوره،
                                طرح‌ و ویژگی‌های مشاور کنکور خوب می‌پردازیم.`;
    const services_text3_title = "معرفی طرح مشاوره کنکور مشاوریوم";
    const services_text3_p1 =  `درس خواندن برای کنکور کمی پیچیده‌تر از چیزی است که از بیرون به آن نگاه می‌کنید.
                                به همین دلیل بسیاری از دانش‌آموزان ترجیح می‌دهند از یک پشتیبان کمک بگیرند
                                تا انرژیشان را برای مطالعه حفظ کنند. مشاوریوم با شناسایی همه نیازهای داوطلبان،
                                طرحی را طراحی کرده تا با کوتاه‌تر کردن مسیر، زمان بیشتری را برای فرد
                                ذخیره کند. (که بخش بزرگی از مسئولیت دانش‌آموزان را روی دوش مشاور قرار می‌دهد)`;
    const services_text3_p2 =  `در لیست زیر، خدمات مشاوره تحصیلی و کنکور را خواهید دید که
                                در طرح‌ مشاوره ما برای شما در نظر گرفته شده است:`;
    const services_text3_p3 = "شارژ انگیزه و حفظ آن در تمام مسیر";
    const services_text3_p4 = "برنامه کوتاه مدت، میان مدت و بلند مدت کاملا شخصی‌سازی شده";
    const services_text3_p5 = "پشتیبانی مجازی توسط مشاور رتبه برتر";
    const services_text3_p6 = "پیگیری عملکرد روزانه";
    const services_text3_p7 = "کنترل استرس و اضطراب دانش‌آموز";
    const services_text3_p8 = "تضمین افزایش تراز و معدل";
    const services_text3_p9 = "ارائه برنامه‌های مخصوص برای زمان‌های خاص مثل عید و تابستان";
    const services_text3_p10 = "بهبود کیفیت و کمیت مطالعه";
    const services_text4_title = "مشاوره کنکور با مشاوریوم غیر حضوری است یا حضوری؟";
    const services_text4_p1 =  `مشاوریوم با هدف برقراری عدالت آموزشی شکل گرفت
                                و به همین دلیل از بهترین راه‌ها استفاده کرد تا همه داوطلبان در سراسر ایران
                                به خدمات مشاوره کنکور دسترسی داشته باشند.
                                یکی از این راه‌ها ارائه خدمات به صورت آنلاین بود که از طریق چت اختصاصی مشاوریوم
                                انجام می‌شود. همچنین چت اختصاصی کمک می‌کند
                                تا علاوه بر ارتباط بدون محدودیت با مشاورتان، به آرشیو کاملی از چت‌ها
                                و اطلاعات رد و بدل شده از ابتدا دسترسی داشته باشید.
                                تماس تلفنی دومین راهی بود که مشاوریوم برای مشاوره کنکور انتخاب کرد.
                                به‌این‌ترتیب هر کسی در هرجای ایران که به تلفن دسترسی داشته باشد می‌تواند از این خدمات فوق‌العاده
                                استفاده کند. به‌علاوه با این روش محدودیت‌های مشاور حضوری وجود ندارد و داوطلب
                                در هر ساعتی از شبانه‌روز می‌تواند مشاور را در جریان مشکلاتش قرار دهد.`;
    const services_text5_title = "ملاک‌های مشاوریوم برای انتخاب بهترین مشاورها چه بوده؟";
    const services_text5_p1 =  `موسسه مشاوره کنکور مشاوریوم با تجربه‌ای که به دست آورده،
                                به خوبی می‌داند وجود چه خصوصیاتی در یک مشاور باعث بهترین خروجی می‌شود.
                                به همین دلیل با هم فکری برخی اساتید مطرح کنکور و رتبه‌های برتری که نیاز دوستان خود
                                را به خوبی می‌دانند، ملاک‌هایی را برای انتخاب مشاوران موسسه تعیین کرده
                                که در ادامه بیشتر به آن می‌پردازیم:`;
    const services_text5_p2 = "رتبه برتر بودن";
    const services_text5_p3 = "انگیزه‌بخشی و آشنایی به مسائل شخصیت‌شناسی و روان‌شناسی";
    const services_text5_p4 = "رد شدن از فیلترهای سخت‌گیرانه آزمون‌های چندگانه";
    const services_text5_p5 = "دلسوز و صمیمی ولی جدی";
    const services_text5_p6 = "با تجربه باشد و بررسی سوابق مشاور";
    const services_text5_p7 = "توان طراحی برنامه‌ریزی برای دانش‌آموز";
    const services_text5_p8 = "در دسترس بودن و پیگیر بودن";
    const services_text5_p9 = "توان حل مسئله و چالش‌های دانش‌آموز";

    useEffect(() => {
        const firstImage = document.querySelectorAll(`[id="firstImage"]`);
        const secondImage = document.querySelectorAll(`[id="secondImage"]`);
        const fifthText = document.querySelectorAll(`[id="fifthText"]`);
        const fourthText = document.querySelectorAll(`[id="fourthText"]`);
        const planList = document.querySelectorAll(`[id="planList"]`);

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry.isIntersecting && entries[0].target === firstImage[0]) {
                setFirstImageVisible(true);
                observer.unobserve(firstImage[0]);
            }
            if (entry.isIntersecting && entries[0].target === secondImage[0]) {
                setSecondImageVisible(true);
                observer.unobserve(secondImage[0]);
            }
            if (entry.isIntersecting && entries[0].target === fifthText[0]) {
                setFifthTextVisible(true);
                observer.unobserve(fifthText[0]);
            }
            if (entry.isIntersecting && entries[0].target === fourthText[0]) {
                setFourthTextVisible(true);
                observer.unobserve(fourthText[0]);
            }
            if (entry.isIntersecting && entries[0].target === planList[0]) {
                setListVisible(true);
                observer.unobserve(planList[0]);
            }
        }, {
            threshold: 0.3,
        });

        observer.observe(firstImage[0]);
        observer.observe(secondImage[0]);
        observer.observe(fifthText[0]);
        observer.observe(fourthText[0]);
        observer.observe(planList[0]);
    }, []);

    return (
        <div style={{width: "100%"}}>
            <main>
                <section className='sv-container sv-banner'>
                    <div className='sv-banner-bg'>
                        <img className="sv-banner-bg-img" src={Logo}/>
                    </div>
                    <Fade {...fade_sx}>
                        <h1 className='sv-banner-h'>{services_banner_h}</h1>
                    </Fade>
                </section>
                <section className='sv-container' style={{marginBottom: "50px", marginTop: "50px"}}>
                    <div className='sv-text-container sv-tc1'>
                        <div className='sv-image-wrapper'>
                            <img className="sv-image" src={image2}/>
                        </div>
                        <div className='sv-text-wrapper' id="firstImage">
                            <Slide direction="left" timeout={slide_timeout} in={firstImageVisible}>
                                <h2>{services_text1_title}</h2>
                            </Slide>
                            <Slide direction="left" timeout={slide_timeout + 150} in={firstImageVisible}>
                                <p>{services_text1_p1}</p>
                            </Slide>
                        </div>
                    </div>
                </section>
                <section className='sv-container' style={{marginBottom: "50px"}}>
                    <div className='sv-text-container'>
                        <div className='sv-image-wrapper'>
                            <img className="sv-image sv-image2" src={image1}/>
                        </div>
                        <div className='sv-text-wrapper sv-tw2' id="secondImage">
                            <Slide direction="right" timeout={slide_timeout} in={secondImageVisible}>
                                <h2>{services_text2_title}</h2>
                            </Slide>
                            <Slide direction="right" timeout={slide_timeout + 100} in={secondImageVisible}>
                                <p>{services_text2_p1}</p>
                            </Slide>
                        </div>
                    </div>
                </section>
                <section className='sv-container' style={{marginBottom: "50px"}}>
                    <div className='sv-text-container sv-flex-col' id="planList">
                        <Slide direction="left" timeout={slide_timeout} in={listVisible}>
                            <h2>{services_text3_title}</h2>
                        </Slide>
                        <Slide direction="left" timeout={slide_timeout + 150} in={listVisible}>
                            <p className="sv-text-maxW">{services_text3_p1}</p>
                        </Slide>
                        <Slide direction="left" timeout={slide_timeout + 300} in={listVisible}>
                            <p className="sv-list-item">{services_text3_p2}</p>
                        </Slide>
                        <Fade timeout={2000} in={listVisible}>
                        <div className='sv-list-wrapper sv-list-colored'>
                            <p className="sv-list-item">{services_text3_p3}</p>
                            <p className="sv-list-item">{services_text3_p4}</p>
                            <p className="sv-list-item">{services_text3_p5}</p>
                            <p className="sv-list-item">{services_text3_p6}</p>
                            <p className="sv-list-item">{services_text3_p7}</p>
                            <p className="sv-list-item">{services_text3_p8}</p>
                            <p className="sv-list-item">{services_text3_p9}</p>
                            <p className="sv-list-item">{services_text3_p10}</p>
                        </div>
                        </Fade>
                    </div>
                </section>
                <section className='sv-container' style={{marginBottom: "50px"}}>
                    <div className='sv-text-container sv-flex-col' id="fourthText">
                        <Slide direction="right" timeout={slide_timeout} in={fourthTextVisible}>
                            <h2>{services_text4_title}</h2>
                        </Slide>
                        <Slide direction="right" timeout={slide_timeout + 100} in={fourthTextVisible}>
                            <p>{services_text4_p1}</p>
                        </Slide>
                    </div>
                </section>
                <section className='sv-container' style={{marginBottom: "50px"}}>
                    <div className='sv-text-container sv-flex-col' id="fifthText">
                        <Slide direction="left" timeout={slide_timeout} in={fifthTextVisible}>
                            <h2>{services_text5_title}</h2>
                        </Slide>
                        <Slide direction="left" timeout={slide_timeout + 150} in={fifthTextVisible}>
                            <p className="sv-text-maxW">{services_text5_p1}</p>
                        </Slide>
                        <Fade timeout={2000} in={fifthTextVisible}>
                        <div className='sv-list-wrapper'>
                            <p className="sv-list-item">{services_text5_p2}</p>
                            <p className="sv-list-item">{services_text5_p3}</p>
                            <p className="sv-list-item">{services_text5_p4}</p>
                            <p className="sv-list-item">{services_text5_p5}</p>
                            <p className="sv-list-item">{services_text5_p6}</p>
                            <p className="sv-list-item">{services_text5_p7}</p>
                            <p className="sv-list-item">{services_text5_p8}</p>
                            <p className="sv-list-item">{services_text5_p9}</p>
                        </div>
                        </Fade>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Services;