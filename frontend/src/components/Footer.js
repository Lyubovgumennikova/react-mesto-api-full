import React from "react";

function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="footer">
            <p className="footer__text">&#169;{year} Mesto Russia</p>
        </footer>       
    );
}

export default Footer;