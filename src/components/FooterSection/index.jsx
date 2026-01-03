import { Box, Grid, Typography, Button, useMediaQuery } from "@mui/material";
import BigLogo from "../../assets/bigLogoFooter.svg";
import RandomImg from "../../assets/randomimg.svg";
import { client, urlFor } from "../../sanityClient";
import { useEffect, useState } from "react";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        client
            .fetch(`*[_type == "footerSection"][0]`)
            .then((res) => setFooterData(res));
    }, []);


    const handleScrollToSection = (id) => {
        const section = document.getElementById(id);
        if (!section || !window.lenis) return;

        const headerOffset = 120; // same offset as header
        const y = section.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.lenis.scrollTo(y);
    };



    const handleScrollToContact = () => {
        const contact = document.getElementById("contact");
        if (!contact) return;

        gsap.to(window, {
            scrollTo: {
                y: contact,
                autoKill: false,
            },
            duration: 1.2,
            ease: "power2.out",
        });
    };

    const sectionRef = useRef(null);
    const menuRef = useRef(null);
    const logoRef = useRef(null);
    const buttonRef = useRef(null);
    const randomRef = useRef(null);

    useLayoutEffect(() => {
        if (!footerData) return; // wait for data

        const ctx = gsap.context(() => {
            // MENU — slide down
            gsap.from(menuRef.current, {
                y: -60,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });

            // BIG LOGO — left to right
            gsap.from(logoRef.current, {
                x: -120,
                opacity: 0,
                duration: 1.4,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            // BUTTON — bottom to top
            gsap.from(buttonRef.current, {
                y: 60,
                opacity: 0,
                duration: 1.3,
                delay: 0.5,
                ease: "power3.out",
                force3D: true,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            });

            // RANDOM IMG — bottom to top + rotate
            gsap.from(randomRef.current, {
                y: 80,
                opacity: 0,
                rotate: 8,
                duration: 1.4,
                delay: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [footerData]); // <-- run when footerData is ready


    return (
        <Box
            component="section"
            ref={sectionRef}
            sx={{
                width: "100%",
                color: "#fff",
                fontFamily: "Inter Tight, sans-serif",
            }}
        >
            {/* INNER CONTAINER */}
            <Box sx={{
                maxWidth: isLargeScreen ? "100%" : "1600px", width: "93%", paddingTop: { xs: "20px", md: "35px" },
                px: isLargeScreen ? { xs: 1, sm: 2, md: 12 } : { xs: 1, sm: 2, md: 4 },
                mx: "auto", backgroundColor: "#1D1D1B", borderTopLeftRadius: "20px", borderTopRightRadius: "20px"
            }}>

                {/* ========== ROW 1 — MENU ========== */}
                <Grid ref={menuRef}
                    container
                    sx={{
                        mb: { xs: 15, md: 8 },
                        justifyContent: { xs: "center", md: "space-between" },
                        alignItems: "center",
                        textAlign: { xs: "center", md: "left" },
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 2, md: 0 },
                        willChange: 'transform, opacity'
                    }}>

                    {/* LEFT MENU — 3 ITEMS */}
                    <Grid item >
                        <Grid container spacing={4} sx={{ marginLeft: { xs: 0, md: "80px" }, justifyContent: { xs: "center", md: "flex-start" } }}>
                            {footerData?.menuItems?.map((item, i) => (
                                <Grid item key={i} >
                                    <Typography
                                        onClick={() => handleScrollToSection(item.scrollId)} sx={{
                                            fontSize: { xs: "12px", sm: "13px", md: isLargeScreen ? "22px" : "15px" },
                                            fontWeight: 500,
                                            cursor: "pointer",
                                            fontFamily: "Inter Tight, sans-serif",
                                            "&:hover": { opacity: 0.6 },
                                            textTransform: "Lowercase",
                                            marginLeft: isLargeScreen ? "30px" : "20px",
                                            willChange: 'transform',
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* RIGHT MENU — 2 ITEMS */}
                    <Grid item>
                        <Grid container spacing={4} sx={{ marginRight: { xs: 0, md: "80px" }, justifyContent: { xs: "center", md: "flex-end" } }}>
                            {footerData?.socialLinks?.map((item, i) =>
                            (<Grid item key={i}>
                                <Typography
                                    component="a"
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        fontSize: { xs: "10px", sm: "13px", md: isLargeScreen ? "22px" : "15px" },
                                        fontWeight: 500,
                                        color: "#fff",
                                        fontFamily: "Inter Tight, sans-serif",
                                        cursor: "pointer",
                                        "&:hover": { opacity: 0.6 },
                                        textTransform: "uppercase",
                                        marginRight: isLargeScreen ? "30px" : "20px",
                                        textDecoration: "none",
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container alignItems="center" spacing={4} sx={{ width: "100%" }}>
                    <Grid
                        item
                        xs={12}
                        md={10}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",   // flush to bottom
                            height: "100%",
                        }}
                    >
                        {/* CENTER — BUTTON */}
                        <Grid
                            sx={{
                                textAlign: "center", position: "relative", top: { xs: "120px", sm: "140px", md: "160px" },
                                left: { xs: "210px", sm: "200px", md: "861px" }, zIndex: "2", transform: "translateX(-50%)",
                                "@media (min-width:1300px)": {
                                    top: "164px",
                                    left: "995px",
                                },
                            }}

                        >
                            <Button
                                onClick={handleScrollToContact}
                                ref={buttonRef}
                                sx={{
                                    px: { xs: 1.8, sm: 3, md: isLargeScreen ? 6 : 4 },   // smaller padding on mobile
                                    py: { xs: 1.4, sm: 2.5, md: isLargeScreen ? 4.5 : 3 },
                                    fontSize: { xs: "10px", sm: "14px", md: isLargeScreen ? "22px" : "15px" },
                                    borderRadius: "40px",
                                    backgroundColor: "#CAF55E",
                                    color: "#1D1D1B",
                                    fontWeight: 700,
                                    fontFamily: "Inter Tight, sans-serif",
                                    transform: "rotate(-20deg)",   // slight left tilt
                                    boxShadow: "0px 4px 10px rgba(0,0,0,0.12)",
                                    textTransform: "lowercase",   // small letters
                                    transition: "0.25s ease",

                                    "&:hover": {
                                        backgroundColor: "#d4ff74",
                                        transform: "rotate(0deg) scale(1.03)", // hover correction + pop
                                    },
                                }}
                            >
                                Let's Work Together
                            </Button>
                        </Grid>

                        {/* RIGHT — RANDOM IMAGE */}
                        <Grid ref={randomRef}

                            sx={{
                                textAlign: "center", position: "relative", top: { xs: "-20px", sm: "80px", md: "214px" },
                                left: { xs: "65px", sm: "180px", md: "770px" }, transform: "translateX(-50%)", willChange: 'transform, opacity',
                                "@media (min-width:1300px)": {
                                    top: "232px",
                                    left: "955px",
                                },

                            }}
                        >
                            <img
                                src={RandomImg}
                                alt="random"
                                style={{
                                    width: isLargeScreen ? "112px" : { xs: "5px", md: "75px" }, height: "auto", maxWidth: isLargeScreen ? "112px" : { xs: "20px", sm: "55px", md: "75px" }
                                }}
                            />
                            <Typography sx={{
                                fontSize: { xs: "10px", sm: "12px", md: isLargeScreen ? "22px" : "15px" }, fontFamily: "Inter Tight, sans-serif", marginTop: { xs: "10px", sm: "20px", md: isLargeScreen ? "45px" : "30px" },
                            }}>
                                {footerData?.footerEmail}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* ========== ROW 2 — MAIN CONTENT ========== */}
                <Grid container alignItems="center" spacing={4}>
                    {/* LEFT — BIG LOGO ONLY */}
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",   // flush to bottom
                            height: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                overflow: "hidden", // optional: avoids scrollbars if image is slightly larger
                                marginLeft: {
                                    xs: "-10px", // mobile 
                                    sm: "-35px",
                                    //  tablet & desktop 
                                },
                            }}
                        >
                            <img
                                ref={logoRef}
                                src={footerData?.footerLogo ? urlFor(footerData.footerLogo).width(2000).url() : ""}
                                alt="footer logo"
                                style={{
                                    width: "100%", // makes image fill container width
                                    height: "auto", // maintain aspect ratio
                                    display: "block", // remove default inline spacing
                                    willChange: 'transform, opacity'
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
}
