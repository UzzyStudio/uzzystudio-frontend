import { Box, Typography } from "@mui/material";
import { motion, animate, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

const MotionBox = motion.create(Box);
const MotionText = motion.create(Typography);

const Loader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const wipeControls = useAnimationControls();
    const textControls = useAnimationControls();

    useEffect(() => {
        const controls = animate(0, 100, {
            duration: 2.8,
            ease: [0.45, 0, 0.55, 1],
            onUpdate(value) {
                setCount(Math.round(value));
            },
            onComplete: async () => {
                // 1. Zoom the black screen IN (White Text becomes visible over Black)
                // We animate them simultaneously for smoothness
                await Promise.all([
                    wipeControls.start({
                        scale: 1.5,
                        borderRadius: "100%", // Keep it circular for the "lens" look
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }),
                    textControls.start({
                        color: "#fff", // Change text to white as black fills behind it
                        scale: 1.1,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    })
                ]);

                // 2. Zoom everything OUT together with smoothness
                await Promise.all([
                    wipeControls.start({
                        scale: 10, // Massive scale to clear the screen
                        borderRadius: "0%",
                        transition: { duration: 1, ease: [0.7, 0, 0.3, 1] }
                    }),
                    textControls.start({
                        opacity: 0,
                        scale: 1.5,
                        transition: { duration: 0.8, ease: "easeIn" }
                    })
                ]);

                onComplete?.();
            },
        });

        return () => controls.stop();
    }, [wipeControls, textControls, onComplete]);

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* 🔢 The Counter - Positioned HIGHER (zIndex 3) than the wipe */}
            <MotionText
                animate={textControls}
                initial={{ color: "#000" }}
                sx={{
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: { xs: "48px", md: "120px" },
                    fontWeight: 500,
                    letterSpacing: "-0.04em",
                    zIndex: 3,
                    position: "relative"
                }}
            >
                {count}
            </MotionText>

            {/* ⬛ THE BLACK WIPE - Positioned BELOW the text (zIndex 2) */}
            <MotionBox
                initial={{ scale: 0, borderRadius: "100%" }}
                animate={wipeControls}
                sx={{
                    position: "absolute",
                    width: "100vh",
                    height: "100vh",
                    backgroundColor: "#000",
                    zIndex: 2,
                    pointerEvents: "none",
                }}
            />
        </Box>
    );
};

export default Loader;