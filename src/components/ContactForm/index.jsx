import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Chip,
} from "@mui/material";

const services = [
    "Logo Design",
    "App from Scratch",
    "UI/UX Design",
    "Branding",
    "Site from Scratch",
    "App Development",
    "Web Development",
];

const budgets = [
    "$200 - $500",
    "$500 - $1,000",
    "$1,000 - $3,000",
    "$3,000 - $5,000",
    "$5,000+",
];

export default function ContactForm() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState(null);

    const toggleService = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: { xs: "320px", sm: "420px", md: "780px" },
                mx: "auto",
            }}
        >
            {/* NAME + EMAIL */}
            <Grid container spacing={3}>
                {[
                    { label: "Name & Company", placeholder: "Enter your name & company" },
                    { label: "Email", placeholder: "Enter your email" },
                ].map((field) => (
                    <Grid item xs={12} md={6} key={field.label}>
                        <Typography sx={labelStyle}>{field.label}</Typography>
                        <TextField
                            fullWidth
                            placeholder={field.placeholder}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            sx={singleLineInputStyle}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* SERVICES */}
            <Box sx={{ mt: 4 }}>
                <Typography sx={labelStyle}>I'm interested in...</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                    {services.map((item) => (
                        <Chip
                            key={item}
                            label={item}
                            onClick={() => toggleService(item)}
                            sx={{
                                ...chipStyle,
                                backgroundColor: selectedServices.includes(item)
                                    ? "#000"
                                    : "transparent",
                                color: selectedServices.includes(item) ? "#fff" : "#000",
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {/* BUDGET */}
            <Box sx={{ mt: 4 }}>
                <Typography sx={labelStyle}>Project budget (USD)</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                    {budgets.map((item) => {
                        const isSelected = selectedBudget === item;
                        return (
                            <Chip
                                key={item}
                                label={item}
                                onClick={() =>
                                    setSelectedBudget(isSelected ? null : item)
                                }
                                sx={{
                                    ...chipStyle,
                                    backgroundColor: selectedServices.includes(item)
                                        ? "#000"
                                        : "transparent",
                                    color: selectedServices.includes(item) ? "#fff" : "#000",
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>

            {/* MESSAGE */}
            <Box sx={{ mt: 4 }}>
                <Typography sx={labelStyle}>Write us a message</Typography>
                <TextField
                    fullWidth
                    placeholder="Briefly describe your project"

                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    sx={singleLineInputStyle}
                />
            </Box>

            {/* SUBMIT */}
            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#000",
                        px: { xs: 4, md: 7 },
                        py: { xs: 1.3, md: 1.6 },
                        borderRadius: "80px",
                        fontFamily: "Inter Tight, sans-serif",
                        textTransform: "none",
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
                            backgroundColor: "#CAF55E",
                            transition: "height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                            zIndex: 0,
                        },
                        "&:hover::before": {
                            height: "100%",
                        },
                        "& .MuiButton-label": {
                            position: "relative",
                            zIndex: 2,
                        },
                        "&:hover .button-text-wrapper": {
                            color: "#1D1D1B !important",
                        },
                    }}
                >
                    <Box 
                        className="button-text-wrapper"
                        sx={{ 
                            position: "relative", 
                            zIndex: 2,
                            color: "white",
                            transition: "color 0.4s ease",
                        }}
                    >
                        Submit
                    </Box>
                </Button>
            </Box>
        </Box>
    );
}

/* ---------------- STYLES ---------------- */

const labelStyle = {
    mb: 1,
    fontWeight: 500,
    fontSize: { xs: "10px", md: "13px" },
    fontFamily: "Inter Tight, sans-serif",
    color: "#000",
};

const singleLineInputStyle = {
    "& .MuiInputBase-input": {
        fontFamily: "Inter Tight, sans-serif",
        fontSize: { xs: "10px", md: "13px" },
        padding: "8px 0",
        "&::placeholder": {
            fontSize: { xs: "9px", md: "10px" },
            opacity: 0.5,
            fontFamily: "Inter Tight, sans-serif",
        },
    },
    borderBottom: "1px solid #000",
};


const chipStyle = {
    borderRadius: "80px",
    px: { xs: 1.5, sm: 2, md: 1.5 },
    py: { xs: 1.5, sm: 2, md: 2.3 },
    fontSize: { xs: "8px", sm: "11px", md: "12px" },
    cursor: "pointer",
    border: "1px solid #040404ff",
    "&:hover": {
        backgroundColor: "#f4f4f4",
    },
};
