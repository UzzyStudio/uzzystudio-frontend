import { Drawer, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContactForm from "../ContactForm";

export default function ContactDrawer({ open, onClose }) {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            transitionDuration={700}

            /* 🔥 REMOVE OVERLAY COMPLETELY */
            ModalProps={{
                keepMounted: true,
                hideBackdrop: true, // ✅ THIS IS THE KEY
            }}

            PaperProps={{
                sx: {
                    width: {
                        xs: "80%",
                        sm: "480px",
                        md: "720px",
                    },
                    maxWidth: "100%",
                    minHeight: "100vh",
                    padding: "12px 40px",

                    /* ✅ REAL GLASS EFFECT */
                    backgroundColor: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(50px)",
                    WebkitBackdropFilter: "blur(50px)",

                    /* Optional polish */
                    borderLeft: "1px solid rgba(255,255,255,0.35)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",

                    overflowY: "auto",
                },
            }}
        >
            {/* CLOSE BUTTON */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 2,
                }}
            >
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* CONTACT FORM */}
            <ContactForm />
        </Drawer>
    );
}
