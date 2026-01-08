import React, { useState, useEffect } from "react";
import { client, urlFor } from "../../sanityClient";

import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    keyframes,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ContactDrawer from "../ContactDrawer";
import Logo from "../../assets/logo.svg fill.svg";

// const menuItems = [
//     { label: "Vision", id: "vision" },
//     { label: "Services", id: "services" },
//     { label: "Cases", id: "cases" },
// ];

const slideDownFast = keyframes`
  0% {
    transform: translateY(-60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const glassyRotate = keyframes`
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(200%) rotate(45deg);
  }
`;

const itemRotate = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }
  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`;

const Header = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        client
            .fetch(`
      *[_type == "headerSection"][0]{
        menuItems[]{
          label,
          id
        }
      }
    `)
            .then((data) => {
                if (data?.menuItems?.length) {
                    setMenuItems(data.menuItems);
                }
            })
            .catch(console.error);
    }, []);


    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [contactOpen, setContactOpen] = useState(false);

    const isMobile = useMediaQuery("(max-width:1124px)");
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");

    // Scroll handler for hide/show header (optimized)
    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentY = window.scrollY;

                    if (currentY > lastY && currentY > 100) {
                        setShowHeader(prev => (prev ? false : prev));
                    } else {
                        setShowHeader(prev => (!prev ? true : prev));
                    }

                    lastY = currentY;
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);




    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (!section || !window.lenis) return;

        const headerOffset = 120;
        const y =
            section.getBoundingClientRect().top +
            window.pageYOffset -
            headerOffset;

        window.lenis.scrollTo(y);

        setDrawerOpen(false);
    };



    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: "transparent",
                position: "fixed", // fixed works better than sticky for this effect
                top: 0,
                width: "100%",
                maxWidth: isLargeScreen ? "100%" : "1600px",
                margin: "auto",
                paddingX: isLargeScreen ? 12 : 6,
                paddingY: 1,
                transition: "transform 0.3s ease",
                transform: showHeader ? "translateY(0)" : "translateY(-120px)", // hide when scrolling down
                zIndex: 100,
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    maxWidth: isLargeScreen ? "100%" : "1600px",
                    animation: `${slideDownFast} 0.7s ease-out`,
                    animationFillMode: "forwards",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        marginLeft: "auto",
                        width: isLargeScreen ? "50vw" : "47.625vw",
                        maxWidth: isLargeScreen ? "50vw" : "47.625vw",
                        justifyContent: "flex-end",
                    }}
                >
                    {/* Logo */}
                    <Box
                        sx={{
                            width: isLargeScreen ? "60px" : "46px",
                            height: isLargeScreen ? "60px" : "46px",
                            backgroundColor: "#ffffff",
                            borderRadius: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // smooth scroll
                                });
                            }}
                            src={Logo} alt="Logo" width={isLargeScreen ? "52" : "40"} height={isLargeScreen ? "52" : "40"} />
                    </Box>

                    {/* Desktop Menu */}
                    {!isMobile && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 13 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "center",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "70px",
                                    padding: "8px 34px",
                                }}
                            >
                                {menuItems.map((item) => (
                                    <Box
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        sx={{
                                            cursor: "pointer",
                                            borderRadius: "12px",
                                            padding: isLargeScreen ? "8px 12px 8px 12px" : "6px 10px 6px 10px",
                                            fontSize: isLargeScreen ? "18px" : "15px",
                                            fontWeight: 900,
                                            fontFamily: "Inter Tight, sans-serif",
                                            color: "#1D1D1B",
                                            position: "relative",
                                            overflow: "hidden",
                                            backgroundColor: "transparent",
                                            transition: "background-color 0.25s ease",

                                            "&:hover": {
                                                backgroundColor: "#ffffff",

                                                "& .menu-text-top": {
                                                    transform: "translateY(-100%)",
                                                },

                                                "& .menu-text-bottom": {
                                                    transform: "translateY(-100%)",
                                                },

                                                "&::before": {
                                                    opacity: 1,
                                                    transform: "translateX(200%) rotate(45deg)",
                                                },
                                            },

                                            "&::before": {
                                                content: '""',
                                                position: "absolute",
                                                top: "-50%",
                                                left: "-50%",
                                                width: "200%",
                                                height: "200%",
                                                background:
                                                    "linear-gradient(45deg, transparent 20%, rgba(255,255,255,.6) 45%, rgba(255,255,255,.8) 50%, rgba(255,255,255,.6) 55%, transparent 80%)",
                                                opacity: 0,
                                                transition: "opacity 0.3s ease, transform 1.2s ease",
                                                pointerEvents: "none",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "relative",
                                                overflow: "hidden",
                                                height: "auto",
                                                display: "block",
                                            }}
                                        >
                                            <Box
                                                className="menu-text-top"
                                                sx={{
                                                    display: "block",
                                                    transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                                                    willChange: "transform",
                                                }}
                                            >
                                                {item.label}
                                            </Box>

                                            <Box
                                                className="menu-text-bottom"
                                                sx={{
                                                    position: "absolute",
                                                    left: 0,
                                                    top: "100%",
                                                    transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                                                    willChange: "transform",
                                                }}
                                            >
                                                {item.label}
                                            </Box>
                                        </Box>
                                    </Box>

                                ))}
                            </Box>

                            <Button
                                variant="contained"
                                onClick={() => setContactOpen(true)}
                                sx={{
                                    position: "relative",
                                    backgroundColor: "#CAF55E",
                                    color: "#1D1D1B",
                                    borderRadius: "30px",
                                    padding: isLargeScreen ? "11px 22px" : "9px 18px",
                                    fontSize: isLargeScreen ? "18px" : "15px",
                                    fontWeight: 900,
                                    fontFamily: "Inter Tight, sans-serif",
                                    boxShadow: "none",
                                    textTransform: "none",
                                    overflow: "hidden",

                                    /* TEXT ABOVE BG */
                                    "& > *": {
                                        position: "relative",
                                        zIndex: 2,
                                    },

                                    /* HOVER BACKGROUND LAYER */
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        inset: 0,
                                        backgroundColor: "#000",
                                        transform: "scaleY(0)",
                                        transformOrigin: "bottom",
                                        transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                                        zIndex: 1,
                                    },

                                    "&:hover": {
                                        boxShadow: "none",
                                        color: "#fff",

                                        "&::before": {
                                            transform: "scaleY(1)",
                                        },

                                        "& .btn-text-top": {
                                            transform: "translateY(-100%)",
                                        },

                                        "& .btn-text-bottom": {
                                            transform: "translateY(-100%)",
                                        },
                                    },

                                    "&:focus": { outline: "none" },
                                    "&:focus-visible": { outline: "none", boxShadow: "none" },
                                    "&.Mui-focusVisible": { boxShadow: "none" },
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        overflow: "hidden",
                                        display: "inline-block",
                                    }}
                                >
                                    <Box
                                        className="btn-text-top"
                                        sx={{
                                            display: "block",
                                            transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                                        }}
                                    >
                                        start a project
                                    </Box>

                                    <Box
                                        className="btn-text-bottom"
                                        sx={{
                                            position: "absolute",
                                            left: 0,
                                            top: "100%",
                                            transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                                        }}
                                    >
                                        start a project
                                    </Box>
                                </Box>
                            </Button>

                        </Box>
                    )}

                    {/* Mobile Menu Toggle */}
                    {isMobile && (
                        <IconButton onClick={() => setDrawerOpen(true)}>
                            <MenuIcon sx={{ color: "#1D1D1B" }} />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250, padding: 2 }}>
                    <IconButton onClick={() => setDrawerOpen(false)} sx={{ alignSelf: "flex-end" }}>
                        <CloseIcon />
                    </IconButton>

                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.id} disablePadding>
                                <ListItemButton onClick={() => scrollToSection(item.id)}>
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{
                                            fontWeight: 900,
                                            fontSize: "16px",
                                            fontFamily: "Inter Tight, sans-serif",
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}

                    </List>

                    <Box sx={{ padding: 2 }}>
                        <Button
                            fullWidth
                            onClick={() => {
                                setDrawerOpen(false);
                                setContactOpen(true);
                            }}
                            variant="contained"
                            sx={{
                                backgroundColor: "#CAF55E",
                                color: "#1D1D1B",
                                borderRadius: "30px",
                                fontWeight: 900,
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: "#B6E450",
                                    boxShadow: "none",
                                },
                                "&:focus": { outline: "none" },
                                "&:focus-visible": { outline: "none" },
                                "&.Mui-focusVisible": { boxShadow: "none" },
                            }}
                        >
                            start a project
                        </Button>
                    </Box>
                </Box>
            </Drawer>

            <ContactDrawer
                open={contactOpen}
                onClose={() => setContactOpen(false)}
            />

        </AppBar>
    );
};

export default Header;
