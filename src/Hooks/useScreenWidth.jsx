import { useEffect, useState } from "react";

const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Update screen width on resize
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }
        // setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        // Cleanup interval and event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return screenWidth;
};

export default useScreenWidth;
