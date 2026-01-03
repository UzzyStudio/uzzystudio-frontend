import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, useMediaQuery, keyframes } from "@mui/material";
import { client, urlFor } from "../../sanityClient";


// Assets
import BigLogo from "../../assets/Layer_1.svg";
import SmallIcon from "../../assets/Group_14.svg fill.svg";

// Keyframes
const slideDown = keyframes`
  0% { opacity: 0; transform: translateY(-80px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  0% { opacity: 0; transform: translateY(60px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Hero = () => {
    const isTablet = useMediaQuery("(max-width:1024px)");
    const isMobile = useMediaQuery("(max-width:600px)");
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");

    const [hero, setHero] = useState(null);

    useEffect(() => {
        client
            .fetch(`*[_type == "heroSection"]`)
            .then((data) => {
                console.log("HERO DATA:", data);
                setHero(data[0]);
            })
            .catch(console.error);
    }, []);


    if (!hero) return null;

    return (
        <Box
            component="section"
            sx={{
                width: "100%",
                maxWidth: isLargeScreen ? "100%" : "1600px",
                margin: "auto",
                px: isLargeScreen ? { xs: 2, sm: 4, md: 12 } : { xs: 2, sm: 4, md: 6 },
                pt: isMobile ? 14 : 10,
                pb: 20,
            }}
        >
            <Grid container sx={{
                width: "100%",  // xs=mobile, sm=tablet, md=desktop
                position: "relative"
            }}>

                {/* LEFT — BIG LOGO */}
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            animation: `${slideDown} 1.2s ease-out`,
                            animationFillMode: "forwards",
                            zIndex: 100,
                        }}
                    >
                        <img
                            src={urlFor(hero.heroImage).width(900).url()}
                            alt="Hero Logo"
                            style={{
                                width: "100%",
                                maxWidth: isMobile
                                    ? "240px"
                                    : isTablet
                                        ? "480px"
                                        : isLargeScreen
                                            ? "900px"
                                            : "600px",
                                height: "auto",
                                position: "relative",
                                top: isMobile ? -50 : isTablet ? -100 : -60,
                            }}
                        />
                    </Box>
                </Grid>

                {/* RIGHT — TEXT */}
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            position: isMobile ? "relative" : "absolute",
                            right: isMobile ? "-135px" : "130px",
                            top: isMobile ? "-28px" : "200px",
                            textAlign: "right",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: isMobile ? "center" : "flex-start",
                            width: isMobile ? "100%" : "auto",
                            animation: `${slideUp} 1s ease-out`,
                            animationDelay: "1s",
                            opacity: 0,
                            animationFillMode: "forwards",
                        }}
                    >
                        {/* Small Icon */}
                        <Box sx={{ mb: 1, pl: isMobile ? 0 : "30px" }}>
                            <img src={SmallIcon} alt="icon" width={isMobile ? 22 : isLargeScreen ? 30 : 24} />
                        </Box>

                        {/* Text */}
                        <Typography
                            sx={{
                                fontFamily: "Inter Tight, sans-serif",
                                fontSize: isMobile ? "12px" : isLargeScreen ? "18px" : "13px",
                                fontWeight: 900,
                                letterSpacing: "0.5px",
                                textTransform: "uppercase",
                                lineHeight: 1.2,
                                color: "#1D1D1B",
                                whiteSpace: "pre-line", // 👈 important for line breaks
                            }}
                        >
                            {/* WE CREATE <br />
                            <Box
                                component="span"
                                sx={{
                                    display: "block",
                                    textAlign: isMobile ? "center" : "left",
                                }}
                            >
                                WEBSITES AND BRANDS <br />
                                PEOPLE REMEMBER. <br />
                                NOT JUST SCROLL PAST.
                            </Box> */}
                            {hero.text}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Hero;
