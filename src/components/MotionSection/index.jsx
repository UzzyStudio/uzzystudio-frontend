import React, { useEffect, useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

import { client } from "../../sanityClient";
import { useState } from "react";
import bgMover from "../../assets/web-mover.svg";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease },
  },
};

const fadeDown = {
  hidden: {
    opacity: 0,
    y: -20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease },
  },
};

const headingAnim = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 15,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.8, ease },
  },
};


const MotionSection = () => {
  const isLargeScreen = useMediaQuery("(min-width: 2560px)");
  const isXLScreen = useMediaQuery("(min-width: 1920px)");
  const isLGScreen = useMediaQuery("(min-width: 1440px)");
  const isMdScreen = useMediaQuery("(min-width: 900px)");
  const isSmScreen = useMediaQuery("(min-width: 600px)");
  const [content, setContent] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "motionSection"][0]`)
      .then((res) => setContent(res));
  }, []);

  const sectionRef = useRef(null);



  const bgRef = useRef(null);

  const handleScrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (!servicesSection || !window.lenis) return;

    const headerOffset = 120;
    const y = servicesSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.lenis.scrollTo(y, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;

    if (!section || !bg) return;
    if (window.innerWidth < 768) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const ease = 0.08; // Adjusted for that "heavy/smooth" feel in the video

    const animate = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      // We use translate3d for performance and combine the 50% centering 
      // with the dynamic pixel offset
      bg.style.transform = `translate3d(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px), 0)`;

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();

      // 1. Find the center point of the section
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 2. Calculate the pixel distance from center to mouse
      // This makes the SVG follow the mouse 1:1 regardless of section size
      targetX = e.clientX - centerX;
      targetY = e.clientY - centerY;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Box padding={{ xs: "20px", sm: "30px", md: "40px" }} >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          ref={sectionRef}
          onClick={handleScrollToServices}
          data-clickable="true"
          borderRadius=".5rem"
          sx={{
            backgroundColor: "#1D1D1B",
            color: "#CAF55E",
            textAlign: "center",
            position: "relative",
            padding: { xs: "20px 16px", sm: "10px 24px", md: 0 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "calc(2250px + 42px)",
            margin: "0 auto",
            // minHeight: "100vh",
            minHeight: { sm: "90vh", xs: "70vh", md: isLargeScreen ? "90vh" : isXLScreen ? "90vh" : isLGScreen ? "100vh" : "100vh" },

            overflow: "hidden",
            isolation: "isolate",
            contain: "layout style paint",
            zIndex: 1,
            clipPath: "inset(0)",
            cursor: "pointer",
            transition: "opacity 0.3s ease",

          }}
        >
          <Box
            component="img"
            ref={bgRef}
            src={bgMover}
            alt=""
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "350vw",
              height: "auto",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              maxWidth: "none",
              zIndex: 0,
              willChange: "transform",
              clipPath: "inset(0)",
              contain: "layout style paint",
            }}
          />


          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
              paddingTop: {
                xs: "30px",
                sm: "40px",
                md: isLargeScreen ? "100px" : isXLScreen ? "90px" : isLGScreen ? "75px" : "60px",
              },
              paddingLeft: {
                xs: "16px",
                sm: "24px",
                md: isLargeScreen ? "130px" : isXLScreen ? "110px" : isLGScreen ? "80px" : "50px",
              },
              paddingRight: {
                xs: "16px",
                sm: "24px",
                md: isLargeScreen ? "130px" : isXLScreen ? "110px" : isLGScreen ? "80px" : "50px",
              },
              paddingBottom: {
                xs: "30px",
                sm: "40px",
                md: isLargeScreen ? "100px" : isXLScreen ? "90px" : isLGScreen ? "75px" : "60px",
              },
              boxSizing: "border-box",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Row 1 - Top Small Text */}
            {content && (
              <motion.div
                variants={fadeDown}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Box
                  sx={{
                    color: "#fff",
                    fontSize: {
                      xs: "10px",
                      sm: "12px",
                      md: isLargeScreen ? "26px" : isXLScreen ? "22px" : isLGScreen ? "19px" : "16px"
                    },
                    fontFamily: "Inter Tight, sans-serif",
                    willChange: "transform, opacity",
                    textAlign: "center",
                    whiteSpace: "pre",
                    overflow: "visible",
                  }}
                >
                  {content?.topText}
                </Box>
              </motion.div>
            )}

            {/* Row 2 - Left, Center, Right */}
            <Box
              sx={{
                display: "flex",

                flexDirection: { xs: "column", sm: "column", md: "row", },  // Keep row layout on all screens
                justifyContent: "space-around",
                alignItems: "center",
                margin: {
                  xs: "20px 0",
                  sm: "30px 0",
                  md: isLargeScreen ? "90px 0" : isXLScreen ? "75px 0" : isLGScreen ? "60px 0" : "50px 0"
                },
                gap: { xs: "25px", sm: "25px", md: 0 },
              }}
            >
              {/* LEFT TEXT */}
              <Box sx={{ flex: 0.5, textAlign: { xs: "center", md: "left" } }}>
                {content && (
                  <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: {
                          xs: "9px",
                          sm: "11px",
                          md: isLargeScreen ? "26px" : isXLScreen ? "22px" : isLGScreen ? "18px" : "15px"
                        },
                        fontFamily: "Inter Tight, sans-serif",
                        willChange: "transform, opacity",
                      }}
                    >
                      {content?.leftText}
                    </Typography>
                  </motion.div>
                )}
              </Box>

              {/* CENTER HEADING */}
              <Box sx={{ flex: 2 }}>
                <motion.div
                  variants={headingAnim}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "28px",
                        sm: "40px",
                        md: isLargeScreen ? "100px" : isXLScreen ? "90px" : isLGScreen ? "70px" : "50px",
                      },
                      fontWeight: 800,
                      lineHeight: { xs: "1.1", sm: "1.1", md: "1.4" },

                      letterSpacing: "-0.02em",
                      color: "#CAF55E",
                      textAlign: "center",
                      fontFamily: "Inter Tight, sans-serif",
                      whiteSpace: "pre-line", // 👈 KEY LINE
                      willChange: "transform, opacity",
                    }}
                  >
                    {content?.centerHeading}
                  </Typography>
                </motion.div>
              </Box>

              {/* RIGHT TEXT */}
              <Box sx={{ flex: 0.5, textAlign: { xs: "center", md: "right" } }}>
                {content && (
                  <motion.div
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: {
                          xs: "9px",
                          sm: "11px",
                          md: isLargeScreen ? "26px" : isXLScreen ? "22px" : isLGScreen ? "18px" : "15px"
                        },
                        fontFamily: "Inter Tight, sans-serif",
                        willChange: "transform, opacity",
                      }}
                    >
                      {content?.rightText}
                    </Typography>
                  </motion.div>
                )}
              </Box>
            </Box>

            {/* Row 3 - Bottom Small Text */}
            {content && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: {
                      xs: "11px",
                      sm: "13px",
                      md: isLargeScreen ? "28px" : isXLScreen ? "24px" : isLGScreen ? "21px" : "18px"
                    },
                    fontFamily: "Inter Tight, sans-serif",
                  }}
                >
                  {content?.bottomText}
                </Typography>
              </motion.div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MotionSection;
