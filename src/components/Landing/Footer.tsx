import { Divider } from "@mui/material";
import logo from "@/assets/LogoG.png";
import telegramLogo from "@/assets/TelegramLogo.svg";
import linkedinLogo from "@/assets/LinkedinLogo.svg";
import "./Footer.css"

function Footer() {
    const copyrightText = "© تمامی حقوق برای مشاوریوم محفوظ است و هرگونه کپی برداری پیگرد قانونی خواهد داشت.";
    const address_text = "آدرس دفتر مرکزی: ایران، تهران، رسالت، خیابان هنگام، خیابان دانشگاه، دانشگاه علم و صنعت ایران";
    const email_address = "ایمیل: Moshaverium@gmail.com";
    const post_address = "کد پستــی: ۱۳۱۱۴-۱۶۸۴۶";

    const footerLinkItems = [
        {href: "./OurCounselor", text: "مشاوران ما"},
        {href: "./", text: "خدمات"},
        {href: "./recruitment", text: "استخدام"},
        {href: "./about-us", text: "درباره ما"},
    ];

    return (
        <footer
            className="l-footer"
        >
            <div className="l-footer-logo-container">
                <img className="l-footer-logo" src={`${ logo }`}/>
                <p className="l-footer-title">مشاوریوم</p>
            </div>
            <div className="l-footer-content">
                <div>
                    <nav className="l-footer-links">
                        {
                            footerLinkItems.map((item, index) => 
                                <a
                                    key={index}
                                    className="l-footer-link-item"
                                    href={item.href}
                                >
                                    {item.text}
                                </a>
                            )
                        }
                    </nav>
                </div>
                <div>
                    <p className="l-footer-address">
                        {address_text}
                    </p>
                    <p className="l-footer-address">
                        {post_address}
                    </p>
                    <p className="l-footer-address">
                        {email_address}
                    </p>
                </div>
            </div>
            <Divider variant="middle"/>
            <div className="l-footer-last-row">
                <p className="footer-copyright-text">{copyrightText}</p>
                <div className="l-footer-last-row-icon-container">
                    <img src={`${ telegramLogo }`}/>
                    <img src={`${ linkedinLogo }`}/>
                </div>
            </div>
        </footer>
    )
}

export default Footer;