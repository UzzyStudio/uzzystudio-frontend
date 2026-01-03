import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { client, urlFor } from "../../sanityClient";

export default function AnimatedMembers() {
    const [data, setData] = useState(null);

    // 🔹 Sanity fetch
    const query = `
    *[_type == "animatedMembersSection"][0]{
      lineOne,
      lineTwo,
      wordBeforeImages,
      wordAfterImages,
      memberImages
    }
  `;

    useEffect(() => {
        client.fetch(query).then(setData);
    }, []);

    // 🔹 Responsive
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const resize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const isMobile = windowWidth <= 658;
    const isTablet = windowWidth > 768 && windowWidth <= 1024;

    // 🔹 Scroll
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 20%", "center center"]
    });

    // 🔹 Convert MotionValue → number (SAFE)
    const [progress, setProgress] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setProgress(v);
    });

    // 🔹 Text animations
    const wordLeftX = useTransform(
        scrollYProgress,
        [0, 1],
        [isMobile ? 110 : isTablet ? 80 : 110, 0]
    );

    const wordRightX = useTransform(
        scrollYProgress,
        [0, 1],
        [isMobile ? -110 : isTablet ? -80 : -110, 0]
    );

    // 🔹 Spread distance
    const spread = isMobile ? 20 : isTablet ? 30 : 40;

    return (
        <Box
            ref={containerRef}
            sx={{
                width: "100%",
                maxWidth: isLargeScreen ? "100%" : "1600px",
                mx: "auto",
                height: isMobile ? "600px" : "100vh",
                background: "#F8F8F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                padding: isLargeScreen ? "0 120px" : "0 20px",
            }}
        >
            <Typography
                sx={{
                    fontSize: isMobile ? "30px" : isTablet ? "48px" : isLargeScreen ? "112px" : "75px",
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: isMobile ? "40px" : isTablet ? "52px" : isLargeScreen ? "120px" : "80px",
                    fontFamily: "'Inter Tight', sans-serif",
                    color: "#121314",
                    letterSpacing: "-2px",
                }}
            >
                {data?.lineOne} <br />
                {data?.lineTwo} <br />

                {/* LEFT WORD */}
                <motion.span
                    style={{
                        display: "inline-block",
                        marginRight: "6px",
                        x: wordLeftX,
                        letterSpacing: "-2px",
                    }}
                >
                    {data?.wordBeforeImages}
                </motion.span>

                {/* IMAGES */}
                <span
                    style={{
                        position: "relative",
                        width: "280px",
                        height: "70px",
                        display: "inline-block",
                    }}
                >
                    {data?.memberImages?.map((img, i) => {
                        const center = (data.memberImages.length - 1) / 2;
                        const direction = i - center;

                        return (
                            <motion.img
                                key={i}
                                src={urlFor(img).width(120).url()}
                                style={{
                                    width: isMobile ? 40 : isTablet ? 45 : isLargeScreen ? 102 : 68,
                                    height: isMobile ? 40 : isTablet ? 45 : isLargeScreen ? 102 : 68,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    y: "-50%",
                                    translateX: "-50%",
                                    x: direction * spread * progress,
                                }}
                            />
                        );
                    })}
                </span>

                {/* RIGHT WORD */}
                <motion.span
                    style={{
                        display: "inline-block",
                        marginLeft: "6px",
                        letterSpacing: "-2px",
                        x: wordRightX,
                    }}
                >
                    {data?.wordAfterImages}
                </motion.span>
            </Typography>
        </Box>
    );
}
