import { Button, Box, Typography, useMediaQuery } from "@mui/material";
import { useRef, useLayoutEffect } from "react";
import { useEffect, useState } from "react";
import { client, urlFor } from "../../sanityClient";
import gsap from "gsap";
import "./style.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger);
const ServicesStackSection = () => {
  const isLargeScreen = useMediaQuery("(min-width: 2560px)");
  const isXLScreen = useMediaQuery("(min-width: 1920px)");
  const isLGScreen = useMediaQuery("(min-width: 1440px)");
  const isSmScreen = useMediaQuery("(min-width: 600px)");
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "servicesStackSection"][0]{ services }`)
      .then((res) => setData(res));
  }, []);

  const handleScrollToContact = () => {
    const contact = document.getElementById("contact");
    if (!contact || !window.lenis) return;

    const y = contact.getBoundingClientRect().top + window.pageYOffset - 120;

    window.lenis.scrollTo(y, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };

  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  cardRefs.current = [];

  useLayoutEffect(() => {
    if (!data?.services?.length) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current;

      // 🔹 Base card setup
      gsap.set(cards, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      });

      // 🔹 Initial states with smooth setup
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i === 0 ? 0 : "100%",
          opacity: i === 0 ? 1 : 0,
          filter: i === 0 ? "brightness(1)" : "brightness(1)",
          backgroundColor: i === 0 ? "#ffffff" : "#E7E7E7",
          force3D: true,
          willChange: "transform, opacity, filter",
        });
      });

      // 🔹 Smooth pinned timeline with better easing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * window.innerHeight * 1.0}`,
          scrub: 1.2, // Smoother scrub (higher = smoother, less jittery)
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinReparent: false,
        },
      });

      // 🔹 Card transitions with smooth easing
      cards.forEach((card, i) => {
        if (i === 0) return;

        // Enable hardware acceleration for smoother performance
        gsap.set(card, {
          force3D: true,
          willChange: "transform, opacity, filter",
        });

        // Custom smooth easing function
        const smoothEase = "power3.out";

        // Incoming card with smooth easing and fade
        tl.fromTo(
          card,
          { y: "100%", opacity: 0, filter: "brightness(1)" },
          {
            y: "0%",
            opacity: 1,
            filter: "brightness(1)",
            ease: smoothEase,
            duration: 1.2,
          }
        );

        // Previous card fades + dims with smooth easing
        tl.to(
          cards[i - 1],
          {
            opacity: 0.25,
            filter: "brightness(0.25)",
            backgroundColor: "#F0F0F0",
            ease: smoothEase,
            duration: 1.2,
          },
          "<0.15" // Slight overlap for smoother transition
        );
      });
    }, containerRef);

    return () => {
      ctx.revert(); // ✅ kills ScrollTrigger + timeline cleanly
    };
  }, [data]);
  ScrollTrigger.matchMedia({
    "(max-width: 768px)": () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    },
  });

  return (
    <Box
      id="services"
      sx={{
        width: "100%",
        position: "relative",
        overflow: "visible",
        isolation: "isolate",
        zIndex: 1,
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          width: "100%",
          height: { xs: "100vh", md: "100vh" },
          position: "relative",
          overflow: "hidden",
          borderTop: "2px solid #E7E7E7",
          margin: 0,
          padding: 0,
          isolation: "isolate",
          contain: "layout style paint",
          zIndex: 1,
          willChange: "transform",
        }}
      >
        {data?.services?.map((service, index) => (
          <Box
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            sx={{
              width: "100%",
              height: "100%",
              maxWidth: "100%", // Always full width for background
              margin: 0,
              display: "flex",
              justifyContent: "center", // Center the content wrapper
              alignItems: "center",
              padding: {
                xs: "30px 0",
                sm: "40px 0",
                md: 0,
              },
              color: "#1D1D1B",
              boxSizing: "border-box",
              willChange: "transform, opacity, filter",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)",
              overflow: "hidden",
              contain: "layout style paint",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {/* Content wrapper with max-width constraint */}
            <Box
              sx={{
                width: "100%",
                minWidth: { md: isLGScreen ? "1440px" : "100%" },
                maxWidth: "100rem",
                // height: "60vh",
                height: { xs: "auto", md: "100%" },
                display: "flex",
                justifyContent: { xs: "flex-start", md: "space-between" },
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                paddingTop: {
                  xs: "20px",
                  sm: "30px",
                  md: isLargeScreen
                    ? "80px"
                    : isXLScreen
                      ? "70px"
                      : isLGScreen
                        ? "57px"
                        : "50px",
                },
                paddingLeft: {
                  xs: "20px",
                  sm: "30px",
                  md: isLargeScreen
                    ? "100px"
                    : isXLScreen
                      ? "80px"
                      : isLGScreen
                        ? "67px"
                        : "50px",
                },
                paddingRight: {
                  xs: "20px",
                  sm: "30px",
                  md: isLargeScreen
                    ? "120px"
                    : isXLScreen
                      ? "100px"
                      : isLGScreen
                        ? "80px"
                        : "50px",
                },
                paddingBottom: { xs: "30px", sm: "40px", md: 0 },
                gap: { xs: 2, sm: 4, md: 0 },
                margin: {
                  xs: "15px 0px 15px 0px",
                  // sm: "10px auto",
                  sm: "25px 0px 25px 0px",
                  md: "0 auto",
                },
                boxSizing: "border-box",
              }}
            >
              {/* LEFT COLUMN */}
              <Box
                sx={{
                  width: { xs: "100%", sm: "100%", md: "33.33%" },
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: { xs: "flex-start", md: "space-around" },
                  height: "100%",
                  alignItems: { xs: "flex-start", md: "flex-start" },
                  position: "relative",
                  zIndex: { xs: 2, md: 1 },
                  order: { xs: 1, md: 0 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "20px",
                        sm: "23px",
                        md: isLargeScreen ? "55px" : "38px",
                      },
                      fontFamily: "Inter Tight, sans-serif",
                      letterSpacing: "-1.1px",
                      fontWeight: 800,
                      textTransform: "lowercase",
                      mb: { xs: 0.5, md: 1 },
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: "10px",
                        sm: "11px",
                        md: isLargeScreen ? "26px" : "18px",
                      },
                      fontFamily: "Inter Tight, sans-serif",
                      mb: { xs: 2, md: 3 },
                      maxWidth: {
                        xs: "100%",
                        sm: "86%",
                        md: isLargeScreen ? "675px" : "450px",
                      },
                      lineHeight: 1.4,
                    }}
                  >
                    {service.description}
                  </Typography>
                </Box>

                <Button
                  data-clickable
                  onClick={handleScrollToContact}
                  disableElevation
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    px: { xs: 2, sm: 3, md: isLargeScreen ? 4.2 : 2.9 },
                    py: { xs: 2, sm: 2.5, md: isLargeScreen ? 4.5 : 2.3 },
                    fontSize: { xs: "11px", sm: "14px", md: isLargeScreen ? "19px" : "15px" },
                    borderRadius: "40px",
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: 900,
                    fontFamily: "Inter Tight, sans-serif",
                    textTransform: "none",
                    boxShadow: "none",
                    cursor: "pointer",

                    /* Hover BG animation */
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "0%",
                      backgroundColor: "#CAF55E",
                      transition: "height 0.99s cubic-bezier(0.22, 1, 0.36, 1)",
                      zIndex: 0,
                    },

                    "&:hover::before": {
                      height: "100%",
                    },

                    /* Change TEXT color safely */
                    "&:hover .button-text-wrapper": {
                      color: "#000",
                    },

                    "&:focus": { outline: "none" },
                    "&.Mui-focusVisible": { boxShadow: "none" },
                  }}
                >
                  <Box
                    className="button-text-wrapper"
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      color: "white",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Let's Work Together
                  </Box>
                </Button>



              </Box>

              {/* MIDDLE BULLETS */}
              <Box
                sx={{
                  display: "flex",
                  width: { xs: "100%", sm: "100%", md: "auto" },
                  flexShrink: 0,
                  flexDirection: "column",
                  gap: { xs: 0, sm: 1, md: 1 },
                  alignItems: "flex-start",
                  justifyContent: { xs: "flex-start", md: "center" },
                  height: { xs: "auto", md: "100%" },
                  margin: { xs: 0, md: "0 auto" },
                  mt: { xs: 2, sm: 3, md: 0 },
                  mb: { xs: 2, sm: 3, md: 0 },
                  position: "relative",
                  zIndex: { xs: 2, md: 1 },
                  order: { xs: 2, md: 0 },
                }}
              >
                {service.points?.map((p, i) => (
                  <Typography
                    key={i}
                    sx={{
                      fontSize: {
                        xs: "10px",
                        sm: "11px",
                        md: isLargeScreen ? "26px" : "18px",
                      },
                      fontWeight: 400,
                      fontFamily: "Inter Tight, sans-serif",
                      lineHeight: 1.5,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    → {p}
                  </Typography>
                ))}
              </Box>

              {/* RIGHT IMAGE */}
              <Box
                sx={{
                  width: { xs: "100%", md: "33.33%" },
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingRight: { xs: 0, md: "35px" },
                  marginLeft: "auto",
                  position: "relative",
                  zIndex: { xs: 1, md: 1 },
                  order: { xs: 3, md: 0 },
                  // marginBottom: { xs: "80px", md: 0 },
                  // paddingBottom: { xs: "20px", md: 0 },
                }}
              >
                <Box
                  component="img"
                  src={urlFor(service.image).width(800).url()}
                  alt={service.title}
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    height: { xs: "250px", sm: "350px", md: "auto" },
                    borderRadius: "8px",
                    objectFit: "cover",
                    // paddingBottom: { xs: "20px", md: 0 },
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ServicesStackSection;
