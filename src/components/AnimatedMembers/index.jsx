import { Box, Typography } from "@mui/material";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";
import { useEffect, useState } from "react";
import { client, urlFor } from "../../sanityClient";
// import member1 from "../../assets/member1.svg";
// import member2 from "../../assets/member2.svg";
// import member3 from "../../assets/member3.svg";
// import member4 from "../../assets/member4.svg";
// import member5 from "../../assets/member5.svg";
// import totalMember from "../../assets/totalmember.svg";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedMembers() {
    const [data, setData] = useState(null);

    // 🟢 Fetch the data from Sanity CMS
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
        client.fetch(query).then((res) => {
            if (res) setData(res);
        });
    }, []);

    // 🟢 Track window width to handle responsive behavior
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Responsive flags
    const isMobile = windowWidth <= 658;
    const isTablet = windowWidth > 768 && windowWidth <= 1024;

    // 🟢 Refs for container, images, and text words
    const containerRef = useRef(null);
    const imagesRef = useRef([]);
    const leftWordRef = useRef(null);
    const rightWordRef = useRef(null);

    // Pin duration depends on screen size
    const pinDuration = isMobile ? "+=400" : "+=800";

    // 🟢 GSAP animation: split images and slide text words horizontally
    useLayoutEffect(() => {
        if (!data) return;
        if (!imagesRef.current.length) return; // 👈 KEY FIX

        const ctx = gsap.context(() => {
            const total = imagesRef.current.length;
            const center = (total - 1) / 2;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: pinDuration, // "+=800" or mobile adjusted
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Initial setup: images centered vertically and horizontally
            gsap.set(imagesRef.current, {
                xPercent: -50,
                yPercent: -50,
                left: "50%",
                top: "50%",
                position: "absolute",
                opacity: 1,
                scale: 1,
            });

            // Initial position for words (offscreen)
            gsap.set(leftWordRef.current, {
                x: isMobile ? 110 : isTablet ? 80 : 110,
            });
            gsap.set(rightWordRef.current, {
                x: isMobile ? -110 : isTablet ? -80 : -110,
            });

            // Animate words moving slightly toward center
            tl.to(leftWordRef.current, { x: 7, ease: "power2.out" });
            tl.to(rightWordRef.current, { x: -3, ease: "power2.out" }, "<");

            // Animate images spreading horizontally
            tl.to(
                imagesRef.current,
                {
                    x: (i) => (i - center) * (isMobile ? 20 : isTablet ? 30 : 40),
                    duration: 2,
                    ease: "power3.out",
                },
                "<0.2"
            );
        }, containerRef);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, [data, isMobile, isTablet]);


    // 🟢 Ensure ScrollTrigger refreshes after all images have loaded
    useEffect(() => {
        if (!data?.memberImages?.length) return;
        let loaded = 0;
        imagesRef.current.forEach((img) => {
            if (img.complete) loaded++;
            else img.onload = () => {
                loaded++;
                if (loaded === imagesRef.current.length) ScrollTrigger.refresh();
            };
        });
        if (loaded === imagesRef.current.length) ScrollTrigger.refresh();
    }, [data]);

    return (
        <Box

            ref={containerRef}
            sx={{
                width: "100%",
                maxWidth: "100vw",
                mx: "auto",
                height: isMobile ? "600px" : isTablet ? "100vh" : "100vh",
                background: "#F8F8F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Inter, sans-serif",
                position: "relative",
                overflow: "hidden",
                padding: "0 20px",
                margin: 0,
                boxSizing: "border-box",
            }}
        >
            <Typography
                sx={{
                    fontSize: isMobile ? "30px" : isTablet ? "48px" : "75px",
                    fontWeight: 700,
                    textAlign: "center",
                    letterSpacing: { xs: "-1px", md: "-2px" },
                    lineHeight: isMobile ? "40px" : isTablet ? "52px" : "80px",
                    fontFamily: "'Inter Tight', sans-serif",
                    marginRight: isMobile ? "30px" : isTablet ? "0px" : "0px",
                    color: "#121314",
                    position: "relative",
                    zIndex: 2,
                    overflow: "hidden",
                }}
            >
                {/* Each of our designers <br />
                was the best among <br /> */}
                {data?.lineOne} <br />
                {data?.lineTwo} <br />

                <span
                    ref={leftWordRef}
                    style={{ display: "inline-block", marginRight: "6px", overflow: "hidden" }}
                >
                    {data?.wordBeforeImages}
                </span>


                <span
                    style={{
                        position: "relative",
                        width: "280px",
                        height: "60px",
                        display: "inline-block",
                        overflow: "hidden",
                    }}
                >
                    {data?.memberImages?.map((img, i) => (
                        <img
                            key={i}
                            ref={(el) => (imagesRef.current[i] = el)}
                            src={urlFor(img).width(120).url()}
                            style={{
                                width: isMobile ? "40px" : isTablet ? "45px" : "68px",
                                height: isMobile ? "40px" : isTablet ? "45px" : "68px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                position: "absolute",
                            }}
                        />
                    ))}
                </span>


                <span
                    ref={rightWordRef}
                    style={{ display: "inline-block", marginLeft: "6px", overflow: "hidden" }}
                >
                    {data?.wordAfterImages}
                </span>

            </Typography>
        </Box>
    );
}

