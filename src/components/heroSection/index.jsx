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
  const isSmallScreen = useMediaQuery("(max-width:480px)");
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
        px: isSmallScreen
          ? 2
          : isMobile
          ? 3
          : isLargeScreen
          ? { xs: 2, sm: 4, md: 12 }
          : { xs: 2, sm: 4, md: 6 },
        pt: isSmallScreen ? 12 : isMobile ? 14 : 10,
        pb: isSmallScreen ? 12 : isMobile ? 16 : 20,
      }}
    >
      <Grid
        container
        sx={{
          width: "100%", // xs=mobile, sm=tablet, md=desktop
          position: "relative",
        }}
      >
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
                width: isSmallScreen
                  ? "100%"
                  : isMobile
                  ? "90%"
                  : isLargeScreen
                  ? "60vw"
                  : "50.625vw",
                maxWidth: isSmallScreen ? "80%" : isMobile ? "100%" : "none",
                height: "auto",
                position: "relative",
                top: isSmallScreen
                  ? -20
                  : isMobile
                  ? -50
                  : isTablet
                  ? -100
                  : -60,
              }}
            />
          </Box>
        </Grid>

        {/* RIGHT — TEXT */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: isMobile ? "relative" : "absolute",
              right: isSmallScreen ? 0 : isMobile ? "-135px" : "130px",
              left: !isSmallScreen ? "100" : isMobile ? "0px" : "130px",
              top: isSmallScreen ? 0 : isMobile ? "-28px" : "200px",
              textAlign: isSmallScreen
                ? "center"
                : isMobile
                ? "center"
                : "right",
              display: "flex",
              flexDirection: "column",
              alignItems: isSmallScreen
                ? "center"
                : isMobile
                ? "center"
                : "flex-start",
              width: isSmallScreen ? "100%" : isMobile ? "100%" : "auto",
              mt: isSmallScreen ? 2 : isMobile ? 0 : 0,
              animation: `${slideUp} 1s ease-out`,
              animationDelay: "1s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            {/* Small Icon */}
            <Box sx={{ mb: 1, pl: isSmallScreen ? 0 : isMobile ? 0 : "30px" }}>
              <img
                src={SmallIcon}
                alt="icon"
                width={
                  isSmallScreen ? 20 : isMobile ? 22 : isLargeScreen ? 30 : 24
                }
              />
            </Box>

            {/* Text */}
            <Typography
              sx={{
                fontFamily: "Inter Tight, sans-serif",
                fontSize: isSmallScreen
                  ? "10px"
                  : isMobile
                  ? "12px"
                  : isLargeScreen
                  ? "18px"
                  : "13px",
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
