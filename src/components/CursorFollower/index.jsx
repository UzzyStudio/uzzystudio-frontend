import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import arrowForward from "../../assets/arrow_forward.svg";

const CursorFollower = () => {
    const cursorRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const follower = useRef({ x: 0, y: 0 });
    const rafId = useRef(null);
    const [isHoveringClickable, setIsHoveringClickable] = useState(false);

    useEffect(() => {
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;

        if (isTouchDevice) return; // 🚫 skip everything on mobile

        const checkIfClickable = (element) => {
            if (!element) return false;
            
            // Check for data attribute first (most reliable)
            if (element.closest("[data-clickable]") !== null) return true;
            
            // Check for interactive elements (buttons and links)
            if (
                element.tagName === "A" ||
                element.tagName === "BUTTON" ||
                element.closest("button") !== null ||
                element.closest("a") !== null
            ) {
                return true;
            }
            
            // Check for cursor pointer style
            try {
                const style = window.getComputedStyle(element);
                if (style.cursor === "pointer") return true;
                
                // Check parent element cursor
                if (element.parentElement) {
                    const parentStyle = window.getComputedStyle(element.parentElement);
                    if (parentStyle.cursor === "pointer") return true;
                }
            } catch (e) {
                // Ignore errors from getComputedStyle
            }
            
            return false;
        };

        const handleMouseMove = (e) => {
            pos.current.x = e.clientX;
            pos.current.y = e.clientY;

            // Check if hovering over a clickable element
            const isClickable = checkIfClickable(e.target);
            setIsHoveringClickable(isClickable);
        };

        const handleMouseOver = (e) => {
            const isClickable = checkIfClickable(e.target);
            if (isClickable) {
                setIsHoveringClickable(true);
            }
        };

        const handleMouseOut = (e) => {
            // Only reset if we're not moving to another clickable element
            const relatedTarget = e.relatedTarget;
            if (!relatedTarget || !checkIfClickable(relatedTarget)) {
                setIsHoveringClickable(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseover", handleMouseOver, { passive: true });
        document.addEventListener("mouseout", handleMouseOut, { passive: true });

        const animate = () => {
            follower.current.x += (pos.current.x - follower.current.x) * 0.05;
            follower.current.y += (pos.current.y - follower.current.y) * 0.05;

            if (cursorRef.current) {
                // Center the cursor on the mouse position (offset by half the size)
                const offset = 30; // Half of 60px
                cursorRef.current.style.transform = `translate3d(${follower.current.x - offset}px, ${follower.current.y - offset}px, 0)`;
            }

            rafId.current = requestAnimationFrame(animate);
        };

        rafId.current = requestAnimationFrame(animate);

        return () => {
            // ✅ STOP animation loop
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }

            // ✅ REMOVE listeners
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: isHoveringClickable ? "100px" : "30px",
                height: isHoveringClickable ? "100px" : "30px",
                backgroundColor: isHoveringClickable ? "#CAF55E" : "black",
                borderRadius: "50%",
                pointerEvents: "none",
                transform: "translate3d(0, 0, 0)",
                transition: "background-color 0.2s ease",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {isHoveringClickable && (
                <img
                    src={arrowForward}
                    alt="arrow"
                    style={{
                        width: "40px",
                        height: "40px",
                        opacity: 1,
                        transition: "opacity 0.2s ease, transform 0.2s ease",
                        filter: "brightness(0) saturate(100%)", // Makes the arrow black
                        transform: "rotate(-45deg)", // Rotate to point top-right
                    }}
                />
            )}
        </div>
    );
};

export default CursorFollower;
