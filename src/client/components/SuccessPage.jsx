import { useNavigate } from "react-router-dom";
import React from "react";

const SuccessPage = () => {

    const navigate = useNavigate();

    function sendMeHome() {
        navigate('/');
    };

    return (
        <>
        <div className="success-page">
            <h1>Thank you for your order!</h1>
            <button onClick={sendMeHome} className="home-button">Contine Shopping</button>
            <img src="shoevault.jpg"></img>
        </div>
        </>
    );
};

export default SuccessPage;