// import {
//   Button,
//   Box,
//   Typography,
//   Container,
//   Grid,
//   Stack,
//   useMediaQuery,
// } from "@mui/material";
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import img1 from "../../assets/img1.png";
// import img2 from "../../assets/img2.png";
// import img3 from "../../assets/img3.png";
// import img4 from "../../assets/img4.png";
// import img5 from "../../assets/img5.jpg";

// gsap.registerPlugin(ScrollTrigger);

// // Card data structure
// const cardsData = [
//   {
//     id: 1,
//     title: "strategy",
//     description:
//       "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.",
//     image: img2,
//     services: [
//       "Positioning",
//       "Brand Workshop",
//       "Insights",
//       "Purpose Code",
//       "Brand Name",
//       "Communication Strategy",
//       "Strategic Consulting",
//       "Brand Claim",
//     ],
//   },
//   {
//     id: 2,
//     title: "design",
//     description:
//       "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.",
//     image: img1,
//     services: [
//       "Visual Identity",
//       "Brand Guidelines",
//       "Logo Design",
//       "Typography",
//       "Color Palette",
//       "Iconography",
//       "Packaging Design",
//       "Digital Assets",
//     ],
//   },
//   {
//     id: 3,
//     title: "development",
//     description:
//       "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.",
//     image: img3,
//     services: [
//       "Web Development",
//       "Mobile Apps",
//       "Frontend",
//       "Backend",
//       "API Integration",
//       "Performance Optimization",
//       "Responsive Design",
//       "Testing",
//     ],
//   },
//   {
//     id: 4,
//     title: "marketing",
//     description:
//       "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.",
//     image: img4,
//     services: [
//       "Content Strategy",
//       "Social Media",
//       "SEO",
//       "Email Marketing",
//       "Analytics",
//       "Campaign Management",
//       "Brand Awareness",
//       "Lead Generation",
//     ],
//   },
//   {
//     id: 5,
//     title: "consulting",
//     description:
//       "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.",
//     image: img5,
//     services: [
//       "Business Strategy",
//       "Market Research",
//       "Competitive Analysis",
//       "Growth Planning",
//       "Process Optimization",
//       "Team Training",
//       "Change Management",
//       "Performance Metrics",
//     ],
//   },
// ];

// // Reusable Card Component
// const ServiceCard = ({ card, isLargeScreen, index }) => {
//   const handleScrollToContact = () => {
//     const contact = document.getElementById("contact");
//     if (!contact || !window.lenis) return;

//     const y = contact.getBoundingClientRect().top + window.pageYOffset - 120;

//     window.lenis.scrollTo(y, {
//       duration: 1.2,
//       easing: (t) => 1 - Math.pow(1 - t, 3),
//     });
//   };

//   const backgroundColor = index % 2 === 0 ? "#ffffff" : "#D8D8D8";

//   return (
//     <Box
//       sx={{
//         backgroundColor,
//         padding: { xs: "20px", md: "30px" },
//       }}
//     >
//       <Grid container spacing={6} alignItems="stretch">
//         {/* COLUMN 1: Text and Button */}
//         <Grid
//           size={{ xs: 12, md: 4 }}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Stack spacing={3}>
//             <Typography
//               sx={{
//                 fontWeight: 800,
//                 fontSize: {
//                   xs: "32px",
//                   sm: "38px",
//                   md: isLargeScreen ? "55px" : "42px",
//                 },
//                 fontFamily: "Inter Tight, sans-serif",
//                 letterSpacing: "-1.1px",
//                 textTransform: "lowercase",
//                 color: "#1D1D1B",
//                 lineHeight: 1.1,
//               }}
//             >
//               {card.title}
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: "16px",
//                 lineHeight: 1.6,
//                 color: "#000",
//                 fontFamily: "Inter Tight, sans-serif",
//               }}
//             >
//               {card.description}
//             </Typography>
//           </Stack>

//           <Box sx={{ flexGrow: 1 }} />

//           <Button
//             variant="contained"
//             disableElevation
//             onClick={handleScrollToContact}
//             sx={{
//               alignSelf: "flex-start",
//               borderRadius: "999px",
//               px: 4,
//               py: 1.5,
//               backgroundColor: "#f3f3f3",
//               color: "#000",
//               textTransform: "lowercase",
//               fontWeight: 600,
//               fontFamily: "Inter Tight, sans-serif",
//               fontSize: "15px",
//               mt: { xs: 1, md: 2 },
//               "&:hover": {
//                 backgroundColor: "#e8e8e8",
//               },
//             }}
//           >
//             let's work together
//           </Button>
//         </Grid>

//         {/* COLUMN 2: Services List */}
//         <Grid
//           size={{ xs: 12, md: 4 }}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "flex-end",
//             alignItems: "center",
//           }}
//         >
//           <Stack spacing={1}>
//             {card.services.map((item, index) => (
//               <Typography
//                 key={`${card.id}-${index}`}
//                 sx={{
//                   fontSize: "15px",
//                   fontFamily: "Inter Tight, sans-serif",
//                   fontWeight: 400,
//                   lineHeight: 1.5,
//                   color: "#000",
//                   display: "flex",
//                   alignItems: "center",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 → {item}
//               </Typography>
//             ))}
//           </Stack>
//         </Grid>

//         {/* COLUMN 3: Image */}
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Box
//             sx={{
//               position: "relative",
//               width: "100%",
//               height: { xs: "400px", md: "500px" },
//               borderRadius: "24px",
//               overflow: "hidden",
//             }}
//           >
//             <Box
//               component="img"
//               src={card.image}
//               alt={card.title}
//               sx={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// const ServicesStackSection = () => {
//   const isLargeScreen = useMediaQuery("(min-width: 2000px)");
//   const stackRef = useRef();

//   const setupAnimation = () => {
//     const cards = gsap.utils.toArray(stackRef.current.children);
//     if (cards.length < 2) return;

//     const cardHeight = cards[0].offsetHeight;
//     const totalOffset = (cards.length - 1) * cardHeight; // Stack by cardHeight only for full overlap

//     // Set stack height
//     gsap.set(stackRef.current, {
//       height: totalOffset + window.innerHeight,
//     });

//     // Create a timeline with staggered animations for overlapping effect
//     const tl = gsap.timeline();
//     cards.forEach((card, index) => {
//       if (index === 0) return;
//       // Stagger start times for overlapping (adjust 0.3 for more/less overlap)
//       tl.to(card, { y: -index * cardHeight, ease: "none" }, (index - 1) * 0.3);
//     });

//     // Pin and scrub the timeline
//     ScrollTrigger.create({
//       trigger: stackRef.current,
//       start: "top top",
//       end: "+=" + totalOffset,
//       pin: true,
//       scrub: 0.5,
//       animation: tl,
//     });
//   };

//   useEffect(() => {
//     setupAnimation();

//     const handleResize = () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       setupAnimation();
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <Box
//       component="section"
//       sx={{
//         padding: { xs: "40px 20px", md: "57px 67px" },
//         backgroundColor: "#ffffff",
//         position: "relative",
//       }}
//     >
//       <Container maxWidth="xl">
//         <Box
//           ref={stackRef}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {cardsData.map((card, index) => (
//             <ServiceCard
//               key={card.id}
//               card={card}
//               index={index}
//               isLargeScreen={isLargeScreen}
//             />
//           ))}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default ServicesStackSection;

// TODO: This is in testing the above one is also better but need to decide which one to keep
import {
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.jpg";

gsap.registerPlugin(ScrollTrigger);

// Card data structure
const cardsData = [
  {
    id: 1,
    title: "strategy",
    description:
      "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.",
    image: img2,
    services: [
      "Positioning",
      "Brand Workshop",
      "Insights",
      "Purpose Code",
      "Brand Name",
      "Communication Strategy",
      "Strategic Consulting",
      "Brand Claim",
    ],
  },
  {
    id: 2,
    title: "design",
    description:
      "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.",
    image: img1,
    services: [
      "Visual Identity",
      "Brand Guidelines",
      "Logo Design",
      "Typography",
      "Color Palette",
      "Iconography",
      "Packaging Design",
      "Digital Assets",
    ],
  },
  {
    id: 3,
    title: "development",
    description:
      "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.",
    image: img3,
    services: [
      "Web Development",
      "Mobile Apps",
      "Frontend",
      "Backend",
      "API Integration",
      "Performance Optimization",
      "Responsive Design",
      "Testing",
    ],
  },
  {
    id: 4,
    title: "marketing",
    description:
      "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.",
    image: img4,
    services: [
      "Content Strategy",
      "Social Media",
      "SEO",
      "Email Marketing",
      "Analytics",
      "Campaign Management",
      "Brand Awareness",
      "Lead Generation",
    ],
  },
  {
    id: 5,
    title: "consulting",
    description:
      "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.",
    image: img5,
    services: [
      "Business Strategy",
      "Market Research",
      "Competitive Analysis",
      "Growth Planning",
      "Process Optimization",
      "Team Training",
      "Change Management",
      "Performance Metrics",
    ],
  },
];

// Reusable Card Component
const ServiceCard = ({ card, isLargeScreen, index }) => {
  const handleScrollToContact = () => {
    const contact = document.getElementById("contact");
    if (!contact || !window.lenis) return;

    const y = contact.getBoundingClientRect().top + window.pageYOffset - 120;

    window.lenis.scrollTo(y, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };

  const backgroundColor = index % 2 === 0 ? "#ffffff" : "#D8D8D8";

  return (
    <Box
      sx={{
        backgroundColor,
        padding: { xs: "20px", md: "30px" },
      }}
    >
      <Grid container spacing={6} alignItems="stretch">
        {/* COLUMN 1: Text and Button */}
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack spacing={3}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: "32px",
                  sm: "38px",
                  md: isLargeScreen ? "55px" : "42px",
                },
                fontFamily: "Inter Tight, sans-serif",
                letterSpacing: "-1.1px",
                textTransform: "lowercase",
                color: "#1D1D1B",
                lineHeight: 1.1,
              }}
            >
              {card.title}
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: 1.6,
                color: "#000",
                fontFamily: "Inter Tight, sans-serif",
              }}
            >
              {card.description}
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="contained"
            disableElevation
            onClick={handleScrollToContact}
            sx={{
              alignSelf: "flex-start",
              borderRadius: "999px",
              px: 4,
              py: 1.5,
              backgroundColor: "#f3f3f3",
              color: "#000",
              textTransform: "lowercase",
              fontWeight: 600,
              fontFamily: "Inter Tight, sans-serif",
              fontSize: "15px",
              mt: { xs: 1, md: 2 },
              "&:hover": {
                backgroundColor: "#e8e8e8",
              },
            }}
          >
            let's work together
          </Button>
        </Grid>

        {/* COLUMN 2: Services List */}
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Stack spacing={1}>
            {card.services.map((item, index) => (
              <Typography
                key={`${card.id}-${index}`}
                sx={{
                  fontSize: "15px",
                  fontFamily: "Inter Tight, sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                }}
              >
                → {item}
              </Typography>
            ))}
          </Stack>
        </Grid>

        {/* COLUMN 3: Image */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "400px", md: "500px" },
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={card.image}
              alt={card.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const ServicesStackSection = () => {
  const isLargeScreen = useMediaQuery("(min-width: 2000px)");
  const stackRef = useRef();

  const setupAnimation = () => {
    const cards = gsap.utils.toArray(stackRef.current.children);
    if (cards.length < 2) return;

    const cardHeight = cards[0].offsetHeight;
    const totalOffset = (cards.length - 1) * cardHeight; // Stack by cardHeight only for full overlap

    // Set stack height to exactly the scroll distance needed, eliminating extra whitespace
    gsap.set(stackRef.current, {
      height: totalOffset,
    });

    // Create a timeline with staggered animations for overlapping effect
    const tl = gsap.timeline();
    cards.forEach((card, index) => {
      if (index === 0) return;
      // Stagger start times for overlapping (adjust 0.3 for more/less overlap)
      tl.to(card, { y: -index * cardHeight, ease: "none" }, (index - 1) * 0.3);
    });

    // Pin and scrub the timeline
    ScrollTrigger.create({
      trigger: stackRef.current,
      start: "top top",
      end: "+=" + totalOffset,
      pin: true,
      scrub: 0.5,
      animation: tl,
    });
  };

  useEffect(() => {
    setupAnimation();

    const handleResize = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      setupAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Box
      component="section"
      sx={{
        padding: { xs: "40px 20px", md: "57px 67px" },
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <Box
          ref={stackRef}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {cardsData.map((card, index) => (
            <ServiceCard
              key={card.id}
              card={card}
              index={index}
              isLargeScreen={isLargeScreen}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesStackSection;
