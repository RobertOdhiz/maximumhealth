import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MetaPixel from "../Utils/meta";
import "./Styles/SuccessPage.css";

export default function SuccessPage() {
    const [remainingSeconds, setRemainingSeconds] = useState(10);
    const navigate = useNavigate();
    const location = useLocation();
    const item = location.state?.itemName;
    const price = location.state?.price || 0;
    const currency = location.state?.currency || "KSH"; 

    useEffect(() => {
        if (!item) {
            navigate("/not-found");
            return;
        }

        // Track the purchase event using MetaPixel
        if (window.fbq) {
            window.fbq("track", "Purchase", {
                value: price,
                currency: currency,
                content_ids: [item],
                content_type: "product",
            });
        } else {
            console.error("Facebook Pixel 'fbq' function not found.");
        }        

        // Start the countdown for redirection
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
    }, [navigate, item, price, currency]);

    if (!item) {
        navigate("/not-found");
        return null;
    }

    return (
        <div className="success-container">
            <MetaPixel
                event="Purchase"
                eventData={{
                    value: price,
                    currency: currency,
                    content_ids: [item],
                    content_type: "product",
                }}
            />
            <lottie-player
                src="https://lottie.host/958d73eb-1c1f-4d54-921c-1a7b30d12cdd/rdSzZiyahp.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                autoplay
            ></lottie-player>
            <h1 className="success-message">Your purchase of {item} was successful!</h1>
            <p className="redirect-message">
                You will be redirected to the products page in {remainingSeconds} seconds
            </p>
            <p className="redirect-message">
                or you can head to the <a href="/catalogue" className="styled-link">Products Page</a> right away.
            </p>
        </div>
    );
}
