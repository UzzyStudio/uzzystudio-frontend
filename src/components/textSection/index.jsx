import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import React from "react";
import "./style.css";

import RandomDoodle from "../../assets/random.svg";
import ZigZagDoodle from "../../assets/zigzag.svg";
import HeartDoodle from "../../assets/heart.svg";
import BlinkFace from "../../assets/blink face.svg";

/* -----------------------------
   TEXT LINES + INDENTS
--------------------------------*/
const LINES = [
    { text: "Rooted in Creativity", indent: 0 },
    { text: "we design emotions", indent: 0 },
    { text: "and build digital", indent: 40 },
    { text: "experiences", indent: 80 },
    { text: "that excite,", indent: 120 },
    { text: "drive ideas, and", indent: 80 },
    { text: "make people go,", indent: 40 },
    { text: "'Damn.'", indent: 160 },
];

// Split each line into characters
const LINES_CHARS = LINES.map((line) =>
    line.text.split("").map((c) => (c === " " ? "\u00A0" : c))
);

// Calculate global character offsets
const LINE_OFFSETS = [];
let TOTAL_CHARS = 0;

LINES_CHARS.forEach((chars, idx) => {
    LINE_OFFSETS[idx] = TOTAL_CHARS;
    TOTAL_CHARS += chars.length;
});

/* -----------------------------
   MAIN COMPONENT
--------------------------------*/
const CreativeTextSection = () => {
    const isTablet = useMediaQuery("(max-width: 1024px)");
    const isMobile = useMediaQuery("(max-width: 600px)");
    const isBigScreen = useMediaQuery("(min-width: 1300px)");
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");


    const containerRef = useRef(null);
    const [progress, setProgress] = useState(0);

    /** Scroll → progress map */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const winHeight = window.innerHeight;

            const trigger = rect.top + rect.height * 0.2;
            let p = 1 - trigger / winHeight;

            p = Math.max(0, Math.min(15, p));
            setProgress(p);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    /** Responsive font sizes */
    const fontSize = isMobile
        ? "38px"
        : isTablet
            ? "70px"
            : isLargeScreen
                ? "180px"
                : isBigScreen
                    ? "130px"
                    : "100px";
    const lineSpacingFix = isMobile ? "-5px" : isTablet ? "-10px" : isLargeScreen ? "-35px" : "-25px";

    /** Responsive indent scale */
    const INDENT_SCALE = isMobile ? 0.3 : isTablet ? 0.6 : 1;

    return (
        <Box id="vision" sx={{ width: "100%", display: "flex", flexDirection: "column", marginTop: "80px" }}>
            <Box
                ref={containerRef}
                sx={{
                    width: "100%",
                    position: "relative",
                    padding: isMobile ? "0px 0px 50px 0px" : "0px 0px 80px 0px",
                    display: "flex",
                    justifyContent: "center",

                }}
            >
                {/* DOODLES (RESPONSIVE POSITIONS) */}
                {/* <Doodle
                    src={HeartDoodle}
                    sx={{
                        top: isMobile ? "5%" : isTablet ? "12%" : isLargeScreen ? "22%" : isBigScreen ? "22%" : "23%",
                        left: isMobile ? "60%" : isTablet ? "70%" : isLargeScreen ? "79%" : isBigScreen ? "79%" : "76%",
                        width: isMobile ? "40px" : isTablet ? "70px" : isLargeScreen ? "180px" : isBigScreen ? "120px" : "85px",
                    }}
                /> */}

                <Doodle
                    src={ZigZagDoodle}
                    sx={{
                        top: isMobile ? "28%" : isTablet ? "35%" : isLargeScreen ? "55%" : isBigScreen ? "55%" : "53.9%",
                        left: isMobile ? "20%" : isTablet ? "26%" : isLargeScreen ? "49%" : isBigScreen ? "49%" : "49%",
                        width: isMobile ? "220px" : isTablet ? "380px" : isLargeScreen ? "945px" : isBigScreen ? "630px" : "498px",
                    }}
                />

                <Doodle
                    src={RandomDoodle}
                    sx={{
                        top: isMobile ? "50%" : isTablet ? "58%" : isLargeScreen ? "78%" : isBigScreen ? "78%" : "75%",
                        left: isMobile ? "30%" : isTablet ? "36%" : isLargeScreen ? "52%" : isBigScreen ? "52%" : "51%",
                        width: isMobile ? "150px" : isTablet ? "250px" : isLargeScreen ? "750px" : isBigScreen ? "500px" : "398px",
                    }}
                />


                {/* TEXT */}
                <Box sx={{ position: "relative", zIndex: 5, width: "100%", px: 2 }}>
                    {LINES.map((line, i) =>
                        renderLine(i, progress, fontSize, lineSpacingFix, INDENT_SCALE)
                    )}
                </Box>
            </Box>

            {/* -----------------------------
                BOTTOM SECTION (IMAGE + TEXT)
            ------------------------------ */}
            <Grid
                container

                spacing={2}
                sx={{
                    mt: isMobile ? 2 : 5,
                    position: "relative",
                    bottom: isMobile ? "40px" : "20px",
                    gap: isMobile ? 2 : 10,
                    px: isMobile ? 2 : 6,
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "center" : "flex-end",
                    justifyContent: isMobile ? "center" : "flex-end",
                    textAlign: isMobile ? "center" : "right",
                }}
            >
                {/* IMAGE */}
                <Grid
                    item
                    xs={12}
                    md={7}
                    sx={{
                        display: "flex",
                        justifyContent: isMobile ? "center" : "center",
                        mb: isMobile ? 2 : 0,
                        marginRight: isMobile ? 0 : "110px",
                    }}
                >
                    <img
                        src={BlinkFace}
                        style={{
                            width: isMobile ? "80px" : isLargeScreen ? "180px" : "120px",
                            height: "auto",
                        }}
                    />
                </Grid>

                {/* TEXT */}
                <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                        mt: isMobile ? 0 : 4,
                        textAlign: isMobile ? "center" : "right",
                        marginRight: isMobile ? 0 : "100px",

                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Inter Tight",
                            fontSize: isMobile ? "11px" : isLargeScreen ? "18px" : "13px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: "#1D1D1B",
                            lineHeight: 1.4,
                        }}
                    >
                        WE ARE THE AGENCY
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily: "Inter Tight",
                            fontSize: isMobile ? "11px" : isLargeScreen ? "18px" : "13px",
                            fontWeight: 900,
                            textAlign: isMobile ? "center" : "left",
                            textTransform: "uppercase",
                            color: "#1D1D1B",
                            lineHeight: 1.4,
                        }}
                    >
                        THAT RUNS ON DEEP INSIGHTS <br />
                        PURE EMOTIONS AND BOLD IDEAS
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

/* -----------------------------
   DOODLE COMPONENT
--------------------------------*/
const Doodle = ({ src, sx }) => (
    <Box
        component="img"
        src={src}
        sx={{
            position: "absolute",
            opacity: 1,
            zIndex: 1,
            pointerEvents: "none",
            transform: "translateX(-50%)",
            ...sx,
        }}
    />
);

/* -----------------------------
   RENDER LINE (RESPONSIVE)
--------------------------------*/
const FADE_WINDOW = 20;

const renderLine = (
    lineIndex,
    progress,
    fontSize,
    spacingFix,
    INDENT_SCALE
) => {
    const chars = LINES_CHARS[lineIndex];
    const baseOffset = LINE_OFFSETS[lineIndex];
    const indent = LINES[lineIndex].indent * INDENT_SCALE;

    const letterProgress = progress * TOTAL_CHARS;

    return (
        <Typography
            key={lineIndex}
            sx={{
                fontFamily: "Inter Tight",
                fontSize,
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: "-0.03em",
                display: "block",
                textAlign: "center",
                mb: spacingFix,
                ml: 0,

                whiteSpace: "pre-wrap",
            }}
        >
            {chars.map((char, i) => {
                const globalIndex = baseOffset + i;

                const MIN_OPACITY = 0.1;

                const delta = letterProgress - globalIndex;
                let opacity = delta / FADE_WINDOW;

                opacity = Math.max(MIN_OPACITY, Math.min(1, opacity));

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

export default CreativeTextSection;
