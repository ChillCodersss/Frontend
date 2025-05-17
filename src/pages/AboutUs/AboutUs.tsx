import { Fade } from '@mui/material';
import Header from '@/components/Header/Header';
import Footer from '@/components/Landing/Footer';
import './AboutUs.css'


function AboutUs() {
    const fade_sx = {
        timeout: 600,     // timeout in millisecond
        in: true,
    };

    const about_banner_h = "درباره ما";

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
                <section className='ab-container' style={{height: "100vh"}}></section>
            </main>
            <Footer/>
        </div>
    )
}

export default AboutUs;