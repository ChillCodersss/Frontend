import React, { } from "react";
// import Footer from "@/components/Footer/Footer";
import './Landing.css';


const Landing: React.FC = () => {
    return (
        <div style={{width: "100vw", overflowX: "hidden"}}>
            <header style={{
                backgroundColor: "gray", height: "70px",
                display: "flex", alignItems: "center", justifyContent:"center",
                }}>header</header>
            <main>
                <section className="l-container">banner</section>
                <section className="l-container">...</section>
                <section className="l-container">Our</section>
                <section className="l-container">...</section>
                <section className="l-container">...</section>
            </main>
            <footer style={{
                backgroundColor: "gray", height: "70px",
                display: "flex", alignItems: "center", justifyContent:"center",
                }}>footer</footer>
        </div>
    )
}

export default Landing;