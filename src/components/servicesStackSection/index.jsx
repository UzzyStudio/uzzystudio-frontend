import { Box, Typography, useMediaQuery } from "@mui/material";
import img2 from "../../assets/img2.png";
import { useRef, useLayoutEffect } from "react";
import { useEffect, useState } from "react";
import { client, urlFor } from "../../sanityClient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";



gsap.registerPlugin(ScrollTrigger);
const ServicesStackSection = () => {
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");
    const [data, setData] = useState(null);

    useEffect(() => {
        client
            .fetch(`*[_type == "servicesStackSection"][0]{ services }`)
            .then((res) => setData(res));
    }, []);



    const handleScrollToContact = () => {
        const contact = document.getElementById("contact");
        if (!contact || !window.lenis) return;

        const y =
            contact.getBoundingClientRect().top +
            window.pageYOffset -
            120;

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
            });

            // 🔹 Initial states
            cards.forEach((card, i) => {
                gsap.set(card, {
                    y: i === 0 ? 0 : "100%",
                    opacity: i === 0 ? 1 : 1,
                    filter: i === 0 ? "brightness(1)" : "brightness(1)",
                    backgroundColor: i === 0 ? "#ffffff" : "#E7E7E7",
                });
            });

            // 🔹 Slow, smooth pinned timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${cards.length * window.innerHeight * 1.5}`, // 🔥 slower
                    scrub: 1.5,              // 🔥 smoother scrub
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // 🔹 Card transitions
            cards.forEach((card, i) => {
                if (i === 0) return;

                // Incoming card
                tl.fromTo(
                    card,
                    { y: "100%" },
                    { y: "0%", ease: "none", duration: 1 }
                );

                // Previous card fades + dims
                tl.to(
                    cards[i - 1],
                    {
                        opacity: 0.25,
                        filter: "brightness(0.25)",
                        backgroundColor: "#F0F0F0",
                        ease: "none",
                        duration: 1,
                    },
                    "<"
                );
            });
        }, containerRef);

        return () => {
            ctx.revert(); // ✅ kills ScrollTrigger + timeline cleanly
        };
    }, [data]);
    ScrollTrigger.matchMedia({
        "(max-width: 768px)": () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        },
    });

    return (
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
            }}
        >
            {data?.services?.map((service, index) => (
                <Box
                    key={index}
                    ref={(el) => (cardRefs.current[index] = el)}
                    sx={{
                        width: "100%",
                        height: "100vh",
                        maxWidth: "100%", // Always full width
                        margin: "0 auto", // Center on smaller screens if needed, but full width
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: { xs: "column", md: "row" },   // ← IMPORTANT
                        alignItems: "center",
                        padding: { xs: "110px 20px", md: isLargeScreen ? "0px 100px" : "0px 50px" },
                        gap: { xs: 4, md: 6 },
                        color: "#1D1D1B",
                        boxSizing: "border-box", // Ensure padding is included in width calculation
                    }}
                >

                    {/* LEFT COLUMN */}
                    <Box
                        sx={{
                            width: { xs: "100%", sm: "100%", md: "auto" },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: { xs: "flex-start", md: "space-around" },
                            height: "100%",
                        }}
                    >
                        <Box sx={{

                        }}>
                            <Typography
                                sx={{
                                    fontSize: { xs: "23px", md: isLargeScreen ? "45px" : "30px" },
                                    fontFamily: "Inter Tight, sans-serif",
                                    letterSpacing: "-1.1px",
                                    fontWeight: 800,
                                    textTransform: "lowercase",
                                    mb: 1,
                                }}
                            >
                                {service.title}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: { xs: "11px", md: isLargeScreen ? "21px" : "14px" },
                                    fontFamily: "Inter Tight, sans-serif",
                                    mb: 3,
                                    maxWidth: { xs: "86%", md: isLargeScreen ? "675px" : "450px" },
                                    lineHeight: 1.4,
                                }}
                            >
                                {service.description}
                            </Typography>
                        </Box>

                        <Box sx={{ mt: { xs: 0, md: 4 } }}>
                            <Box
                                onClick={handleScrollToContact}

                                sx={{
                                    px: { xs: "12px", md: isLargeScreen ? "27px" : "18px" },
                                    py: { xs: "12px", md: isLargeScreen ? "27px" : "18px" },
                                    fontSize: { xs: "11px", md: isLargeScreen ? "21px" : "14px" },
                                    background: "#1D1D1B",
                                    borderRadius: "30px",
                                    display: "inline-block",
                                    color: "white",
                                    fontWeight: 700,
                                    fontFamily: "Inter Tight, sans-serif",
                                    cursor: "pointer",
                                }}
                            >
                                let's work together
                            </Box>
                        </Box>
                    </Box>

                    {/* MIDDLE BULLETS */}
                    <Box
                        sx={{
                            display: "flex",
                            width: { xs: "100%", sm: "100%", md: "auto" },
                            flexDirection: "column",
                            gap: 1,
                            alignItems: "flex-start",
                            justifyContent: { xs: "flex-start", md: "flex-end" },
                            height: "100%", marginBottom: { xs: "0", md: "190px" }
                        }}
                    >
                        {service.points?.map((p, i) => (
                            <Typography
                                key={i}
                                sx={{
                                    fontSize: { xs: "11px", md: isLargeScreen ? "21px" : "14px" },
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
                    < Box sx={{
                        paddingRight: isLargeScreen ? "120px" : "80px", width: { xs: "100%", md: "35%" },
                    }}>
                        <img
                            src={urlFor(service.image).width(800).url()}
                            alt={service.title}
                            style={{
                                width: "100%",
                                height: { xs: "400px", md: "auto" },
                                borderRadius: "8px",
                                objectFit: "cover",

                            }}
                        />
                    </Box>
                </Box >
            ))}
        </Box >
    );
};

export default ServicesStackSection;
