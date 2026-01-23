import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const ScrollToTop = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 400); // show after 400px scroll
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Box
            onClick={scrollToTop}
            sx={{
                position: "fixed",
                right: { xs: "16px", md: "30px" },
                bottom: { xs: "16px", md: "30px" },
                width: { xs: "44px", sm: "52px", md: "85px" },
                height: { xs: "44px", sm: "52px", md: "85px" },
                fontSize: { xs: "14px", sm: "16px", md: "85px" },
                borderRadius: "50%",
                backgroundColor: "#000",
                color: "#fff",
                display: show ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                zIndex: 9999,
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",

                "&:hover": {
                    transform: "translateY(-4px)",
                    backgroundColor: "#CAF55E",
                    color: "#000",
                },
            }}
        >
            ↑
        </Box>
    );
};

export default ScrollToTop;
