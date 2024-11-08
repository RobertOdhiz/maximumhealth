import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Styles/SuccessPage.css";

export default function SuccessPage() {
    const [remainingSeconds, setRemainingSeconds] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    const item = location.state?.item;

    useEffect(() => {
        const countdown = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev === 1) {
                    clearInterval(countdown);
                    navigate("/catalogue");
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(countdown);
    }, [navigate]);

    return (
        <div className="success-container">
            <lottie-player
                src="https://lottie.host/958d73eb-1c1f-4d54-921c-1a7b30d12cdd/rdSzZiyahp.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                autoplay
            ></lottie-player>
            <h1 className="success-message">Your purchase of {item?.title} was successful!</h1>
            <p className="redirect-message">
                You will be redirected to the products page in {remainingSeconds} seconds
            </p>
            <p className="redirect-message">
                or you can head to the <a href="/catalogue" className="styled-link">Products Page</a> right away.
            </p>
        </div>
    );
}
