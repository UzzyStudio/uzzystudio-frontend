import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsappFloating = () => {
    const whatsappLink =
        "https://api.whatsapp.com/send/?phone=447592131117&text&type=phone_number&app_absent=0";

    return (
        <Box
            component="a"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                position: "fixed",
                left: { xs: "16px", md: "30px" },
                bottom: { xs: "16px", md: "30px" },
                width: { xs: "44px", sm: "52px", md: "85px" },
                height: { xs: "44px", sm: "52px", md: "85px" },
                borderRadius: "50%",
                backgroundColor: "#25D366", // Official WhatsApp green
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 9999,
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",

                "&:hover": {
                    transform: "translateY(-4px)",
                    backgroundColor: "#1ebe5d",
                    color: "#fff",
                },
            }}
        >
            <WhatsAppIcon
                sx={{
                    fontSize: { xs: 22, sm: 26, md: 45 },
                }}
            />
        </Box>
    );
};

export default WhatsappFloating;
