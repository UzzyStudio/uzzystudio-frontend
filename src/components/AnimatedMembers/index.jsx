import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
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
  const isLargeScreen = useMediaQuery(
    "(min-width: 1660px) and (max-width: 1999px)"
  );

  const isUltraWide = useMediaQuery("(min-width: 2000px)");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const isMobile = windowWidth <= 658;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isTightMobile = windowWidth >= 350 && windowWidth <= 460;


  // 🔹 Scroll
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "center center"],
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
  const spread = isMobile ? 20 : isTablet ? 30 : isLargeScreen ? 60 : isUltraWide ? 65 : 30;

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        maxWidth: isUltraWide
          ? "100%"
          : isLargeScreen ? "100%" : "100%",
        mx: "auto",
        height: isMobile ? "600px" : "100vh",
        background: "#F8F8F8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: isUltraWide
          ? "0 0px"
          : isLargeScreen ? "0 0px" : "0 0px !important",
      }}
    >
      <Typography
        sx={{
          fontSize: isMobile
            ? "30px"
            : isTablet
              ? "48px"
              : isLargeScreen
                ? "112px"
                : isUltraWide
                  ? "120px"
                  : "75px",
          fontWeight: 700,
          textAlign: isMobile ? "center" : "center",
          lineHeight: isMobile
            ? "40px"
            : isTablet
              ? "52px"
              : isLargeScreen
                ? "120px"
                : isUltraWide
                  ? "120px"
                  : "80px",
          fontFamily: "'Inter Tight', sans-serif",
          color: "#121314",
          letterSpacing: "-2px",
        }}
      >
        {data?.lineOne} <br />
        {data?.lineTwo} <br />
        <Box
          sx={{
            display: "flex",
            flexDirection: isTightMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: isTightMobile ? "16px" : "0",
          }}
        >

          {/* LEFT WORD */}
          <motion.span
            style={{
              display: "inline-block",
              marginRight: isMobile
                ? "10px"
                : isTablet
                  ? "18px"
                  : isLargeScreen
                    ? "70px"
                    : "0px",
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
                    width: isMobile
                      ? 40
                      : isTablet
                        ? 45
                        : isLargeScreen
                          ? 102
                          : isUltraWide
                            ? 110
                            : 68,
                    height: isMobile
                      ? 40
                      : isTablet
                        ? 45
                        : isLargeScreen
                          ? 102
                          : isUltraWide
                            ? 110
                            : 68,
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
              marginLeft: isMobile
                ? "10px"
                : isTablet
                  ? "18px"
                  : isLargeScreen
                    ? "70px"
                    : "0px",
              letterSpacing: "-2px",
              x: wordRightX,
            }}
          >
            {data?.wordAfterImages}
          </motion.span>
        </Box>
      </Typography>
    </Box>
  );
}