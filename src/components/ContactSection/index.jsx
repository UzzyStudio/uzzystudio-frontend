import React from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Stack,
    Chip,
    useMediaQuery,
} from "@mui/material";
import { client, urlFor } from "../../sanityClient";
import { useState } from "react";
import CharacterContact from "../../assets/character-contact.svg";
import RatingImg from "../../assets/rating.png";
import BehanceLogo from "../../assets/Behance.svg";
import DribbbleLogo from "../../assets/dribble.svg";
import InstagramLogo from "../../assets/insta.png";
import whatsappicon from "../../assets/whatsappicon.png";
import gmailicon from "../../assets/gmailicon.webp";
import linkeidnicon from "../../assets/linkeidnicon.png";



export default function ContactSection() {

    const [formData, setFormData] = useState({
        nameCompany: '',
        email: '',
        services: [],
        budget: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [nameError, setNameError] = useState(false);


    const isLargeScreen = useMediaQuery("(min-width: 2560px)");

    const wiggle = {
        '@keyframes wiggle': {
            '0%': { transform: 'rotate(0deg)' },
            '25%': { transform: 'rotate(3deg)' },
            '50%': { transform: 'rotate(-3deg)' },
            '75%': { transform: 'rotate(2deg)' },
            '100%': { transform: 'rotate(0deg)' },
        },
    };

    const [selectedServices, setSelectedServices] = React.useState([]);
    const [selectedBudget, setSelectedBudget] = useState(null);


    const toggleService = (service) => {
        let updatedServices;
        if (formData.services.includes(service)) {
            updatedServices = formData.services.filter(s => s !== service);
        } else {
            updatedServices = [...formData.services, service];
        }
        setFormData({ ...formData, services: updatedServices });
        setSelectedServices(updatedServices); // optional for styling
    };


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

    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     const doc = {
    //         _type: 'contactSubmission',
    //         nameCompany: formData.nameCompany,
    //         email: formData.email,
    //         services: formData.services,
    //         budget: formData.budget,
    //         message: formData.message,
    //         submittedAt: new Date().toISOString(),
    //     }

    //     try {
    //         await client.create(doc)
    //         setSubmitted(true)
    //         setFormData({ nameCompany: '', email: '', services: [], budget: '', message: '' })
    //     } catch (err) {
    //         console.error('Sanity submit error FULL:', err);
    //         alert(err.message);
    //         setError(true);
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ validation
        if (!formData.nameCompany.trim()) {
            alert("Please enter your name & company.");
            return;
        }

        const doc = {
            _type: "contactSubmission",
            nameCompany: formData.nameCompany,
            email: formData.email,
            services: formData.services,
            budget: formData.budget,
            message: formData.message,
            submittedAt: new Date().toISOString(),
        };

        try {
            await client.create(doc);
            setSubmitted(true);
            setError(false);
            setFormData({
                nameCompany: "",
                email: "",
                services: [],
                budget: "",
                message: "",
            });
        } catch (err) {
            console.error("Sanity submit error FULL:", err);
            setError(true);
        }
    };

    return (
        <Box
            id="contact"
            sx={{
                backgroundColor: "#fff",
                py: { xs: 2, md: 12 },
                px: { xs: 2, md: 6 },
                width: "100%"
            }}
        >
            {/* INNER BOX */}
            <Box sx={{
                width: "100%",
                maxWidth: isLargeScreen ? "100%" : "1600px",
                mx: "auto",
            }}>
                <Grid container spacing={{ xs: 0, md: 15 }} alignItems="flex-start" justifyContent="space-between" flexWrap={{ xs: "wrap", sm: "wrap", md: "nowrap" }}
                >
                    {/* LEFT COLUMN */}
                    <Grid item xs={12} md={4} sx={{ minWidth: 0, mb: { xs: 6, md: 0 } }}>
                        <Box>
                            {/* HEADLINE */}
                            <Typography
                                sx={{
                                    fontSize: { xs: "26px", sm: "30px", md: isLargeScreen ? "63px" : "42px" },
                                    fontFamily: "Inter Tight, sans-serif",
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    color: "black",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                }}
                            >
                                Have{" "}
                                <Box
                                    component="img"
                                    src={CharacterContact}
                                    alt="character"
                                    sx={{
                                        height: isLargeScreen ? "51px" : "34px",
                                        mx: 1,
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                                a great idea?
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 2,
                                    fontSize: { xs: "16px", md: isLargeScreen ? "33px" : "22px" },
                                    fontWeight: 400,
                                    fontFamily: "Inter Tight, sans-serif",

                                    color: "black",
                                }}
                            >
                                Tell us about it
                            </Typography>


                            {/* <Typography
                                sx={{
                                    mt: 3, mb: 1, fontWeight: 500, color: "black", fontFamily: "Inter Tight, sans-serif",
                                    fontSize: isLargeScreen ? "22px" : undefined,
                                }}
                            >
                                Follow Us
                            </Typography>
                           
                            <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                                <Box
                                    component="a"
                                    href="https://www.behance.net/uzzystudio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ display: "inline-block" }}
                                >
                                    <Box
                                        component="img"
                                        src={BehanceLogo}
                                        alt="Behance"
                                        sx={{ height: { xs: "32px", md: isLargeScreen ? "67px" : "45px" } }}
                                    />
                                </Box>
                              
                                <Box
                                    component="a"
                                    href="https://dribbble.com/uzzy-studios"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ display: "inline-block" }}
                                >
                                    <Box
                                        component="img"
                                        src={DribbbleLogo}
                                        alt="Dribbble"
                                        sx={{ height: { xs: "32px", md: isLargeScreen ? "67px" : "45px" } }}
                                    />
                                </Box>
                                
                                <Box
                                    component="a"
                                    href="https://www.instagram.com/uzzy_studios/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ display: "inline-block" }}
                                >
                                    <Box
                                        component="img"
                                        src={InstagramLogo}
                                        alt="Instagram"
                                        sx={{ height: { xs: "32px", md: isLargeScreen ? "67px" : "45px" } }}
                                    />
                                </Box>
                               
                                <Box
                                    component="a"
                                    href="https://www.linkedin.com/in/uzzystudio/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ display: "inline-block" }}
                                >
                                    <Box
                                        component="img"
                                        src={linkeidnicon} // import this at top
                                        alt="LinkedIn"
                                        sx={{ height: { xs: "32px", md: isLargeScreen ? "67px" : "45px" } }}
                                    />
                                </Box>
                            </Stack> */}

                            {/* EMAIL */}
                            {/* <Typography
                                sx={{
                                    mt: 5,
                                    fontSize: isLargeScreen ? "30px" : "20px",
                                    fontWeight: 500,
                                    color: "black",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1, // space between icon and text
                                }}
                            >
                                <Box
                                    component="img"
                                    src={gmailicon} // import this at top
                                    alt="Gmail"
                                    sx={{
                                        height: isLargeScreen ? "35px" : "25px",
                                        width: "auto",
                                    }}
                                />
                                uzzystudios@gmail.com
                            </Typography> */}

                            {/* WHATSAPP */}
                            {/* <Typography
                                sx={{
                                    mt: 2,
                                    fontSize: isLargeScreen ? "30px" : "20px",
                                    fontWeight: 500,
                                    color: "black",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1, // space between icon and text
                                }}
                                onClick={() => window.open("https://wa.me/447592131117", "_blank")}
                            >
                                <Box
                                    component="img"
                                    src={whatsappicon} // import this at top
                                    alt="WhatsApp"
                                    sx={{
                                        height: isLargeScreen ? "30px" : "20px",
                                        width: "auto",
                                    }}
                                />
                                +44 7592 131117
                            </Typography> */}

                        </Box>
                    </Grid>

                    {/* RIGHT COLUMN (FORM) */}
                    <Grid
                        item
                        xs={12}
                        md={7}
                        sx={{
                            minWidth: 0,
                            display: "flex",
                            justifyContent: { xs: "flex-start", md: "center" },
                            mt: { xs: 4, md: 0 }
                        }}
                    >
                        <Box sx={{
                            width: "100%",
                            maxWidth: {
                                xs: "320px",   // mobile
                                sm: "420px",   // tablet
                                md: isLargeScreen ? "1170px" : "780px",   // desktop
                            },
                            marginRight: {
                                xs: 0, // mobile
                                sm: 0, // tablet
                                md: isLargeScreen ? "150px" : "100px", // desktop
                            },
                        }}>
                            {/* NAME FIELDS */}
                            <Grid container spacing={3}>
                                {/* NAME & COMPANY */}
                                <Grid item xs={12} md={6} sm={6} sx={{ width: { xs: "90%", sm: "90%", md: "47%" } }}>
                                    <Typography sx={{
                                        mb: 1, fontWeight: 500, color: "#000", fontFamily: "Inter Tight, sans-serif", fontSize: { xs: "13px", md: isLargeScreen ? "22px" : "15px" },
                                    }}>
                                        Name & Company
                                    </Typography>

                                    <TextField
                                        placeholder="Enter your name & company"
                                        fullWidth
                                        variant="outlined"
                                        value={formData.nameCompany}
                                        // onChange={(e) => setFormData({ ...formData, nameCompany: e.target.value })}
                                        onChange={(e) => {
                                            setFormData({ ...formData, nameCompany: e.target.value });
                                            setNameError(false);
                                        }}
                                        helperText={nameError ? "Name & Company is required" : ""}
                                        error={nameError}


                                        inputProps={{
                                            style: {
                                                fontSize: "14px",
                                                fontFamily: "Inter Tight, sans-serif",
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                fontFamily: "Inter Tight, sans-serif",
                                                sx: { fontSize: { xs: "13px", md: "14px" } }
                                            }
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "80px",
                                                border: "1px solid #e0e0e0",
                                                "& input::placeholder": {
                                                    fontSize: {
                                                        xs: "11px",
                                                        md: "14px",
                                                    },
                                                    fontFamily: "Inter Tight, sans-serif",
                                                    opacity: 0.5,  // important for Chrome!
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: {
                                                        xs: "10px 12px",   // ✅ MOBILE (more breathing room)
                                                        sm: "12px 15px",   // tablet
                                                        md: "18px 22px",   // desktop
                                                    }, fontSize: {
                                                        xs: "14px",
                                                        md: "14px",
                                                    },
                                                    fontFamily: "Inter Tight, sans-serif",
                                                },


                                            },
                                        }}
                                    />

                                </Grid>

                                {/* EMAIL */}
                                <Grid item xs={12} md={6} sm={6} sx={{ width: { xs: "90%", sm: "90%", md: "47%" } }}>
                                    <Typography sx={{
                                        mb: 1, fontWeight: 500, color: "#000", fontFamily: "Inter Tight, sans-serif", fontSize: { xs: "13px", md: isLargeScreen ? "22px" : "15px" },
                                    }}>
                                        Email
                                    </Typography>

                                    <TextField
                                        placeholder="Enter your email"
                                        fullWidth
                                        variant="outlined"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        InputProps={{
                                            sx: {
                                                fontSize: "13px",
                                                "&::placeholder": {
                                                    fontSize: "13px",

                                                    fontFamily: "Inter Tight, sans-serif",

                                                },
                                            },
                                        }}

                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "80px",
                                                border: "1px solid #e0e0e0",
                                                "& input::placeholder": {
                                                    fontSize: {
                                                        xs: "11px",
                                                        md: "14px",
                                                    },
                                                    fontFamily: "Inter Tight, sans-serif",
                                                    opacity: 0.5,
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: {
                                                        xs: "10px 12px",   // ✅ MOBILE (more breathing room)
                                                        sm: "12px 15px",   // tablet
                                                        md: "18px 22px",   // desktop
                                                    }, fontSize: "14px",
                                                    fontFamily: "Inter Tight, sans-serif",
                                                },


                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>


                            {/* SERVICES */}
                            <Box sx={{ mt: 4 }}>
                                <Typography sx={{
                                    fontWeight: 500, mb: 1, color: "#000", fontFamily: "Inter Tight, sans-serif", fontSize: { xs: "13px", md: isLargeScreen ? "22px" : "15px" },
                                }}>
                                    I'm interested in...
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                                    {services.map((item) => (
                                        <Chip
                                            key={item}
                                            label={item}
                                            onClick={() => toggleService(item)}
                                            sx={{
                                                ...wiggle, // add keyframes

                                                borderRadius: "80px",
                                                px: { xs: 1.5, sm: 2, md: isLargeScreen ? 3.3 : 2.2 },   // left-right padding
                                                py: { xs: 1.5, sm: 2, md: isLargeScreen ? 4.5 : 3 },     // top-bottom padding
                                                fontSize: { xs: "12px", sm: "13px", md: isLargeScreen ? "21px" : "14px" },
                                                cursor: "pointer",
                                                backgroundColor: selectedServices.includes(item) ? "black" : "transparent",
                                                color: selectedServices.includes(item) ? "white" : "black",
                                                border: "1px solid #e0e0e0",
                                                "&:hover": {
                                                    backgroundColor: selectedServices.includes(item) ? "black" : "#f4f4f4",
                                                    animation: 'wiggle 0.4s ease-in-out', // wiggle on hover

                                                },
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>

                            {/* BUDGET */}
                            <Box sx={{ mt: 4 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        mb: 1,
                                        fontFamily: "Inter Tight, sans-serif",
                                        fontSize: { xs: "13px", md: "15px" },
                                        color: "#000"
                                    }}
                                >
                                    Project budget (USD)
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                                    {budgets.map((item) => {
                                        const isSelected = selectedBudget === item;

                                        return (
                                            <Chip
                                                key={item}
                                                label={item}
                                                onClick={() => {
                                                    setFormData({ ...formData, budget: item });
                                                    setSelectedBudget(item); // for styling
                                                }}
                                                sx={{
                                                    ...wiggle, // add keyframes

                                                    borderRadius: "80px",
                                                    px: { xs: 1.5, sm: 2, md: isLargeScreen ? 3.3 : 2.2 },   // left-right padding
                                                    py: { xs: 1.5, sm: 2, md: isLargeScreen ? 4.5 : 3 },     // top-bottom padding
                                                    fontSize: { xs: "12px", sm: "13px", md: isLargeScreen ? "21px" : "14px" },
                                                    cursor: "pointer",
                                                    backgroundColor: isSelected ? "#000" : "transparent",
                                                    color: isSelected ? "#fff" : "#000",
                                                    border: isSelected
                                                        ? "1px solid #000"
                                                        : "1px solid #e0e0e0",
                                                    transition: "all 0.2s ease",
                                                    "&:hover": {
                                                        backgroundColor: isSelected ? "#000" : "#f5f5f5",
                                                        animation: 'wiggle 0.4s ease-in-out', // wiggle on hover

                                                    }
                                                }}
                                            />
                                        );
                                    })}
                                </Box>
                            </Box>


                            {/* MESSAGE */}
                            <Box sx={{ mt: 4 }}>
                                <Typography sx={{
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: { xs: "10px", md: isLargeScreen ? "22px" : "15px" },
                                    fontFamily: "Inter Tight, sans-serif",
                                    color: "#000",
                                }}>Write us a message</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Briefly describe your project"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    sx={{
                                        "& .MuiInputBase-input": {
                                            fontFamily: "Inter Tight, sans-serif",
                                            fontSize: { xs: "10px", md: isLargeScreen ? "22px" : "15px" },
                                            padding: "8px 0",
                                            "&::placeholder": {
                                                fontSize: { xs: "9px", md: isLargeScreen ? "22px" : "15px" },
                                                opacity: 0.5,
                                                fontFamily: "Inter Tight, sans-serif",
                                            },
                                        },
                                        borderBottom: "1px solid #000",
                                    }}
                                />
                            </Box>

                            {/* SUBMIT BUTTON */}
                            <Box sx={{ mt: 4 }}>
                                <Button
                                    data-clickable
                                    disableElevation
                                    // disabled={!formData.nameCompany.trim()}
                                    onClick={handleSubmit}
                                    variant="contained"
                                    sx={{
                                        position: "relative",
                                        overflow: "hidden",

                                        py: { xs: 1.3, md: isLargeScreen ? 2.4 : 1.6 },
                                        px: { xs: 4, md: isLargeScreen ? 10.5 : 7 },
                                        fontSize: isLargeScreen ? "18px" : "15px",
                                        borderRadius: "30px",
                                        backgroundColor: "#CAF55E",
                                        fontWeight: 500,
                                        fontFamily: "Inter Tight, sans-serif",
                                        textTransform: "none",
                                        boxShadow: "none",
                                        cursor: "pointer",

                                        /* Hover BG animation */
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "0%",
                                            backgroundColor: "#000",
                                            transition: "height 0.99s cubic-bezier(0.22, 1, 0.36, 1)",
                                            zIndex: 0,
                                        },

                                        "&:hover::before": {
                                            height: "100%",
                                        },

                                        /* Change TEXT color safely */
                                        "&:hover .button-text-wrapper": {
                                            color: "#fff",
                                        },

                                        "&:focus": { outline: "none" },
                                        "&.Mui-focusVisible": { boxShadow: "none" },
                                    }}
                                >
                                    <Box
                                        className="button-text-wrapper"
                                        sx={{
                                            position: "relative",
                                            zIndex: 2,
                                            color: "#1D1D1B",
                                            transition: "color 0.3s ease",
                                        }}
                                    >
                                        Submit
                                    </Box>
                                </Button>
                                {submitted && (
                                    <Typography sx={{ mt: 1, color: 'green' }}>
                                        Your query has been submitted!
                                    </Typography>
                                )}
                                {error && (
                                    <Typography sx={{ mt: 1, color: 'red' }}>
                                        Something went wrong. Please try again.
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid >
            </Box >
        </Box >
    );
}