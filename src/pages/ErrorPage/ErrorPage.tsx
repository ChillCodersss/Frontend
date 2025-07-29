import Header from '@/components/Header/Header';
import ConfirmButton from '@/components/common/ConfirmButton';
import NotFoundImg from '@/assets/404 webpage.svg';
import { useNavigate } from "react-router";
import './ErrorPage.css';


function ErrorPage() {
    const navigate = useNavigate();
    const error404 = "صفحه مورد نظر پیدا نشد!";

    const handleReturn = () => {
        navigate('/');
    }

    return (
        <div style={{width: "100%"}}>
            <main style={{position: "relative"}}>
                <Header isWhiteMode={true} />
                <section className='erp-container erp-banner erp-flex erp-flex-center'>
                    <div className='erp-banner-bg erp-flex erp-flex-center' />
                    {/* <h1 className='erp-banner-h'>{error404}</h1> */}
                </section>
                <section className='erp-error-img-container erp-flex erp-flex-center'>
                    <div className='erp-error-img-wrapper'>
                        <img src={NotFoundImg} className='erp-error-img'/>
                    </div>
                    <div className='erp-error-title-wrapper erp-flex erp-flex-col erp-flex-center'>
                        <p className='erp-error-title'>{error404}</p>
                        <ConfirmButton name='بازگشت به صفحه اصلی' onClick={handleReturn}></ConfirmButton>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ErrorPage;