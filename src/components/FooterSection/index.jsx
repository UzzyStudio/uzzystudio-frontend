import { Box, Grid, Typography, Button, useMediaQuery } from "@mui/material";
import BigLogo from "../../assets/bigLogoFooter.svg";
import RandomImg from "../../assets/randomimg.svg";
import { client, urlFor } from "../../sanityClient";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const menuAnim = {
    hidden: { y: -60, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
};

const logoAnim = {
    hidden: { x: -120, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
};

const buttonAnim = {
    hidden: { y: 60, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

const randomAnim = {
    hidden: { y: 80, opacity: 0, rotate: 8 },
    visible: {
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: { duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function FooterSection() {
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        client
            .fetch(`*[_type == "footerSection"][0]`)
            .then((res) => setFooterData(res));
    }, []);


    const handleScrollToSection = (id) => {
        const section = document.getElementById(id);
        if (!section || !window.lenis) return;

        const headerOffset = 120; // same offset as header
        const y = section.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.lenis.scrollTo(y);
    };


    const handleScrollToContact = () => {
        const contact = document.getElementById("contact");
        if (!contact || !window.lenis) return;

        const headerOffset = 120;
        const y = contact.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.lenis.scrollTo(y);
    };


    return (
        <Box
            component="section"
            sx={{
                width: "100%",
                color: "#fff",
                fontFamily: "Inter Tight, sans-serif",
            }}
        >
            {/* INNER CONTAINER */}
            <Box sx={{
                maxWidth: isLargeScreen ? "100%" : "1600px", width: "93%", paddingTop: { xs: "20px", md: "35px" },
                px: isLargeScreen ? { xs: 1, sm: 2, md: 12 } : { xs: 1, sm: 2, md: 4 },
                mx: "auto", backgroundColor: "#1D1D1B", borderTopLeftRadius: "20px", borderTopRightRadius: "20px"
            }}>

                {/* ========== ROW 1 — MENU ========== */}
                {footerData && (
                    <Grid
                        component={motion.div}
                        variants={menuAnim}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        container
                        sx={{
                            mb: { xs: 15, md: 8 },
                            justifyContent: { xs: "center", md: "space-between" },
                            alignItems: "center",
                            textAlign: { xs: "center", md: "left" },
                            flexDirection: { xs: "column", md: "row" },
                            gap: { xs: 2, md: 0 },
                            willChange: 'transform, opacity'
                        }}>

                        {/* LEFT MENU — 3 ITEMS */}
                        <Grid item >
                            <Grid container spacing={4} sx={{ marginLeft: { xs: 0, md: "80px" }, justifyContent: { xs: "center", md: "flex-start" } }}>
                                {footerData?.menuItems?.map((item, i) => (
                                    <Grid item key={i} >
                                        <Typography
                                            onClick={() => handleScrollToSection(item.scrollId)} sx={{
                                                fontSize: { xs: "12px", sm: "13px", md: isLargeScreen ? "22px" : "15px" },
                                                fontWeight: 500,
                                                cursor: "pointer",
                                                fontFamily: "Inter Tight, sans-serif",
                                                "&:hover": { opacity: 0.6 },
                                                textTransform: "Lowercase",
                                                marginLeft: isLargeScreen ? "30px" : "20px",
                                                willChange: 'transform',
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        {/* RIGHT MENU — 2 ITEMS */}
                        <Grid item>
                            <Grid container spacing={4} sx={{ marginRight: { xs: 0, md: "80px" }, justifyContent: { xs: "center", md: "flex-end" } }}>
                                {footerData?.socialLinks?.map((item, i) =>
                                (<Grid item key={i}>
                                    <Typography
                                        component="a"
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            fontSize: { xs: "10px", sm: "13px", md: isLargeScreen ? "22px" : "15px" },
                                            fontWeight: 500,
                                            color: "#fff",
                                            fontFamily: "Inter Tight, sans-serif",
                                            cursor: "pointer",
                                            "&:hover": { opacity: 0.6 },
                                            textTransform: "uppercase",
                                            marginRight: isLargeScreen ? "30px" : "20px",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                <Grid container alignItems="center" spacing={4} sx={{ width: "100%" }}>
                    <Grid
                        item
                        xs={12}
                        md={10}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",   // flush to bottom
                            height: "100%",
                        }}
                    >
                        {/* CENTER — BUTTON */}
                        <Grid
                            sx={{
                                textAlign: "center", position: "relative", top: { xs: "120px", sm: "140px", md: "160px" },
                                left: { xs: "210px", sm: "200px", md: "861px" }, zIndex: "2", transform: "translateX(-50%)",
                                "@media (min-width:1300px)": {
                                    top: "164px",
                                    left: "995px",
                                },
                            }}

                        >
                            <motion.div
                                variants={buttonAnim}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <Button
                                    onClick={handleScrollToContact}
                                    disableElevation
                                    sx={{
                                        position: "relative",
                                        overflow: "hidden",

                                        px: { xs: 1.8, sm: 3, md: isLargeScreen ? 6 : 4 },
                                        py: { xs: 1.4, sm: 2.5, md: isLargeScreen ? 4.5 : 3 },
                                        fontSize: { xs: "10px", sm: "14px", md: isLargeScreen ? "22px" : "15px" },
                                        borderRadius: "40px",
                                        backgroundColor: "#CAF55E",
                                        fontWeight: 700,
                                        fontFamily: "Inter Tight, sans-serif",
                                        textTransform: "lowercase",
                                        transform: "rotate(-20deg)",
                                        boxShadow: "0px 4px 10px rgba(0,0,0,0.12)",
                                        overflow: "hidden",
                                        position: "relative",
                                        cursor: "default",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "0%",
                                            backgroundColor: "#000",
                                            transition: "height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                                            zIndex: 0,
                                        },
                                        "&:hover::before": {
                                            height: "100%",
                                        },
                                        "&:hover .button-text-wrapper": {
                                            color: "#fff",
                                        },
                                        "& .MuiButton-label": {
                                            position: "relative",
                                            zIndex: 2,
                                        },
                                        "&:focus": { outline: "none" },
                                        "&:focus-visible": { outline: "none", boxShadow: "0px 4px 10px rgba(0,0,0,0.12)" },
                                        "&.Mui-focusVisible": { boxShadow: "0px 4px 10px rgba(0,0,0,0.12)" },
                                    }}
                                >
                                    <Box
                                        className="button-text-wrapper"
                                        sx={{
                                            position: "relative",
                                            zIndex: 2,
                                            color: "#1D1D1B",
                                            transition: "color 0.4s ease",
                                        }}
                                    >
                                        Let's Work Together
                                    </Box>
                                </Button>
                            </motion.div>
                        </Grid>

                        {/* RIGHT — RANDOM IMAGE */}
                        <motion.div
                            variants={randomAnim}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <Grid
                                sx={{
                                    textAlign: "center", position: "relative", top: { xs: "-20px", sm: "80px", md: "214px" },
                                    left: { xs: "65px", sm: "180px", md: "770px" }, transform: "translateX(-50%)", willChange: 'transform, opacity',
                                    "@media (min-width:1300px)": {
                                        top: "232px",
                                        left: "955px",
                                    },

                                }}
                            >
                                <motion.div
                                    variants={logoAnim}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <img
                                        src={RandomImg}
                                        alt="random"
                                        style={{
                                            width: isLargeScreen ? "112px" : { xs: "5px", md: "75px" }, height: "auto", maxWidth: isLargeScreen ? "112px" : { xs: "20px", sm: "55px", md: "75px" }
                                        }}
                                    />
                                </motion.div>
                                <Typography sx={{
                                    fontSize: { xs: "10px", sm: "12px", md: isLargeScreen ? "22px" : "15px" }, fontFamily: "Inter Tight, sans-serif", marginTop: { xs: "10px", sm: "20px", md: isLargeScreen ? "45px" : "30px" },
                                }}>
                                    {footerData?.footerEmail}
                                </Typography>
                            </Grid>
                        </motion.div>
                    </Grid>
                </Grid>

                {/* ========== ROW 2 — MAIN CONTENT ========== */}
                <Grid container alignItems="center" spacing={4}>
                    {/* LEFT — BIG LOGO ONLY */}
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",   // flush to bottom
                            height: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                overflow: "hidden", // optional: avoids scrollbars if image is slightly larger
                                marginLeft: {
                                    xs: "-10px", // mobile 
                                    sm: "-35px",
                                    //  tablet & desktop 
                                },
                            }}
                        >
                            <motion.div
                                variants={logoAnim}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <img
                                    src={footerData?.footerLogo ? urlFor(footerData.footerLogo).width(2000).url() : ""}
                                    alt="footer logo"
                                    style={{
                                        width: "100%", // makes image fill container width
                                        height: "auto", // maintain aspect ratio
                                        display: "block", // remove default inline spacing
                                        willChange: 'transform, opacity'
                                    }}
                                />
                            </motion.div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
}
