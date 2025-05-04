import { Divider } from "@mui/material";
import logo from "@/assets/LogoG.png";
import telegramLogo from "@/assets/TelegramLogo.png";
import linkedinLogo from "@/assets/LinkedinLogo.png";
import "./Footer.css"

function Footer() {
    const copyrightText = "© تمامی حقوق برای مشاوریوم محفوظ است و هرگونه کپی برداری پیگرد قانونی خواهد داشت.";
    const test_text_fa =   `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، 
                            و با استفاده از طراحان گرافیک است، چاپگرها ون و سطرآنچنان که لازم است،
                            و برای شرایط فعلی تکنولوژی مورد نیاز، و متخصصان را می طلبد.`;

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
                        <a className="l-footer-link-item" href="./recruitment">استخدام</a>
                        <a className="l-footer-link-item">درباره ما</a>
                        <a className="l-footer-link-item">خدمات</a>
                        <a className="l-footer-link-item" href="./OurCounselor">مشاوران ما</a>
                    </nav>
                </div>
                <div>
                    <p className="l-footer-address">
                        {test_text_fa}
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