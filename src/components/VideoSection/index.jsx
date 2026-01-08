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
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");
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

        let tl;

        const ctx = gsap.context(() => {
            gsap.set(videoWrapperRef.current, {
                scale: 0.6,
                transformOrigin: "center center",
            });

            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=180%",
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true, // ✅ recalc on resize / layout change
                },
            });

            tl.to(videoWrapperRef.current, {
                scale: 1.2,
                ease: "none",
            });
        }, sectionRef);

        return () => {
            // tl?.scrollTrigger?.kill();
            ctx.revert();
        };
    }, [data]);


    if (!data) return null;

    return (
        <Box
            ref={sectionRef}
            sx={{
                position: "relative",
                width: "100%",
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
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "80%", md: isLargeScreen ? "1125px" : "750px" },
                    zIndex: 3,
                    borderRadius: "0px",
                    overflow: "hidden",
                    boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
                }}
            >

                {data?.videoUrl && (
                    <video
                        onLoadedData={() => {
                            ScrollTrigger.update();
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
