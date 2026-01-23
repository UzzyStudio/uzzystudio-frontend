import React, { useRef, useLayoutEffect } from "react";
import { useEffect, useState } from "react";
import { client, urlFor } from "../../sanityClient";
import { Box, Typography, useMediaQuery } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import smilePhoto from "../../assets/smilephoto.svg";
// import electric from "../../assets/electric.svg";
// import heroVideo from "../../assets/video.mp4";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {

    const isLargeScreen = useMediaQuery("(min-width: 2600px)");
    const isXLScreen = useMediaQuery("(min-width: 1920px)");
    const isLGScreen = useMediaQuery("(min-width: 1440px)");
    const isMDScreen = useMediaQuery("(min-width: 1000px) and (max-width: 1439px)"); // 1000–1439
    const isSmallScreen = useMediaQuery("(min-width: 690px) and (max-width: 999px)");
    const isMobile = useMediaQuery("(max-width: 689px)");                          // 0–789


    const [data, setData] = useState(null);


    const query = `
*[_type == "videoSection"][0]{
  "videoUrl": video.asset->url,
  "topLeftImage": topLeftImage.asset->url,
  "bottomRightImage": bottomRightImage.asset->url,
  marqueeText
}
`;
    useEffect(() => {
        client.fetch(query).then((res) => {
            if (res) setData(res);
        });
    }, []);

    const sectionRef = useRef(null);
    const videoWrapperRef = useRef(null);

    useLayoutEffect(() => {
        if (!data?.videoUrl) return;

        const ctx = gsap.context(() => {
            const videoEl = videoWrapperRef.current;

            // initial state
            gsap.set(videoEl, {
                scale: 0.4,
                y: 0,
                transformOrigin: "center center",
            });

            // compute max Y movement based on section height
            const sectionHeight = sectionRef.current.offsetHeight;
            const maxScrollY = sectionHeight * 2; // trigger over twice the section size
            const maxScale = 1.7; // max scale
            // const maxTranslateY = sectionHeight * 0.6; // adjust how far video moves down
            const maxTranslateY = isLargeScreen
                ? sectionHeight * 0.6
                : isXLScreen
                    ? sectionHeight * 0.7
                    : isLGScreen
                        ? sectionHeight * 0.6
                        : isMDScreen
                            ? sectionHeight * 0.5
                            : isSmallScreen
                                ? sectionHeight * 0.4
                                : sectionHeight * 0.4; // mobile <790


            gsap.to(videoEl, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top+=25% center",
                    end: "bottom-=25% center",
                    scrub: 0.05,
                    markers: true,

                    invalidateOnRefresh: true,
                },
                scale: maxScale,
                y: maxTranslateY,
                ease: "none",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [data]);



    if (!data) return null;

    return (
        <Box
            ref={sectionRef}
            sx={{
                position: "relative",
                width: "100%",
                height: isLargeScreen
                    ? "70vw"     // 🔥 very large screens (2560+)
                    : isXLScreen
                        ? "1900px"     // 1920–2559
                        : isLGScreen
                            ? "1400px"   // 1440–1919
                            : isMDScreen
                                ? "900px"
                                : isSmallScreen
                                    ? "500px"
                                    : "300px", // mobile
                // minHeight: "100vh",
                overflow: "hidden",
                py: 20,
            }}
        >
            {/* TOP-LEFT LARGE IMAGE */}
            <Box
                sx={{
                    position: "absolute",
                    top: "60px",
                    left: isLargeScreen ? "240px" : "160px",
                    width: { xs: "130px", md: isLargeScreen ? "330px" : "220px" },
                    opacity: 0.9,
                }}
            >
                {data?.topLeftImage && (
                    <img src={data.topLeftImage} width="100%" alt="decoration" />
                )}
            </Box>

            {/* BOTTOM-RIGHT LARGE IMAGE */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: "32px",
                    right: isLargeScreen ? "150px" : "100px",
                    width: { xs: "100px", md: isLargeScreen ? "375px" : "250px" },
                    opacity: 0.9,
                }}
            >
                {data?.bottomRightImage && (
                    <img src={data.bottomRightImage} width="100%" alt="decoration" />
                )}
            </Box>

            {/* CENTER VIDEO - will scale */}
            <Box
                ref={videoWrapperRef}

                sx={{
                    position: "absolute",
                    top: isLargeScreen
                        ? "0%"      // ultra-wide screens 2560+
                        : isXLScreen
                            ? "15%"       // 1920–2559
                            : isLGScreen
                                ? "15%" // 1440–1919
                                : isMDScreen
                                    ? "20%"
                                    : isSmallScreen
                                        ? "30%"
                                        : "30%", // mobile
                    left: "50%",
                    width: isLargeScreen
                        ? "100vw"     // full width on ultra-wide
                        : isXLScreen
                            ? "70vw"      // nearly full width
                            : isLGScreen
                                ? "65vw"
                                : isMDScreen
                                    ? "60vw"
                                    : isSmallScreen
                                        ? "70vw"
                                        : "60vw", // mobile
                    height: isLargeScreen
                        ? "100vw"     // keep it square-ish for scaling
                        : isXLScreen
                            ? "50vw"
                            : isLGScreen
                                ? "40vw"
                                : isMDScreen
                                    ? "35vw"
                                    : isSmallScreen
                                        ? "50vw"
                                        : "30vw", // mobile
                    transform: "translate(-50%, -50%)",
                    zIndex: 3,
                    overflow: "hidden",
                    // boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
                }}
            >

                {data?.videoUrl && (
                    <video
                        onLoadedData={() => {
                            setTimeout(() => {
                                ScrollTrigger.refresh();
                            }, 100);
                        }}

                        src={data.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                    />
                )}
            </Box>
            {/* MARQUEE TEXT SLIDER */}
            <Box
                sx={{
                    mt: 8,
                    whiteSpace: "nowrap",
                    height: "300px",
                    overflow: "hidden",
                    position: "relative",
                    transform: "skewY(-5deg)",   // ONLY layout transform
                }}
            >
                <Box
                    className="marquee-inner"
                    sx={{
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        animation: "marqueeDiagonal 12s linear infinite",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "18px",   // mobile
                                sm: "22px",   // small tablets
                                md: "30px",   // large tablets
                                lg: isLargeScreen ? "60px" : "40px",   // desktop
                            },
                            fontWeight: 500,
                            color: "#000",
                            fontFamily: "Inter Tight, sans-serif",
                        }}
                    >
                        Culture / Innovation / Design / Branding / Innovation / Design / Branding / Strategy /
                        Culture / Innovation / Design / Branding / Culture / Innovation / Design / Branding /
                        Culture / Innovation / Design / Branding / Culture / Innovation / Design / Branding /
                    </Typography>
                </Box>
            </Box>
            <style>
                {`
@keyframes marqueeDiagonal {
  0% {
    transform: translateX(0) translateY(0);
  }
  100% {
    transform: translateX(-50%) translateY(20px);
  }
}
`}
            </style>


        </Box>
    );
};

export default VideoSection;
