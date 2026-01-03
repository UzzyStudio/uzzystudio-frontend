import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import { client, urlFor } from "../../sanityClient";
import EyeHeart from "../../assets/eyeheart.svg";
import ThreeLines from "../../assets/threelines.svg";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PortfolioSection = () => {
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");
    const [items, setItems] = useState([]);


    const query = `
*[_type == "portfolioSection"][0]{
  items[]{
    title,
    subtitle,
    tags,
    "image": image.asset->url
  }
}
`;

    useEffect(() => {
        client.fetch(query).then((data) => {
            if (data?.items?.length === 5) {
                setItems(data.items);
            }
        });
    }, []);




    const handleScrollToContact = () => {
        const contact = document.getElementById("contact");
        if (!contact) return;

        gsap.to(window, {
            scrollTo: {
                y: contact,
                autoKill: false,
            },
            duration: 1.2,
            ease: "power2.out",
        });
    };

    const sectionRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".zoom-img").forEach((img) => {
                gsap.fromTo(
                    img,
                    { scale: 1.05 },
                    {
                        scale: 1.2,
                        ease: "none",
                        scrollTrigger: {
                            trigger: img,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    }
                );
            });
            ScrollTrigger.refresh(); // 🔥 FORCE RECALC

        }, sectionRef);

        return () => ctx.revert();
    }, [items]); // 🔥 dependency is important



    // ************************************
    // 🔥 FULL WIDTH BOX
    // ************************************
    const FullBox = ({ img, tags, title, subtitle }) => (
        <Box
            className="portfolio-card"
            sx={{
                position: "relative",
                width: "100%",
                maxWidth: isLargeScreen ? "100%" : "1600px",
                margin: "auto",
                height: { xs: "300px", md: isLargeScreen ? "750px" : "500px" },
                overflow: "hidden",        // IMPORTANT
                borderRadius: 2,
            }}
        >
            <img
                src={img}
                onLoad={() => ScrollTrigger.refresh()}   // 🔥 REQUIRED
                className="zoom-img"
                style={{
                    willChange: "transform",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transformOrigin: "center center", // smooth scaling
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    gap: "8px",
                    position: "absolute",
                    top: 16,
                    left: 16,
                    ml: "30px",

                    // flexWrap: "wrap",   // 💥 allows 3–4 tags without breaking layout
                }}
            >
                {tags?.map((t, i) => (

                    <Typography
                        key={i}
                        sx={{
                            px: 1.2,
                            py: 0.8,
                            border: "1px solid white",
                            borderRadius: "20px",
                            color: "#fff",
                            fontSize: { xs: "8px", md: isLargeScreen ? "15px" : "10px" },
                            fontFamily: "Inter Tight, sans-serif",
                            textTransform: "uppercase",
                        }}
                    >
                        {t}
                    </Typography>
                ))}
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    px: 4,
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "30px", md: isLargeScreen ? "82px" : "55px" },
                        fontFamily: "Inter Tight, sans-serif",
                        letterSpacing: { xs: "-1.1px", md: isLargeScreen ? "-5.8px" : "-3.9px" },
                        lineHeight: { xs: "27px", md: isLargeScreen ? "78px" : "52px" },
                        fontWeight: 400,
                        color: "#fff",
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        fontSize: { xs: "10px", md: isLargeScreen ? "18px" : "12px" },
                        fontWeight: 300,
                        color: "#fff",
                        textAlign: "right",
                        fontFamily: "Inter Tight, sans-serif",
                        marginRight: isLargeScreen ? "112px" : "75px",
                        opacity: 1,
                        width: "27%",
                        letterSpacing: "0.01px"
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

        </Box>
    );

    // ************************************
    // 🔥 HALF WIDTH BOX (Correct layout)
    // ************************************
    const HalfBox = ({ img, tags, title, subtitle }) => (
        <Box
            className="portfolio-card"
            onLoad={() => ScrollTrigger.refresh()}   // 🔥 REQUIRED
            sx={{
                flex: { xs: "unset", md: 1.1 },
                px: { xs: 0, md: isLargeScreen ? 12 : 6 },
                width: "100%",
                position: "relative",
                maxWidth: isLargeScreen ? "100%" : "1600px",
                margin: "auto",
                height: { xs: "380px", md: isLargeScreen ? "750px" : "500px" },
                overflow: "hidden",
                borderRadius: 2,
            }}
        >
            <img
                src={img}
                className="zoom-img"
                style={{
                    willChange: "transform",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transformOrigin: "center center",
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    gap: "8px",
                    position: "absolute",
                    top: 16,
                    left: 16,
                    ml: "30px",
                    flexWrap: "wrap",
                }}
            >
                {tags?.map((t, i) => (
                    <Typography
                        key={i}
                        sx={{
                            px: 1.2,
                            py: 0.8,
                            border: "1px solid white",
                            borderRadius: "20px",
                            color: "#fff",
                            fontSize: { xs: "8px", md: isLargeScreen ? "15px" : "10px" },
                            fontFamily: "Inter Tight, sans-serif",
                            textTransform: "uppercase",
                        }}
                    >
                        {t}
                    </Typography>
                ))}
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    px: 4,
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "30px", md: isLargeScreen ? "82px" : "55px" },
                        fontFamily: "Inter Tight, sans-serif",
                        letterSpacing: { xs: "-1.1px", md: isLargeScreen ? "-5.8px" : "-3.9px" },
                        lineHeight: { xs: "27px", md: isLargeScreen ? "78px" : "52px" },
                        fontWeight: 400,
                        color: "#fff",
                        width: "50%"
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        fontSize: { xs: "10px", md: isLargeScreen ? "18px" : "12px" },
                        fontWeight: 400,
                        color: "#fff",
                        textAlign: "right",
                        marginRight: isLargeScreen ? "112px" : "75px",
                        opacity: 1,
                        width: "37%",
                        fontFamily: "Inter Tight",
                        letterSpacing: "0.01px"
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );

    // ************************************
    // 🔥 CTA BOX
    // ************************************
    const CTABox = () => (
        <Box
            sx={{
                flex: { xs: "unset", md: 1 },   // FIX FOR MOBILE
                width: { xs: "auto", md: "auto" },  // FULL WIDTH ON MOBILE
                position: "relative",
                height: { xs: "280px", md: "500px" }, // MORE HEIGHT FOR MOBILE TEXT
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                px: 4,
            }}
        >
            {/* Doodles */}
            <Box sx={{ position: "absolute", top: { xs: "73px", md: "100px" }, right: { xs: "255px", md: "411px" } }}>
                <img src={ThreeLines} alt="" width={70} height={70} />
            </Box>

            <Box sx={{ position: "absolute", top: { xs: "190px", md: "350px" }, left: { xs: "193px", md: "482px" } }}>
                <img src={EyeHeart} alt="" width={150} height={150} />
            </Box>

            <Typography
                sx={{
                    fontFamily: "Inter Tight",
                    fontSize: { xs: "11px", sm: "14px", md: isLargeScreen ? "22px" : "15px" },
                    fontWeight: 900,
                    textTransform: "uppercase",
                    color: "#1D1D1B",
                    mb: 4,
                    width: isLargeScreen ? "270px" : "180px",
                }}
            >
                You see what we do. Imagine what we can do for you
            </Typography>

            <Button
                onClick={handleScrollToContact}
                variant="contained"
                sx={{
                    backgroundColor: "#1D1D1B",
                    color: "white",
                    px: { xs: 2, sm: 3, md: isLargeScreen ? 4.5 : 3 },
                    py: { xs: 2, sm: 2.5, md: isLargeScreen ? 4.5 : 3 },
                    fontSize: { xs: "11px", sm: "14px", md: isLargeScreen ? "19px" : "13px" },
                    borderRadius: "40px",
                    "&:hover": { backgroundColor: "#000" },
                }}
            >
                Let's Work Together
            </Button>
        </Box>
    );

    // ************************************
    // 🔥 RETURN
    // ************************************
    return (
        <Box id="cases" ref={sectionRef} sx={{ width: "100%" }}>
            <Box sx={{ maxWidth: isLargeScreen ? "100%" : "1600px", mx: "auto", px: isLargeScreen ? 12 : 2, display: "flex", flexDirection: "column", gap: "10px" }}>

                {items.length === 5 && (
                    <>
                        {/* 1️⃣ FULL */}
                        <FullBox
                            img={items[0].image}
                            tags={items[0].tags}
                            title={items[0].title}
                            subtitle={items[0].subtitle}
                        />

                        {/* 2️⃣ HALF + HALF */}
                        <Box sx={{ display: "flex", gap: "10px", flexDirection: { xs: "column", md: "row" } }}>
                            <HalfBox key="half-1"
                                img={items[1].image}
                                tags={items[1].tags}
                                title={items[1].title}
                                subtitle={items[1].subtitle} />
                            <HalfBox key="half-2"
                                img={items[2].image}
                                tags={items[2].tags}
                                title={items[2].title}
                                subtitle={items[2].subtitle} />
                        </Box>

                        {/* 3️⃣ FULL */}
                        <FullBox
                            img={items[3].image}
                            tags={items[3].tags}
                            title={items[3].title}
                            subtitle={items[3].subtitle}
                        />

                        {/* 4️⃣ HALF + CTA */}
                        <Box sx={{ display: "flex", gap: "10px", flexDirection: { xs: "column", md: "row" } }}>
                            <HalfBox img={items[4].image}
                                tags={items[4].tags}
                                title={items[4].title}
                                subtitle={items[4].subtitle} />
                            <CTABox />
                        </Box>
                    </>
                )}

            </Box>
        </Box>
    );
};

export default PortfolioSection;
