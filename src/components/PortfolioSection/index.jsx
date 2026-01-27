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
    const isLargeScreen = useMediaQuery("(min-width: 2600px)");
    const isXLScreen = useMediaQuery("(min-width: 1920px)");
    const isLGScreen = useMediaQuery("(min-width: 1440px)");
    const isMobileSmall = useMediaQuery("(max-width: 779px)");  // Small mobile devices


    const maxWidthBox = isLargeScreen
        ? "100vw"      // Ultra large screens
        : isXLScreen
            ? "100vw"    // XL screens
            : isLGScreen
                ? "100%"    // LG screens
                : "100%";     // Smaller screens, full width
    const [items, setItems] = useState([]);

    const getCardHeight = (type) => {
        // type: "full", "half", "cta"
        if (isLargeScreen) return type === "full" ? 900 : type === "half" ? 800 : 600;
        if (isXLScreen) return type === "full" ? 750 : type === "half" ? 650 : 500;
        if (isLGScreen) return type === "full" ? 750 : type === "half" ? 650 : 600;
        // fallback for smaller screens
        if (isMobileSmall) return type === "full" ? 300 : type === "half" ? 300 : 300;

        return type === "full" ? 500 : type === "half" ? 500 : 280;
    };

    const query = `
*[_type == "portfolioSection"][0]{
  items[]{
    title,
    subtitle,
    tags,
    link, // ✅ ADD THIS
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


    const ClickableBox = ({ link, children }) => {
        if (!link) return children;

        return React.cloneElement(children, {
            component: "a",
            href: link,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-clickable": true, // 🔥 important for cursor
            sx: {
                ...children.props.sx,
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
            },
        });
    };




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
    const FullBox = ({ img, tags, title, subtitle, link }) => (
        <ClickableBox link={link}>
            <Box
                className="portfolio-card"
                sx={{
                    position: "relative",
                    width: "100%",
                    // maxWidth: isLargeScreen ? "100%" : "100vw",
                    maxWidth: maxWidthBox,
                    margin: "auto",
                    // height: { xs: "300px", md: isLargeScreen ? "750px" : "500px" },
                    height: getCardHeight("full"),  // <-- dynamic height

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
        </ClickableBox>
    );

    // ************************************
    // 🔥 HALF WIDTH BOX (Correct layout)
    // ************************************
    const HalfBox = ({ img, tags, title, subtitle, link }) => (
        <ClickableBox link={link}>
            <Box
                className="portfolio-card"
                // onLoad={() => ScrollTrigger.refresh()}   // 🔥 REQUIRED
                sx={{
                    flex: { xs: "unset", md: 1.1 },
                    px: { xs: 0, md: isLargeScreen ? 12 : 6 },
                    width: "100%",
                    position: "relative",
                    // maxWidth: isLargeScreen ? "100%" : "1600px",
                    maxWidth: maxWidthBox,
                    margin: "auto",
                    // height: { xs: "380px", md: isLargeScreen ? "750px" : "500px" },
                    height: getCardHeight("full"),  // <-- dynamic height

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
        </ClickableBox>
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
                height: { xs: "280px", md: "auto" }, // MORE HEIGHT FOR MOBILE TEXT
                // height: "auto",
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
            <Box sx={{ position: "absolute", top: { xs: "73px", md: "230px" }, right: { xs: "255px", md: "531px" } }}>
                <img src={ThreeLines} alt="" width={70} height={72} />
            </Box>

            <Box sx={{ position: "absolute", top: { xs: "190px", md: "550px" }, left: { xs: "193px", md: "682px" } }}>
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
                data-clickable
                onClick={handleScrollToContact}
                disableElevation
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    px: { xs: 2, sm: 3, md: isLargeScreen ? 4.5 : 4 },
                    py: { xs: 2, sm: 2.5, md: isLargeScreen ? 4.5 : 3 },
                    fontSize: { xs: "11px", sm: "14px", md: isLargeScreen ? "19px" : "15px" },
                    borderRadius: "40px",
                    backgroundColor: "#CAF55E",
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
                        backgroundColor: "#000",
                        transition: "height 0.99s cubic-bezier(0.22, 1, 0.36, 1)",
                        zIndex: 0,
                    },

                    "&:hover::before": {
                        height: "100%",
                    },

                    /* Change TEXT color safely */
                    "&:hover .button-text-wrapper": {
                        color: "#fff",
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
                        color: "#1D1D1B",
                        transition: "color 0.3s ease",
                    }}
                >
                    Let's Work Together
                </Box>
            </Button>


        </Box>
    );

    // ************************************
    // 🔥 RETURN
    // ************************************
    return (
        <Box id="cases" ref={sectionRef} sx={{ width: "100%", mt: { xs: 8, md: 16 } }}>
            <Box sx={{ maxWidth: isLargeScreen ? "100%" : "100%", mx: "auto", px: isLargeScreen ? 12 : 2, display: "flex", flexDirection: "column", gap: "10px" }}>

                {items.length === 5 && (
                    <>
                        {/* 1️⃣ FULL */}
                        <FullBox
                            img={items[0].image}
                            tags={items[0].tags}
                            title={items[0].title}
                            subtitle={items[0].subtitle}
                            link={items[0].link} // ✅ ADD
                        />

                        {/* 2️⃣ HALF + HALF */}
                        <Box sx={{ display: "flex", gap: "10px", flexDirection: { xs: "column", md: "row" } }}>
                            <HalfBox key="half-1"
                                img={items[1].image}
                                tags={items[1].tags}
                                title={items[1].title}
                                subtitle={items[1].subtitle}
                                link={items[1].link} // ✅ ADD
                            />

                            <HalfBox key="half-2"
                                img={items[2].image}
                                tags={items[2].tags}
                                title={items[2].title}
                                subtitle={items[2].subtitle}
                                link={items[2].link} // ✅ ADD
                            />
                        </Box>

                        {/* 3️⃣ FULL */}
                        <FullBox
                            img={items[3].image}
                            tags={items[3].tags}
                            title={items[3].title}
                            subtitle={items[3].subtitle}
                            link={items[3].link} // ✅ ADD
                        />

                        {/* 4️⃣ HALF + CTA */}
                        <Box sx={{ display: "flex", gap: "10px", flexDirection: { xs: "column", md: "row" } }}>
                            <HalfBox img={items[4].image}
                                tags={items[4].tags}
                                title={items[4].title}
                                subtitle={items[4].subtitle}
                                link={items[4].link}
                            />
                            <CTABox />
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default PortfolioSection;
