import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { client, urlFor } from "../../sanityClient";


import ArrowForwardIosIcon from "../../assets/arrow_forward.svg";
import ArrowBackIosNewIcon from "../../assets/arrow_back.svg";

// import img1 from "../../assets/Rectangle 3.svg";
// import img2 from "../../assets/Rectangle 7.svg";
// import img3 from "../../assets/Mask group.svg";
// import img4 from "../../assets/Rectangle 7.svg";
// import img5 from "../../assets/img5.jpg";
// import img6 from "../../assets/img6.jpg";
import Smiley from "../../assets/smiley face.svg";

// Original images
// const originalImages = [img1, img2, img3, img4, img5, img6];

// Triplicate for seamless infinite loop
// const images = [...originalImages, ...originalImages, ...originalImages];

const SmoothAlternatingSlider1 = () => {
    const isDesktop = useMediaQuery("(hover: hover) and (pointer: fine)");


    const [originalImages, setOriginalImages] = useState([]);
    const images =
        originalImages.length > 0
            ? [...originalImages, ...originalImages, ...originalImages]
            : [];
    useEffect(() => {
        client
            .fetch(`
      *[_type == "smoothSliderSection"][0]{
        images
      }
    `)
            .then((data) => {
                if (data?.images?.length) {
                    setOriginalImages(data.images); // 👈 RAW Sanity images
                }
            })
            .catch(console.error);
    }, []);


    const cursorTarget = useRef({ x: 0, y: 0 });
    const cursorCurrent = useRef({ x: 0, y: 0 });
    const lastMousePos = useRef({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const sliderRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    /** ---------------- CURSOR ---------------- */

    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorActive, setCursorActive] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            if (!containerRef.current || !cursorActive) return;

            const rect = containerRef.current.getBoundingClientRect();
            const { x, y } = lastMousePos.current;

            // ✅ update TARGET, not position
            cursorTarget.current = {
                x: x - rect.left,
                y: y - rect.top,
            };
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [cursorActive]);


    const handleMouseMove = (e) => {
        if (!isDesktop) return;
        lastMousePos.current = {
            x: e.clientX,
            y: e.clientY,
        };

        const rect = containerRef.current.getBoundingClientRect();

        cursorTarget.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        setCursorActive(true);
    };


    const handleCursorLeave = () => {
        setCursorActive(false);
    };

    /** ---------------- RESPONSIVE ---------------- */
    const isXs = useMediaQuery("(max-width:600px)");
    const isSm = useMediaQuery("(max-width:900px)");
    const isLargeScreen = useMediaQuery("(min-width: 2560px)");

    // Calculate container width (accounting for padding)
    useEffect(() => {
        const updateContainerWidth = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                // Get computed padding
                const computedStyle = window.getComputedStyle(containerRef.current);
                const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
                const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
                // Available width is container width minus padding
                const availableWidth = rect.width - paddingLeft - paddingRight;
                setContainerWidth(availableWidth);
            }
        };

        updateContainerWidth();
        window.addEventListener("resize", updateContainerWidth);
        // Also update when images load
        const timer = setTimeout(updateContainerWidth, 100);
        return () => {
            window.removeEventListener("resize", updateContainerWidth);
            clearTimeout(timer);
        };
    }, [images.length]);

    // Calculate item widths to show 2 full images + 2 partial images
    // Layout: [partial left ~30%] [gap] [full 1] [gap] [full 2] [gap] [partial right ~30%]
    // Formula: 0.3*full + gap + full + gap + full + gap + 0.3*full = containerWidth
    // Simplified: 2.6*full + 3*gap = containerWidth
    const GAP = isXs ? 20 : isSm ? 35 : isLargeScreen ? 75 : 50;
    
    const calculateItemWidths = () => {
        if (containerWidth === 0 || containerWidth < 200) {
            // Fallback to original sizes until container width is known
            return {
                big: isXs ? 180 : isSm ? 250 : isLargeScreen ? 495 : 330,
                small: isXs ? 140 : isSm ? 200 : isLargeScreen ? 360 : 240,
                partial: isXs ? 54 : isSm ? 75 : isLargeScreen ? 148 : 99,
            };
        }

        const availableWidth = containerWidth;
        // Calculate full width: 2.6 * full + 3 * gap = availableWidth
        const fullWidth = (availableWidth - (3 * GAP)) / 2.6;
        const partialWidth = fullWidth * 0.3;

        // Use alternating sizes but ensure they fit
        const bigWidth = Math.floor(fullWidth);
        const smallWidth = Math.floor(fullWidth * 0.85); // Slightly smaller for variety

        return {
            big: Math.max(bigWidth, 100), // Minimum width
            small: Math.max(smallWidth, 80), // Minimum width
            partial: Math.floor(partialWidth),
        };
    };

    const { big: ITEM_WIDTH_BIG, small: ITEM_WIDTH_SMALL, partial: PARTIAL_WIDTH } = calculateItemWidths();

    const getItemWidth = (i) =>
        i % 2 === 0 ? ITEM_WIDTH_BIG : ITEM_WIDTH_SMALL;

    const totalWidth = images.reduce(
        (sum, _, i) => sum + getItemWidth(i) + GAP,
        0
    );

    /** ---------------- OFFSET ---------------- */
    // Initial offset: position so we see partial left + 2 full + partial right
    // Start with first image partially visible on left (showing ~30% of first image)
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (containerWidth > 0 && images.length > 0 && totalWidth > 0) {
            // Position so first image is partially visible on left
            // We want to show PARTIAL_WIDTH of the first image
            // So offset should position the first image's right edge at PARTIAL_WIDTH from left
            // If first image width is ITEM_WIDTH_BIG (assuming index 0 is big), then:
            // offset = ITEM_WIDTH_BIG - PARTIAL_WIDTH
            const firstImageWidth = (0 % 2 === 0) ? ITEM_WIDTH_BIG : ITEM_WIDTH_SMALL;
            const initialOffset = firstImageWidth - PARTIAL_WIDTH;
            setOffset(initialOffset);
        }
    }, [totalWidth, containerWidth, images.length, PARTIAL_WIDTH, ITEM_WIDTH_BIG, ITEM_WIDTH_SMALL]);

    /** ---------------- AUTO SCROLL ---------------- */
    const speed = useRef(0.7);
    const isHovered = useRef(false);
    const isDragging = useRef(false);
    const rafRef = useRef(null);

    useEffect(() => {
        if (images.length === 0 || containerWidth === 0) return;

        const animate = () => {
            if (!isHovered.current && !isDragging.current) {
                setOffset((prev) => {
                    let next = prev - speed.current;
                    const block = totalWidth / 3;
                    // Keep offset within bounds for seamless loop
                    if (next < -block * 2) next += block;
                    return next;
                });
            }
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [totalWidth, images.length, containerWidth]);




    useEffect(() => {
        if (!isDesktop) return;

        let raf;
        const animateCursor = () => {
            cursorCurrent.current.x +=
                (cursorTarget.current.x - cursorCurrent.current.x) * 0.18;
            cursorCurrent.current.y +=
                (cursorTarget.current.y - cursorCurrent.current.y) * 0.18;

            setCursorPos({
                x: cursorCurrent.current.x,
                y: cursorCurrent.current.y,
            });

            raf = requestAnimationFrame(animateCursor);
        };

        raf = requestAnimationFrame(animateCursor);
        return () => cancelAnimationFrame(raf);
    }, [isDesktop]);



    /** ---------------- DRAG ---------------- */
    const startX = useRef(0);
    const startOffset = useRef(0);

    useEffect(() => {
        if (!isDesktop) return; // 🚫 no drag on mobile

        const slider = sliderRef.current;
        if (!slider) return;

        const startDrag = (x) => {
            isDragging.current = true;
            startX.current = x;
            startOffset.current = offset;
        };

        const handleMouseDown = (e) => startDrag(e.clientX);
        const handleMouseMove = (e) => {
            if (!isDesktop) return;
            if (!isDragging.current) return;
            setOffset(startOffset.current + (e.clientX - startX.current));
        };
        const handleMouseUp = () => {
            isDragging.current = false;
        };

        slider.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            slider.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [offset, isDesktop]);



    useEffect(() => {
        if (!isDesktop) return;

        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();

                isHovered.current = true;

                setOffset((prev) => {
                    let next = prev - e.deltaX;
                    const block = totalWidth / 3;

                    if (next > -block) next -= block;
                    if (next < -block * 2) next += block;

                    return next;
                });
            }
        };

        container.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            container.removeEventListener("wheel", onWheel);
        };
    }, [totalWidth, isDesktop]);


    return (
        <Box
            ref={containerRef}
            onMouseEnter={() => {
                isHovered.current = true;
            }}
            onMouseLeave={() => {
                isHovered.current = false;
                isDragging.current = false;
                handleCursorLeave();
            }}
            onMouseMove={isDesktop ? handleMouseMove : undefined}
            sx={{
                width: "100%",
                maxWidth: isLargeScreen ? "100%" : "1600px",
                margin: "auto",
                px: isLargeScreen ? { xs: 2, sm: 4, md: 12 } : { xs: 2, sm: 4, md: 6 },
                position: "relative",
                overflow: "hidden",
                height: isXs ? 200 : isSm ? 200 : isLargeScreen ? 645 : 430,
                cursor: "none", // 👈 hide default cursor
            }}
        >
            {/* SMILEY */}
            <Box
                component="img"
                src={Smiley}
                sx={{
                    position: "absolute",
                    right: isXs ? 20 : isSm ? 40 : isLargeScreen ? 120 : 80,
                    bottom: isXs ? 20 : isSm ? 20 : 20,
                    width: isXs ? 80 : isSm ? 120 : isLargeScreen ? 270 : 180,
                    zIndex: 0,
                }}
            />

            {/* SLIDER */}
            <Box
                ref={sliderRef}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: `${GAP}px`,
                    transform: `translateX(${offset}px)`,
                    willChange: "transform", // 🔥 smoother
                    px: 0, // Remove padding to allow precise positioning
                }}
            >
                {images.map((img, i) => (
                    <Box
                        key={i}
                        sx={{
                            flexShrink: 0,
                            width: getItemWidth(i),
                            height:
                                i % 2 === 0
                                    ? (isXs ? 150 : isSm ? 220 : isLargeScreen ? 495 : 330)
                                    : (isXs ? 120 : isSm ? 170 : isLargeScreen ? 390 : 260),
                            overflow: "hidden",
                            borderRadius: "16px",
                        }}
                    >
                        <img
                            src={urlFor(img).width(800).quality(80).url()}
                            alt="slider image"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {/* ARROWS */}

            <Box
                sx={{
                    position: "absolute",
                    left: cursorPos.x,
                    top: cursorPos.y,
                    transform: cursorActive
                        ? "translate(-50%, -50%) scale(1)"
                        : "translate(-50%, -50%) scale(0.6)", background: "black",
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none", // VERY IMPORTANT
                    zIndex: 20,
                    // ✨ MAGIC
                    opacity: cursorActive ? 1 : 0,
                    filter: cursorActive ? "blur(0px)" : "blur(6px)",

                    transition:
                        "opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease",
                }}
            >
                <img
                    src={ArrowBackIosNewIcon}
                    style={{
                        width: 20,
                        position: "absolute",
                        left: 8,
                        opacity: 0.9,

                    }}
                />
                <img
                    src={ArrowForwardIosIcon}
                    style={{
                        width: 20,
                        position: "absolute",
                        right: 8,
                        opacity: 0.9,

                    }}
                />
            </Box>


        </Box>
    );
};

export default SmoothAlternatingSlider1;
