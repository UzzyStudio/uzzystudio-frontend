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
    <Box
      ref={sectionRef}
      sx={{
        backgroundColor: "#1D1D1B",
        color: "#CAF55E",
        py: 14,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",

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
          width: "410vw",     // 👈 oversized
          height: "auto",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          maxWidth: "none",
          zIndex: 0,
          willChange: "transform",
        }}
      />


      <Box
        sx={{
          width: "100%",
          maxWidth: isLargeScreen ? "100%" : "1600px",
          mx: "auto",
          px: isLargeScreen ? 12 : 0,
        }}
      >
        {/* Row 1 - Top Small Text */}
        <Box
          ref={topRef}
          sx={{
            color: "#fff",
            fontSize: isLargeScreen ? "19px" : "13px",
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
                fontSize: {
                  xs: "36px",
                  sm: "48px",
                  md: isLargeScreen ? "126px" : "84px",
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
