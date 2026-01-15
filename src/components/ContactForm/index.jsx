import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Chip,
} from "@mui/material";
import { client } from "../../sanityClient";

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

export default function ContactForm({ variant = "Drawer" }) {
    const isDrawer = variant === "drawer";

    const [formData, setFormData] = useState({
        nameCompany: "",
        email: "",
        services: [],
        budget: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const toggleService = (service) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service],
        }));
    };

    const handleSubmit = async () => {
        try {
            await client.create({
                _type: "contactSubmission",
                ...formData,
                submittedAt: new Date().toISOString(),
            });

            setSubmitted(true);
            setFormData({
                nameCompany: "",
                email: "",
                services: [],
                budget: "",
                message: "",
            });
        } catch (err) {
            console.error(err);
            setError(true);
        }
    };

    /* 🔽 SCALE VALUES */
    const scale = isDrawer ? 0.85 : 1;

    return (
        <Box
            sx={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                width: "100%",
            }}
        >
            {/* NAME + EMAIL */}
            <Grid container spacing={isDrawer ? 2 : 8}>
                {[
                    { label: "Name & Company", key: "nameCompany" },
                    { label: "Email", key: "email" },
                ].map((field) => (
                    <Grid item xs={12} md={6} key={field.key}>
                        <Typography sx={labelStyle(isDrawer)}>
                            {field.label}
                        </Typography>
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder={field.label}
                            InputProps={{ disableUnderline: true }}
                            value={formData[field.key]}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    [field.key]: e.target.value,
                                })
                            }
                            sx={inputStyle(isDrawer)}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* SERVICES */}
            <Box sx={{ mt: isDrawer ? 3 : 2 }}>
                <Typography sx={labelStyle(isDrawer)}>
                    I'm interested in...
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {services.map((item) => (
                        <Chip
                            key={item}
                            label={item}
                            onClick={() => toggleService(item)}
                            sx={chipStyle(isDrawer, formData.services.includes(item))}
                        />
                    ))}
                </Box>
            </Box>

            {/* BUDGET */}
            <Box sx={{ mt: isDrawer ? 3 : 2 }}>
                <Typography sx={labelStyle(isDrawer)}>
                    Project budget (USD)
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {budgets.map((item) => (
                        <Chip
                            key={item}
                            label={item}
                            onClick={() =>
                                setFormData({ ...formData, budget: item })
                            }
                            sx={chipStyle(isDrawer, formData.budget === item)}
                        />
                    ))}
                </Box>
            </Box>

            {/* MESSAGE */}
            <Box sx={{ mt: isDrawer ? 3 : 2 }}>
                <Typography sx={labelStyle(isDrawer)}>
                    Write us a message
                </Typography>
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Briefly describe your project"
                    InputProps={{ disableUnderline: true }}
                    value={formData.message}
                    onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                    }
                    sx={inputStyle(isDrawer)}
                />
            </Box>

            {/* SUBMIT */}
            <Box sx={{ mt: isDrawer ? 3 : 4 }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={submitStyle}
                >
                    <Box className="button-text-wrapper">Submit</Box>
                </Button>

                {submitted && (
                    <Typography sx={{ mt: 1, color: "green" }}>
                        Submitted successfully!
                    </Typography>
                )}
                {error && (
                    <Typography sx={{ mt: 1, color: "red" }}>
                        Something went wrong
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

const labelStyle = (isDrawer) => ({
    mb: 1,
    fontWeight: 500,
    fontSize: isDrawer ? "11px" : "13px",
    fontFamily: "Inter Tight, sans-serif",
    color: "#000",
});

const inputStyle = (isDrawer) => ({
    "& .MuiInputBase-input": {
        fontSize: isDrawer ? "11px" : "14px",
        fontFamily: "Inter Tight, sans-serif",
        padding: "6px 0",
        "&::placeholder": {
            opacity: 0.5,
        },
    },
    borderBottom: "1px solid #000",
});

const chipStyle = (isDrawer, active) => ({
    borderRadius: "80px",
    px: isDrawer ? 1.5 : 2.5,
    py: isDrawer ? 1 : 2,
    fontSize: isDrawer ? "10px" : "14px",
    cursor: "pointer",
    border: "1px solid #e0e0e0",
    backgroundColor: active ? "#000" : "transparent",
    color: active ? "#fff" : "#000",
});

const submitStyle = {
    backgroundColor: "#000",
    borderRadius: "80px",
    px: 7,
    py: 1.1,
    textTransform: "none",
    overflow: "hidden",
    position: "relative",
    "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        backgroundColor: "#CAF55E",
        transform: "scaleY(0)",
        transformOrigin: "bottom",
        transition: "transform 0.6s ease",
        zIndex: 0,
    },
    "&:hover::before": {
        transform: "scaleY(1)",
    },
    "& .button-text-wrapper": {
        position: "relative",
        zIndex: 1,
        color: "#fff",
    },
    "&:hover .button-text-wrapper": {
        color: "#1D1D1B",
    },
};
