import {
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client, urlFor } from "../../sanityClient";


import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.jpg";


gsap.registerPlugin(ScrollTrigger);








// Reusable Card Component
const ServiceCard = ({ card, screen, index, totalCards }) => {


  const handleScrollToContact = () => {
    const contact = document.getElementById("contact");
    if (!contact || !window.lenis) return;


    const y = contact.getBoundingClientRect().top + window.pageYOffset - 120;


    window.lenis.scrollTo(y, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };


  const backgroundColor = index % 2 === 0 ? "#ffffff" : "#ffffff";




  const titleSize = screen.isXXL
    ? "64px"
    : screen.isXL
      ? "56px"
      : screen.isLarge
        ? "50px"
        : screen.isMedium
          ? "30px"
          : screen.isSmall
            ? "23px"
            : "23px";


  const descSize = screen.isXXL
    ? "20px"
    : screen.isXL
      ? "18px"
      : screen.isLarge
        ? "18px"
        : screen.isMedium
          ? "15px"
          : screen.isSmall
            ? "13px"
            : "13px";


  const buttonSize = screen.isXXL
    ? "20px"
    : screen.isXL
      ? "20px"
      : screen.isLarge
        ? "15px"
        : screen.isMedium
          ? "14px"
          : screen.isSmall
            ? "11px"
            : "11px";


  const bulletSize = screen.isXXL
    ? "17px"
    : screen.isXL
      ? "18px"
      : "15px";


  const contentMaxWidth = screen.isXXL
    ? "1400px"
    : screen.isXL
      ? "1400px"
      : screen.isLarge
        ? "1400px"
        : screen.isMedium
          ? "1600px"
          : screen.isSmall
            ? "1000px"
            : "100%"; // mobile




  return (
    <Box
      sx={{
        backgroundColor,
        width: "100vw",        // ✅ full viewport width
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",   // ✅ break out of layout container
        marginRight: "-50vw",
        borderBottom: index === totalCards - 1 ? "none" : "2px solid #E0E0E0",


        // ✅ full viewport height on small screens
        height: screen.isMobile ? "100vh" : "auto",
        // 🔹 vertical layout + push content to bottom
        display: "flex",
        flexDirection: "column",
        justifyContent: screen.isMobile ? "flex-end" : "flex-start", // bottom align only on mobile


      }}
    >
      <Box
        className="card-overlay"
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)", // 🔥 darkness level
          opacity: 0,
          pointerEvents: "none",
          zIndex: 2,
          transition: "opacity 0.2s linear",
        }}
      />


      <Container maxWidth={false}>
        <Box sx={{
          maxWidth: contentMaxWidth,  // ✅ control content width
          margin: "0 auto",     // ✅ center content
          padding: { xs: "20px 20px", md: "57px 40px" }
        }}>
          < Grid container spacing={{ xs: 7, sm: 7, md: 16 }} // smaller spacing on mobile
            alignItems="stretch">
            {/* COLUMN 1: Text and Button */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack spacing={{ xs: 1, sm: 3, md: 3 }} // smaller spacing on mobile
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: titleSize,
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
                    fontSize: descSize,


                    lineHeight: 1.4,
                    color: "#000",
                    fontFamily: "Inter Tight, sans-serif",
                  }}
                >
                  {card.description}
                </Typography>
              </Stack>


              <Box sx={{ flexGrow: 1 }} />
              <Button
                data-clickable
                onClick={handleScrollToContact}
                disableElevation
                sx={{
                  mt: { xs: 2 },
                  position: "relative",
                  overflow: "hidden",
                  alignSelf: "flex-start",
                  padding:
                    screen.isXXL
                      ? "25px 32px"
                      : screen.isXL
                        ? "25px 32px"
                        : screen.isLarge
                          ? "25px 32px"
                          : screen.isMedium
                            ? "20px 28px"
                            : screen.isSmall
                              ? "11px 14px"
                              : "11x 14px",
                  fontSize: buttonSize,
                  borderRadius: "50px",
                  backgroundColor: "#f3f3f3",
                  fontWeight: 900,
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
                  let's work together
                </Box>
              </Button>


            </Grid>


            {/* COLUMN 2: Services List */}
            <Grid
              size={{ xs: 12, md: 2 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: { xs: "flex-start", md: "center" }, // ✅ left on mobile, center on desktop


              }}
            >
              <Stack
                sx={{
                  // ✅ Only on mobile + only if more than 7 items
                  ...(screen.isMobile && card.services.length > 8 && {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "12px",
                  }),
                }}
                spacing={1}
              >
                {card.services.map((item, index) => (
                  <Typography
                    key={`${card.id}-${index}`}
                    sx={{
                      fontSize: descSize,
                      fontFamily: "Inter Tight, sans-serif",
                      fontWeight: 400,
                      lineHeight: 1.2,
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
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                className="service-card"
                sx={{
                  position: "relative",
                  width: "100%",
                  height: screen.isXXL
                    ? "520px"
                    : screen.isXL
                      ? "550px"
                      : screen.isLarge
                        ? "470px"
                        : screen.isMedium
                          ? "450px"
                          : screen.isSmall
                            ? "250px"
                            : "230px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {/* IMAGE */}
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


                {/* 🔥 DARK OVERLAY */}
                <Box
                  className="card-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,1)", // 👈 darkness level
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />
              </Box>


            </Grid>
          </Grid>
        </Box>
      </Container >
    </Box >
  );
};


const ServicesStackSection = () => {
  const isMobileScreen = useMediaQuery("(max-width: 779px)");


  const isSmallScreen = useMediaQuery("(min-width: 780px) and (max-width: 899px)");
  const isMediumScreen = useMediaQuery("(min-width: 900px) and (max-width: 1439px)");
  const isLargeScreen = useMediaQuery("(min-width: 1440px) and (max-width: 1919px)");
  const isXLargeScreen = useMediaQuery("(min-width: 1920px) and (max-width: 2559px)");
  const isXXLargeScreen = useMediaQuery("(min-width: 2560px)");
  const stackRef = useRef();


  const screen = {
    isMobile: isMobileScreen,
    isSmall: isSmallScreen,
    isMedium: isMediumScreen,
    isLarge: isLargeScreen,
    isXL: isXLargeScreen,
    isXXL: isXXLargeScreen,
  };
  // Card data structure
  const [cardsData, setCardsData] = useState([]);


  const query = `
*[_type == "servicesStackSection"][0]{
  services[]{
    _key,
    title,
    description,
    points,
    image{
      asset->{
        _id,
        url
      }
    }
  }
}
`;
  useEffect(() => {
    client.fetch(query).then((data) => {
      if (!data?.services) return;


      const formattedData = data.services.map((item, index) => ({
        id: item._key || index,
        title: item.title,
        description: item.description,
        services: item.points || [],
        image: item.image ? urlFor(item.image).url() : "",
      }));


      setCardsData(formattedData);
    });
  }, []);


  const setupAnimation = () => {
    const overlays = gsap.utils.toArray(
      stackRef.current.querySelectorAll(".card-overlay")
    );


    const cards = gsap.utils.toArray(stackRef.current.children);
    if (cards.length < 2) return;


    const cardHeight = cards[0].offsetHeight;
    const totalScroll = cardHeight * (cards.length - 1);


    gsap.set(cards, { y: 0 });


    const tl = gsap.timeline();


    cards.forEach((card, index) => {


      if (index === 0) return;


      const overlay = card.querySelector(".card-overlay");


      tl.to(
        cards.slice(index),
        {
          y: -index * cardHeight,
          ease: "none",
        },
        index - 1
      );


      // 🔥 darken previous card when new card stacks
      if (overlay) {
        tl.to(
          cards[index - 1].querySelector(".card-overlay"),
          {
            opacity: 2,
            ease: "none",
            duration: 0.5,
          },
          index - 1
        );
      }
    });


    ScrollTrigger.create({
      trigger: stackRef.current,
      start: "top top",
      end: () => "+=" + totalScroll,
      pin: true,
      pinSpacing: false, // ✅ removes huge gap
      scrub: true,
      animation: tl,
      invalidateOnRefresh: true,
    });
  };


  useEffect(() => {
    if (!cardsData.length) return;


    let ctx;


    const init = () => {
      ctx = gsap.context(() => {
        setupAnimation();
      }, stackRef);


      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };


    init();


    const handleResize = () => {
      if (ctx) ctx.revert();   // ✅ only kill THIS section’s triggers
      init();
    };


    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();   // ✅ scoped cleanup
    };
  }, [cardsData]);






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
              screen={screen}
              totalCards={cardsData.length}


            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};


export default ServicesStackSection;





