import { useNavigate } from "react-router-dom";
import React from "react";


const SuccessPage = () => {
const navigate = useNavigate();
    function sendMeHome () {
        navigate('/');
    };

return <>
    <h1>Thank you for your order!</h1>
    <button onClick={sendMeHome}>Home</button>
    </>
};

export default SuccessPage;