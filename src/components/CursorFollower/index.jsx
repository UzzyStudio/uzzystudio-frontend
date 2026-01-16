import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import arrowForward from "../../assets/arrow_forward.svg";

const CursorFollower = () => {
    const cursorRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const follower = useRef({ x: 0, y: 0 });
    const rafId = useRef(null);
    const [showGreenCursor, setShowGreenCursor] = useState(false);

    useEffect(() => {
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        // ✅ ONLY data-clickable controls green arrow
        const isGreenCursorTarget = (el) => {
            if (!el) return false;
            return el.closest("[data-clickable]") !== null;
        };

        const handleMouseMove = (e) => {
            pos.current.x = e.clientX;
            pos.current.y = e.clientY;
            setShowGreenCursor(isGreenCursorTarget(e.target));
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        const animate = () => {
            follower.current.x += (pos.current.x - follower.current.x) * 0.035;
            follower.current.y += (pos.current.y - follower.current.y) * 0.035;

            if (cursorRef.current) {
                const size = showGreenCursor ? 64 : 20;
                cursorRef.current.style.transform = `translate3d(
          ${follower.current.x - size / 2}px,
          ${follower.current.y - size / 2}px,
          0
        )`;
            }

            rafId.current = requestAnimationFrame(animate);
        };

        rafId.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId.current);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [showGreenCursor]);

    return (
        <div
            ref={cursorRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: showGreenCursor ? "64px" : "19px",
                height: showGreenCursor ? "64px" : "19px",
                backgroundColor: showGreenCursor ? "#CAF55E" : "#CAF55E",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: `
          background-color 0.35s ease,
          width 0.45s cubic-bezier(0.16,1,0.3,1),
          height 0.45s cubic-bezier(0.16,1,0.3,1)
        `,
            }}
        >
            {showGreenCursor && (
                <img
                    src={arrowForward}
                    alt="arrow"
                    style={{
                        width: "22px",
                        height: "22px",
                        transform: "rotate(-45deg)",
                        filter: "brightness(0)",
                        transition: "opacity 0.3s ease",
                    }}
                />
            )}
        </div>
    );
};

export default CursorFollower;
