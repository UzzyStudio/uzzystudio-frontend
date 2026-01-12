import React, { useEffect, useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client } from "../../sanityClient";
import { useState } from "react";
import bgMover from "../../assets/web-mover.svg";


gsap.registerPlugin(ScrollTrigger);

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
  const topRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const headingRef = useRef(null);
  const bottomRef = useRef(null);
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
        minHeight: "70vh",
        overflow: "hidden",
        isolation: "isolate",
        contain: "layout style paint",
        zIndex: 1,
        clipPath: "inset(0)",
        cursor: "pointer",
        transition: "opacity 0.3s ease",
        "&:hover": {
          opacity: 0.95,
        },
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
          width: "450vw",    
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
        <Box
          ref={topRef}
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

        {/* Row 2 - Left, Center, Right */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Keep row layout on all screens
            justifyContent: "space-around",
            alignItems: "center",
            margin: { 
              xs: "20px 0",
              sm: "30px 0",
              md: isLargeScreen ? "90px 0" : isXLScreen ? "75px 0" : isLGScreen ? "60px 0" : "50px 0" 
            },
            gap: 0,
          }}
        >
          {/* LEFT TEXT */}
          <Box sx={{ flex: 0.5, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              ref={leftRef}
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
          </Box>

          {/* CENTER HEADING */}
          <Box sx={{ flex: 2 }}>
            <Typography
              ref={headingRef}
              sx={{
                fontSize: {
                  xs: "28px",
                  sm: "36px",
                  md: isLargeScreen ? "150px" : isXLScreen ? "130px" : isLGScreen ? "110px" : "84px",
                },
                fontWeight: 800,
                lineHeight: 1.05,
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

          </Box>

          {/* RIGHT TEXT */}
          <Box sx={{ flex: 0.5, textAlign: { xs: "center", md: "right" } }}>
            <Typography
              ref={rightRef}
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
          </Box>
        </Box>

        {/* Row 3 - Bottom Small Text */}
        <Typography
          ref={bottomRef}
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
      </Box>
    </Box>
    </Box>
    </Box>
  );
};

export default MotionSection;
