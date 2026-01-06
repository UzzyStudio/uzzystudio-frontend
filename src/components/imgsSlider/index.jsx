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
        // Larger square is always 442px
        const BIG_SQUARE_SIZE = 442;
        // Smaller square is 85% of larger square
        const SMALL_SQUARE_SIZE = Math.floor(BIG_SQUARE_SIZE * 0.85);

        if (containerWidth === 0 || containerWidth < 200) {
            // Fallback to original sizes until container width is known
            return {
                big: isXs ? 180 : isSm ? 250 : BIG_SQUARE_SIZE,
                small: isXs ? 140 : isSm ? 200 : SMALL_SQUARE_SIZE,
                partial: isXs ? 54 : isSm ? 75 : Math.floor(BIG_SQUARE_SIZE * 0.3),
            };
        }

        const availableWidth = containerWidth;
        // Calculate partial width for layout positioning
        const partialWidth = BIG_SQUARE_SIZE * 0.3;

        return {
            big: BIG_SQUARE_SIZE,
            small: SMALL_SQUARE_SIZE,
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
    // On larger screens: center 2 full images with partial images entering from sides
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (containerWidth > 0 && images.length > 0 && totalWidth > 0) {
            // Calculate layout: [partial left] [gap] [full 1] [gap] [full 2] [gap] [partial right]
            // On larger screens: center 2 full images with partial images entering from sides
            const firstImageWidth = (0 % 2 === 0) ? ITEM_WIDTH_BIG : ITEM_WIDTH_SMALL;
            const secondImageWidth = (1 % 2 === 0) ? ITEM_WIDTH_BIG : ITEM_WIDTH_SMALL;

            // Calculate how much space the 2 full images + 2 gaps take (between the 2 full images)
            const twoFullImagesWidth = firstImageWidth + GAP + secondImageWidth;

            // Calculate remaining space for partial images on both sides
            const remainingSpace = containerWidth - twoFullImagesWidth;
            const partialSpacePerSide = Math.max(PARTIAL_WIDTH, remainingSpace / 2);

            // Position so we show partial left (~30% of first image), then 2 full images, then partial right
            // Offset should position first image so only the partial amount is visible on left
            const visiblePartialLeft = Math.min(PARTIAL_WIDTH, partialSpacePerSide);
            const initialOffset = firstImageWidth - visiblePartialLeft;
            setOffset(initialOffset);
        }
    }, [totalWidth, containerWidth, images.length, PARTIAL_WIDTH, ITEM_WIDTH_BIG, ITEM_WIDTH_SMALL, GAP]);

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
    const velocity = useRef(0);
    const lastX = useRef(0);
    const lastTime = useRef(0);
    const momentumRef = useRef(null);

    // Momentum animation after drag release
    useEffect(() => {
        if (images.length === 0 || containerWidth === 0) return;

        const animateMomentum = () => {
            if (isDragging.current) {
                momentumRef.current = requestAnimationFrame(animateMomentum);
                return;
            }

            if (Math.abs(velocity.current) > 0.1) {
                setOffset((prev) => {
                    let next = prev + velocity.current;
                    const block = totalWidth / 3;

                    // Keep offset within bounds for seamless loop
                    if (next > -block) next -= block;
                    if (next < -block * 2) next += block;

                    return next;
                });

                velocity.current *= 0.95; // Friction
                momentumRef.current = requestAnimationFrame(animateMomentum);
            } else {
                velocity.current = 0;
                momentumRef.current = requestAnimationFrame(animateMomentum);
            }
        };

        momentumRef.current = requestAnimationFrame(animateMomentum);

        return () => {
            if (momentumRef.current) {
                cancelAnimationFrame(momentumRef.current);
            }
        };
    }, [totalWidth, images.length, containerWidth]);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const startDrag = (x, isTouch = false) => {
            isDragging.current = true;
            startX.current = x;
            startOffset.current = offset;
            lastX.current = x;
            lastTime.current = performance.now();
            velocity.current = 0;
            
            // Cancel any ongoing momentum
            if (momentumRef.current) {
                cancelAnimationFrame(momentumRef.current);
                momentumRef.current = null;
            }
        };

        const handleMove = (x, isTouch = false) => {
            if (!isDragging.current) return;
            
            const currentTime = performance.now();
            const deltaTime = currentTime - lastTime.current;
            
            if (deltaTime > 0) {
                const deltaX = x - lastX.current;
                velocity.current = deltaX / deltaTime * 16; // Normalize to 60fps
            }
            
            lastX.current = x;
            lastTime.current = currentTime;

            const deltaX = x - startX.current;
            setOffset((prev) => {
                let next = startOffset.current + deltaX;
                const block = totalWidth / 3;

                // Keep offset within bounds for seamless loop
                if (next > -block) next -= block;
                if (next < -block * 2) next += block;

                return next;
            });
        };

        const handleEnd = () => {
            isDragging.current = false;
            // Velocity will continue in momentum effect
        };

        // Mouse events (desktop)
        const handleMouseDown = (e) => {
            if (!isDesktop) return;
            e.preventDefault();
            startDrag(e.clientX);
        };

        const handleMouseMove = (e) => {
            if (!isDesktop) return;
            handleMove(e.clientX);
        };

        const handleMouseUp = () => {
            if (!isDesktop) return;
            handleEnd();
        };

        // Touch events (mobile)
        const handleTouchStart = (e) => {
            if (isDesktop) return;
            e.preventDefault();
            startDrag(e.touches[0].clientX, true);
        };

        const handleTouchMove = (e) => {
            if (isDesktop) return;
            e.preventDefault();
            handleMove(e.touches[0].clientX, true);
        };

        const handleTouchEnd = () => {
            if (isDesktop) return;
            handleEnd();
        };

        // Add event listeners
        slider.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        
        slider.addEventListener("touchstart", handleTouchStart, { passive: false });
        slider.addEventListener("touchmove", handleTouchMove, { passive: false });
        slider.addEventListener("touchend", handleTouchEnd);
        slider.addEventListener("touchcancel", handleTouchEnd);

        return () => {
            slider.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            
            slider.removeEventListener("touchstart", handleTouchStart);
            slider.removeEventListener("touchmove", handleTouchMove);
            slider.removeEventListener("touchend", handleTouchEnd);
            slider.removeEventListener("touchcancel", handleTouchEnd);
        };
    }, [offset, isDesktop, totalWidth]);



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
                pb: "120px",
                px: isLargeScreen ? { xs: 2, sm: 4, md: 12 } : { xs: 2, sm: 4, md: 6 },
                position: "relative",
                overflow: "hidden",
                height: isXs ? 200 : isSm ? 200 : isLargeScreen ? 645 : 460,
                cursor: "none", // 👈 hide default cursor
                userSelect: "none", // Prevent text selection during drag
                WebkitUserSelect: "none",
            }}
        >
            {/* SMILEY */}
            <Box
                component="img"
                src={Smiley}
                sx={{
                    position: "absolute",
                    right: isXs ? 20 : isSm ? 40 : isLargeScreen ? 120 : 140,
                    bottom: isXs ? 20 : isSm ? 20 : -10,
                    width: isXs ? 80 : isSm ? 120 : isLargeScreen ? 270 : 180,
                    zIndex: 0,
                }}
            />

            {/* SLIDER */}
            <Box
                ref={sliderRef}
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: `${GAP}px`,
                    transform: `translateX(${offset}px)`,
                    willChange: "transform", // 🔥 smoother
                    px: 0, // Remove padding to allow precise positioning
                    pt: isXs ? "10px" : isSm ? "10px" : "10px",
                    userSelect: "none", // Prevent image selection during drag
                    WebkitUserSelect: "none",
                }}
            >
                {images.map((img, i) => {
                    const squareSize = getItemWidth(i);
                    const isLargeSquare = i % 2 === 0;
                    // Center smaller squares vertically relative to larger square
                    const marginTop = !isLargeSquare ? (ITEM_WIDTH_BIG - ITEM_WIDTH_SMALL) / 2 : 0;
                    return (
                        <Box
                            key={i}
                            sx={{
                                flexShrink: 0,
                                width: squareSize,
                                height: squareSize, // Make it a perfect square
                                overflow: "hidden",
                                borderRadius: "14px",
                                position: "relative",
                                display: "block",
                                marginTop: `${marginTop}px`,
                                "& img": {
                                    borderRadius: "14px",
                                },
                            }}
                        >
                            <img
                                src={urlFor(img).width(800).quality(80).url()}
                                alt="slider image"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "14px",
                                    display: "block",
                                    margin: 0,
                                    padding: 0,
                                    verticalAlign: "top",
                                }}
                            />
                        </Box>
                    );
                })}
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
