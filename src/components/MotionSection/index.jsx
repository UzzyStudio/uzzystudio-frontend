import React, { useEffect, useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client } from "../../sanityClient";
import { useState } from "react";


gsap.registerPlugin(ScrollTrigger);

const MotionSection = () => {
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");
    const [content, setContent] = useState(null);

    useEffect(() => {
        client
            .fetch(`*[_type == "motionSection"][0]`)
            .then((res) => setContent(res));
    }, []);

    const sectionRef = useRef(null);
    const topRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const headingRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!content) return; // Wait for content

        const ctx = gsap.context(() => {
            const smoothEase = "cubic-bezier(0.22, 1, 0.36, 1)";

            const animProps = {
                duration: 1.3,
                ease: smoothEase,
                opacity: 0,
                willChange: "transform, opacity",
            };

            gsap.from(topRef.current, {
                y: -20,
                filter: "blur(6px)",
                ...animProps,
                scrollTrigger: {
                    trigger: topRef.current,
                    start: "top 90%",
                },
            });

            gsap.from(leftRef.current, {
                x: -20,
                filter: "blur(6px)",
                ...animProps,
                scrollTrigger: {
                    trigger: leftRef.current,
                    start: "top 85%",
                },
            });

            gsap.from(rightRef.current, {
                x: 20,
                filter: "blur(6px)",
                ...animProps,
                scrollTrigger: {
                    trigger: rightRef.current,
                    start: "top 85%",
                },
            });

            gsap.from(headingRef.current, {
                scale: 0.92,
                y: 15,
                filter: "blur(10px)",
                duration: 1.8,
                ease: smoothEase,
                opacity: 0,
                willChange: "transform, opacity",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 85%",
                },
            });

            gsap.from(bottomRef.current, {
                y: 20,
                filter: "blur(6px)",
                ...animProps,
                scrollTrigger: {
                    trigger: bottomRef.current,
                    start: "top 90%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [content]); // <-- run GSAP when content loads


    return (
        <Box
            ref={sectionRef}
            sx={{
                backgroundColor: "#1D1D1B",
                color: "#CAF55E",
                py: 14,
                textAlign: "center",
                position: "relative",
            }}
        >
            <Box sx={{
                width: "100%",
                maxWidth: isLargeScreen ? "100%" : "1600px",
                mx: "auto",
                px: isLargeScreen ? 12 : 0
            }}>
                {/* Row 1 - Top Small Text */}
                <Typography
                    ref={topRef}
                    sx={{
                        color: "#fff",
                        fontSize: isLargeScreen ? "19px" : "13px",
                        fontFamily: "Inter Tight, sans-serif",
                        willChange: "transform, opacity",
                    }}
                >
                    {content?.topText}
                </Typography>

                {/* Row 2 - Left, Center, Right */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: { xs: "30px 23px", md: "60px 60px" },
                        gap: { xs: 3, md: 0 },
                    }}
                >
                    {/* LEFT TEXT */}
                    <Box sx={{ flex: 0.5, textAlign: { xs: "center", md: "left" } }}>
                        <Typography
                            ref={leftRef}
                            sx={{
                                color: "#fff",
                                fontSize: isLargeScreen ? "18px" : "12px",
                                fontFamily: "Inter Tight, sans-serif",
                                willChange: "transform, opacity",
                            }}
                        >
                            {content?.leftText}
                        </Typography>
                    </Box>

                    {/* CENTER HEADING */}
                    <Box sx={{ flex: 2 }}>
                        <Typography
                            ref={headingRef}
                            sx={{
                                fontSize: { xs: "36px", md: isLargeScreen ? "126px" : "84px" },
                                fontWeight: 800,
                                lineHeight: 1.1,
                                color: "#CAF55E",
                                textAlign: "center",
                                fontFamily: "Inter Tight, sans-serif",
                                willChange: "transform, opacity",
                            }}
                        >
                            {content?.centerHeading.split("\n").map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </Typography>
                    </Box>

                    {/* RIGHT TEXT */}
                    <Box sx={{ flex: 0.5, textAlign: { xs: "center", md: "right" } }}>
                        <Typography
                            ref={rightRef}
                            sx={{
                                color: "#fff",
                                fontSize: isLargeScreen ? "18px" : "12px",
                                fontFamily: "Inter Tight, sans-serif",
                                willChange: "transform, opacity",
                            }}
                        >
                            {content?.rightText}
                        </Typography>
                    </Box>
                </Box>

                {/* Row 3 - Bottom Small Text */}
                <Typography
                    ref={bottomRef}
                    sx={{
                        color: "#fff",
                        fontSize: isLargeScreen ? "21px" : "14px",
                        fontFamily: "Inter Tight, sans-serif",
                    }}
                >
                    {content?.bottomText}
                </Typography>
            </Box>
        </Box>
    );
};

export default MotionSection;
