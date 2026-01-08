import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { client, urlFor } from "../../sanityClient";

import "./style.css";

// import Img1 from "../../assets/overlayImg1.svg";
// import Img2 from "../../assets/overlayImg2.svg";
// import Img3 from "../../assets/overlayImg3.svg";
import { useMediaQuery } from "@mui/material";
import ElectricDoodle from "../../assets/electric.svg";
import RandomDoodle from "../../assets/random1.svg";



/* -----------------------------
TEXT FOR MANIFESTO SECTION
--------------------------------*/
const LINES_2 = [
    { text: "YEP, WE’RE DESIGNERS. BUT", indent: 0 },
    { text: "ABOVE ALL, WE’RE THINKERS,", indent: 0 },
    { text: "EXPLORERS, AND STORYTELLERS.", indent: 0 },

    // Big heading
    { text: "What we’re", indent: 0 },
    { text: "really good at", indent: 0 },
];

// Split into characters
const LINES_CHARS_2 = LINES_2.map((line) =>
    line.text.split("").map((c) => (c === " " ? "\u00A0" : c))
);

// Offsets for global char index
let TOTAL_CHARS_2 = 0;
const LINE_OFFSETS_2 = [];

LINES_CHARS_2.forEach((chars, i) => {
    LINE_OFFSETS_2[i] = TOTAL_CHARS_2;
    TOTAL_CHARS_2 += chars.length;
});

const FADE_WINDOW = 1; // characters over which opacity transitions from 0 → 1

/* -----------------------------
   RENDER LINE 2
--------------------------------*/
const renderLine2 = (lineIndex, progress, fontSize, mobile) => {

    const chars = LINES_CHARS_2[lineIndex];
    const baseOffset = LINE_OFFSETS_2[lineIndex];

    const letterProgress = progress * TOTAL_CHARS_2;

    return (
        <Typography
            key={lineIndex}
            sx={{
                fontFamily: "Inter Tight",
                fontSize,
                fontWeight: lineIndex < 3 ? 900 : 800,
                textAlign: "center",
                textTransform: lineIndex < 3 ? "uppercase" : "none",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                mb: mobile ? "4px" : "0px",
            }}
        >
            {chars.map((char, i) => {
                const globalIndex = baseOffset + i;

                let opacity = (letterProgress - globalIndex) / FADE_WINDOW;
                opacity = Math.max(0.1, Math.min(1, opacity));

                return (
                    <span
                        key={i}
                        style={{
                            opacity,
                            transition: "opacity 0.8s ease-out",
                            display: "inline-block",
                            color: "#121314",
                        }}
                    >
                        {char}
                    </span>
                );
            })}
        </Typography>
    );
};

const ManifestoSection = () => {
    const [images, setImages] = useState({
        left: null,
        middle: null,
        right: null,
    });

    useEffect(() => {
        client
            .fetch(`
      *[_type == "manifestoSection"][0]{
        leftImage,
        middleImage,
        rightImage
      }
    `)
            .then((data) => {
                if (data) {
                    setImages({
                        left: data.leftImage,
                        middle: data.middleImage,
                        right: data.rightImage,
                    });
                }
            })
            .catch(console.error);
    }, []);

    const [scrollDir, setScrollDir] = useState("down");
    const prevScroll = useRef(0);

    // page-load animation states
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100); // trigger load animation

        const handleScroll = () => {
            const now = window.scrollY;

            if (now > prevScroll.current) {
                setScrollDir("down");
            } else {
                setScrollDir("up");
            }

            prevScroll.current = now;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    const isMobile = useMediaQuery("(max-width:700px)");
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");
    const [offset, setOffset] = useState(0);
    const scrollPrev = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const now = window.scrollY;

            const delta = now - scrollPrev.current;

            // VERY SMALL MOVEMENT (slow + smooth)
            const speed = 5; // adjust between 0.2 ↔ 1.0

            if (delta > 0) {
                // scrolling down → move left
                setOffset((o) => o - speed);
            } else {
                // scrolling up → move right
                setOffset((o) => o + speed);
            }

            scrollPrev.current = now;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const containerRef = useRef(null);
    const [progress, setProgress] = useState(0);

    /* scroll tracking */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Entry point = when section touches bottom of screen
            const start = windowHeight;
            const end = -rect.height * 0.1; // when top goes above 30% of viewport

            // Progress from 0 → 1
            let p = (start - rect.top) / (start - end);
            p = Math.max(0, Math.min(1, p));

            setProgress(p);
        };

        onScroll();
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);


    /* font sizes */
    const smallTextSize = isMobile ? "10px" : isLargeScreen ? "19px" : "13px";
    const bigTextSize = isMobile ? "40px" : isLargeScreen ? "165px" : "110px";

    return (
        <Box sx={{ width: "100%", position: "relative", top: "50px", overflow: "hidden", mx: "auto", paddingTop: "330px" }}>

            {/* ------------------------------------
                1️⃣ TOP AUTO-SLIDING MANIFESTO STRIP
            ------------------------------------- */}

            <Box
                sx={{
                    overflow: "hidden",
                    position: "relative",
                    width: "100%",
                    top: { xs: "-286px", md: "0" },
                    whiteSpace: "nowrap",
                    transform: { xs: "skewY(-8deg)", md: "skewY(-3deg)" },

                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        animation: "manifestoMarquee 18s linear infinite",
                    }}
                >
                    {/* TRACK 1 */}
                    <Box
                        sx={{
                            flexShrink: 0,
                            minWidth: "100%",
                            display: "flex",
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                fontSize: isLargeScreen ? "21px" : "14px",
                                fontWeight: 900,
                                fontFamily: "Inter Tight, sans-serif",
                                textTransform: "uppercase",
                                color: "#1D1D1B",
                                letterSpacing: 0,
                                whiteSpace: "nowrap",
                            }}
                        >
                            {"MANIFESTO — ".repeat(60)}
                        </Typography>
                    </Box>

                    {/* TRACK 2 (IDENTICAL) */}
                    <Box
                        sx={{
                            flexShrink: 0,
                            minWidth: "100%",
                            display: "flex",
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                fontSize: isLargeScreen ? "21px" : "14px",
                                fontWeight: 900,
                                fontFamily: "Inter Tight, sans-serif",
                                textTransform: "uppercase",
                                color: "#1D1D1B",
                                letterSpacing: 0,
                                whiteSpace: "nowrap",
                            }}
                        >
                            {"MANIFESTO — ".repeat(60)}
                        </Typography>
                    </Box>
                </Box>

                <style>
                    {`
        @keyframes manifestoMarquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        `}
                </style>
            </Box>

            {/* ------------------------------------
                2️⃣ OVERLAY FLOATING IMAGES
            ------------------------------------- */}
            <Box sx={{ position: "relative", width: "100%", height: "420px", maxWidth: "1200px", margin: "15px auto 0 auto", }}>

                {/* Left photo */}
                <Box
                    component="img"
                    src={images.left ? urlFor(images.left).width(600).url() : ""}
                    sx={{
                        position: "absolute",
                        top: isMobile ? "-234px" : "-350px",
                        left: "4%",
                        width: isMobile ? "250px" : "360px",
                        transform: loaded
                            ? `translateX(0) rotate(${scrollDir === "down" ? "-4deg" : "4deg"})`
                            : "translateX(-120px) rotate(0deg)",

                        transition: "transform 0.8s ease, opacity 0.8s ease",
                        opacity: loaded ? 1 : 0,
                        zIndex: 5,
                    }}
                />

                {/* Middle poster */}
                <Box
                    component="img"
                    src={images.middle ? urlFor(images.middle).width(900).url() : ""}
                    sx={{
                        position: "absolute",
                        top: isMobile ? "-63px" : "-123px",
                        left: isMobile ? "23%" : "25%",
                        width: isMobile ? "312px" : "450px",
                        transform: loaded
                            ? `translateY(0) rotate(${scrollDir === "down" ? "-3deg" : "3deg"})`
                            : "translateY(40px) rotate(0deg)",

                        transition: "transform 0.8s ease, opacity 0.8s ease",
                        opacity: loaded ? 1 : 0,
                        zIndex: 6,
                        filter: "drop-shadow(0px 30px 15px rgba(0,0,0,0.3))",
                    }}
                />

                {/* Big Right Image */}
                <Box
                    component="img"
                    src={images.right ? urlFor(images.right).width(1200).url() : ""}
                    sx={{
                        position: "absolute",
                        top: isMobile ? " 225px" : "50px",
                        right: isMobile ? "22%" : "1% ",
                        width: isMobile ? "290px" : "570px",
                        transform: loaded
                            ? `translateX(0) rotate(${scrollDir === "down" ? "-2deg" : "2deg"})`
                            : "translateX(120px) rotate(0deg)",

                        transition: "transform 0.8s ease, opacity 0.8s ease",
                        opacity: loaded ? 1 : 0,
                        zIndex: 7,
                        filter: "drop-shadow(0px 25px 20px rgba(0,0,0,0.25))",
                    }}
                />
            </Box>

            {/* ------------------------------------
                3️⃣ SCROLL CONTROLLED GIANT TEXT
            ------------------------------------- */}
            <Box
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    position: "relative",
                    bottom: isMobile ? "-100px" : "150px",
                    transform: "skewY(-3deg)",

                }}
            >
                <Typography
                    sx={{
                        fontSize: isMobile ? "110px" : isLargeScreen ? "375px" : "250px",
                        fontWeight: 800,
                        fontFamily: "Inter Tight, sans-serif",
                        textTransform: "capitalize",
                        fontStyle: "italic",
                        whiteSpace: "nowrap",
                        transform: `translateX(${offset}px)`,
                        transition: "transform 0.2s ease-out",
                        color: "#000",
                        position: "relative",
                        left: "-30%",
                    }}
                >
                    USUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSUSU
                </Typography>
            </Box>
            {/* text and big heading */}
            <Box
                ref={containerRef}
                sx={{
                    padding: isMobile ? "140px 20px 0px 20px" : "80px 0px 0px 0px",
                    position: "relative",
                    zIndex: isMobile ? 1 : 1,

                }}
            >
                {/* Electric doodle */}
                <Box
                    component="img"
                    src={ElectricDoodle}
                    sx={{
                        position: "absolute",
                        left: isMobile ? "8%" : "12%",
                        bottom: isMobile ? "6%" : "250px",
                        width: isMobile ? "30px" : isLargeScreen ? "135px" : "90px",
                        opacity: 1,
                        zIndex: 1,
                    }}
                />

                {/* -----------------------------
                ANIMATED TEXT BLOCK
            ------------------------------*/}
                <Box sx={{ textAlign: "center", mb: isMobile ? "70px" : "130px" }}>
                    {/* small + big text lines */}
                    {LINES_2.map((line, i) =>
                        renderLine2(
                            i,
                            progress,
                            i < 3 ? smallTextSize : bigTextSize,
                            isMobile
                        )
                    )}
                </Box>

                {/* Random doodle behind heading */}
                <Box
                    id="services"
                    component="img"
                    src={RandomDoodle}
                    sx={{
                        position: "absolute",
                        left: "56%",
                        top: isMobile ? "88%" : "76%",
                        transform: "translateX(-50%)",
                        width: isMobile ? "100px" : isLargeScreen ? "525px" : "350px",
                        zIndex: isMobile ? 0 : 0,
                        opacity: 1,
                    }}
                />
            </Box>
        </Box >
    );
};

export default ManifestoSection;


