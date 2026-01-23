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
            duration: 7,
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
                        borderRadius: "100%",
                        transition: { duration: 1.5, ease: "easeInOut" } // was 0.8 → increase
                    }),
                    textControls.start({
                        color: "#fff",
                        scale: 1.1,
                        transition: { duration: 1.5, ease: "easeInOut" } // was 0.8 → increase
                    })
                ]);


                await Promise.all([
                    wipeControls.start({
                        scale: 10,
                        borderRadius: "0%",
                        transition: { duration: 2, ease: [0.7, 0, 0.3, 1] } // was 1 → slower
                    }),
                    textControls.start({
                        opacity: 0,
                        scale: 1.5,
                        transition: { duration: 1.5, ease: "easeIn" } // was 0.8 → slower
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
                    fontSize: { xs: "20px", md: "50px" },
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